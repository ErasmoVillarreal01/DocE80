---
title: Shipment Process
tags: [sql, message-processing, scripts, sdm, shipping]
---

## Overview

The AMIS (Add Mission) message is sent by SDM to instruct the Task Handler to execute a handling mission required for a shipment. When a shipment needs one or more stock units to be moved—whether for preparation, consolidation, staging, or loading—SDM issues an AMIS message to request the physical movement from the source location to the shipment’s designated destination. Through this message, SDM ensures that all handling operations related to the shipment are executed by the automated material‑handling system.


---

## Example: Simulating shipment mission from AMIS

```sql title="Shipment mission from AMIS"
SET TRANSACTION ISOLATION LEVEL READ COMMITTED
begin tran

DECLARE @ROLLBACK			BIT = 1

DECLARE @ResultCode			int
DECLARE @ResultText			nvarchar(max)
DECLARE @ResourceNumber		INT = 3
DECLARE @ResourceType		NVARCHAR(50) = 'SingleFork'
DECLARE @TaskNumber			NVARCHAR(50)
DECLARE @MessageType		NVARCHAR(50)
DECLARE @ReplyMessageType	NVARCHAR(50)

DECLARE @Sender				NVARCHAR(50) = 'debug'
DECLARE @Receiver			NVARCHAR(50) = 'debug'
DECLARE @Result				INT

DECLARE @TaskInfo			Handling.TaskInfo
DECLARE @OpPosInfo			Handling.OpPosInfo
DECLARE @StockUnitInfo		Handling.StockUnitInfo
DECLARE @LPNs				TABLE (LPN nvarchar(50))

DECLARE	@rc Int,
		@XmlReplyMessage xml



DECLARE @XmlMessage xml = N'<Message>
  <Header>
    <Sender>Wms</Sender>
    <Receiver>LGVCS</Receiver>
    <Date>2025-05-14T16:46:53.020</Date>
    <MessageType>AMIS</MessageType>
    <MessageId>109119</MessageId>
  </Header>
  <Body>
    <TaskNumber>W00000000249</TaskNumber>
    <Priority>10</Priority>
    <ResourceType>SingleFork</ResourceType>
    <Column>
      <Source>
        <OpPosInfo OpPointName="A-048-L" Position="2" Level="1" Row="1" StackLevel="2" ResourcePosition="1" LocationLength="8715" LocationClearance="5412" ProductPressure="1" />
      </Source>
      <Destination>
        <OpPosInfo OpPointName="CW 23" Position="1" Level="1" Row="1" StackLevel="1" ResourcePosition="1" OperationHeight="0" LocationLength="2000" LocationClearance="9999" />
      </Destination>
      <Tracking>
        <StockUnitInfo Position="1" StackLevel="2" Row="2" Id_StockUnit="257" Lpn="202505120000001319" Sku="101060" Quantity="140" Length="1219" Width="1219" Height="1803" Weight="64" ForkSide="0" ReelDiskHeight="0" ItemClass="Cans" LoadAid="1" StabilityCode="9" QualityStatus="Default" ExpireDate="2025-12-09" ProductionDate="2025-12-01T00:00:00" ShapeControlResult="0" />
      </Tracking>
    </Column>
  </Body>
</Message>'



/****************************************************************** ARWP **********************************************************************/
PRINT '****************************************************************** ARWP **********************************************************************'

	INSERT INTO @TaskInfo
	SELECT * FROM Handling.ufn_GetTaskInfoFromXmlMsg(@XmlMessage)
		
	INSERT INTO @OpPosInfo
	SELECT * FROM Handling.ufn_GetOpPosInfoFromXmlMsg(@XmlMessage)
		
	INSERT INTO @StockUnitInfo
	SELECT * FROM Handling.ufn_GetStockUnitInfoFromXmlMsg(@XmlMessage)


	select @TaskNumber = TaskNumber from @TaskInfo
	
	INSERT INTO @LPNs (LPN) SELECT DISTINCT LPN FROM @StockUnitInfo

	update @TaskInfo
		set MessageType = 'ARWP',
			TaskNumber = @TaskNumber,
			ResourceNumber = @ResourceNumber,
			ResourceType = @ResourceType,
			ResultCode = NULL


	EXEC Handling.usp_CreateXMLMessage 
		@TaskInfo = @TaskInfo,
		@OpPosInfo = @OpPosInfo, 
		@StockUnitInfo = @StockUnitInfo, 
		@XmlMessage = @XmlMessage OUT

	select @XmlMessage = cast (replace (cast(@XmlMessage as nvarchar(max)), '<Sender>wms</Sender>','<Sender>LGVCS</Sender>') as xml)

	-- delete node Destination (lgvm don't send it)
	SET @XmlMessage.modify('delete //Destination[1]')  


	EXEC	@rc = [Handling].[usp_ProcessHandlerMessage_ARWP]
			@XmlMessage = @XmlMessage,
			@XmlReplyMessage = @XmlReplyMessage OUTPUT


	DELETE FROM @TaskInfo
	DELETE FROM @OpPosInfo
	DELETE FROM @StockUnitInfo
		
	INSERT INTO @TaskInfo
	SELECT * FROM Handling.ufn_GetTaskInfoFromXmlMsg(@XmlReplyMessage)
	
	INSERT INTO @OpPosInfo
	SELECT * FROM Handling.ufn_GetOpPosInfoFromXmlMsg(@XmlReplyMessage)
		
	INSERT INTO @StockUnitInfo
	SELECT * FROM Handling.ufn_GetStockUnitInfoFromXmlMsg(@XmlReplyMessage)

	SELECT @ReplyMessageType = NULL
	SELECT @ReplyMessageType = MessageType, @Result = ResultCode FROM @TaskInfo
	

	SELECT @MessageType = 'ARWP'
	SELECT	@MessageType, @XmlMessage
	SELECT	@ReplyMessageType,	@XmlReplyMessage as N'@XmlReplyMessage'
	SELECT	@rc as 'Return Value'



/****************************************************************** PKUP **********************************************************************/
PRINT '****************************************************************** PKUP **********************************************************************'
	
	IF @ReplyMessageType = 'PPOS'
	BEGIN

		update @TaskInfo
			set MessageType = 'PKUP',
				TaskNumber = @TaskNumber,
				ResourceNumber = @ResourceNumber,
				ResourceType = @ResourceType,
				ResultCode = NULL


delete from @OpPosInfo where ParentNode = 'Destination'


		EXEC Handling.usp_CreateXMLMessage 
			@TaskInfo = @TaskInfo,
			@OpPosInfo = @OpPosInfo, 
			@StockUnitInfo = @StockUnitInfo, 
			@XmlMessage = @XmlMessage OUT

		select @XmlMessage = cast (replace (cast(@XmlMessage as nvarchar(max)), '<Sender>wms</Sender>','<Sender>LGVCS</Sender>') as xml)

		-- delete node Destination (lgvm don't send it)
		SET @XmlMessage.modify('delete //Destination[1]')  

		EXECUTE @RC = [Handling].[usp_ProcessHandlerMessage_PKUP] 
		   @XmlMessage
		  ,@XmlReplyMessage OUTPUT
		  ,@ResultCode OUTPUT
		  ,@ResultText OUTPUT

		DELETE FROM @TaskInfo
		DELETE FROM @OpPosInfo
		DELETE FROM @StockUnitInfo
	
		INSERT INTO @TaskInfo
		SELECT * FROM Handling.ufn_GetTaskInfoFromXmlMsg(@XmlReplyMessage)
		
		INSERT INTO @OpPosInfo
		SELECT * FROM Handling.ufn_GetOpPosInfoFromXmlMsg(@XmlReplyMessage)
		
		INSERT INTO @StockUnitInfo
		SELECT * FROM Handling.ufn_GetStockUnitInfoFromXmlMsg(@XmlReplyMessage)

		DELETE FROM @LPNs
		INSERT INTO @LPNs (LPN) SELECT DISTINCT LPN FROM @StockUnitInfo

		SELECT @ReplyMessageType = NULL
		SELECT @ReplyMessageType = MessageType FROM @TaskInfo


		SELECT @MessageType = 'PKUP'
		SELECT  @MessageType, @XmlMessage
		SELECT	@ReplyMessageType,	@XmlReplyMessage as N'@XmlReplyMessage'
		SELECT	@rc as 'Return Value'


	END

/****************************************************************** ARWD CHECKPOINT **********************************************************************/
PRINT '****************************************************************** ARWD CHECKPOINT **********************************************************************'
	
	IF @ReplyMessageType = 'MMIS'
	BEGIN

		update @TaskInfo
			set MessageType = 'ARWD',
				TaskNumber = @TaskNumber,
				ResourceNumber = @ResourceNumber,
				ResourceType = @ResourceType

		EXEC Handling.usp_CreateXMLMessage 
			@TaskInfo = @TaskInfo,
			@OpPosInfo = @OpPosInfo, 
			@StockUnitInfo = @StockUnitInfo, 
			@XmlMessage = @XmlMessage OUT

		select @XmlMessage = cast (replace (cast(@XmlMessage as nvarchar(max)), '<Sender>wms</Sender>','<Sender>LGVCS</Sender>') as xml)


		EXECUTE @RC = [Handling].[usp_ProcessHandlerMessage_ARWD] 
		   @XmlMessage
		  ,@XmlReplyMessage OUTPUT
		  ,@ResultCode OUTPUT
		  ,@ResultText OUTPUT

		DELETE FROM @TaskInfo
		DELETE FROM @OpPosInfo
		DELETE FROM @StockUnitInfo
	
		INSERT INTO @TaskInfo
		SELECT * FROM Handling.ufn_GetTaskInfoFromXmlMsg(@XmlReplyMessage)
		
		INSERT INTO @OpPosInfo
		SELECT * FROM Handling.ufn_GetOpPosInfoFromXmlMsg(@XmlReplyMessage)
		
		INSERT INTO @StockUnitInfo
		SELECT * FROM Handling.ufn_GetStockUnitInfoFromXmlMsg(@XmlReplyMessage)

		SELECT @ReplyMessageType = NULL
		SELECT @ReplyMessageType = MessageType FROM @TaskInfo


		SELECT @MessageType = 'ARWD'
		SELECT  @MessageType, @XmlMessage
		SELECT	@ReplyMessageType,	@XmlReplyMessage as N'@XmlReplyMessage'
		SELECT	@rc as 'Return Value'


		

		
	END


/****************************************************************** ARWD **********************************************************************/
PRINT '****************************************************************** ARWD **********************************************************************'
	
	IF @ReplyMessageType = 'MMIS'
	BEGIN

		update @TaskInfo
			set MessageType = 'ARWD',
				TaskNumber = @TaskNumber,
				ResourceNumber = @ResourceNumber,
				ResourceType = @ResourceType

		EXEC Handling.usp_CreateXMLMessage 
			@TaskInfo = @TaskInfo,
			@OpPosInfo = @OpPosInfo, 
			@StockUnitInfo = @StockUnitInfo, 
			@XmlMessage = @XmlMessage OUT

		select @XmlMessage = cast (replace (cast(@XmlMessage as nvarchar(max)), '<Sender>wms</Sender>','<Sender>LGVCS</Sender>') as xml)


		EXECUTE @RC = [Handling].[usp_ProcessHandlerMessage_ARWD] 
		   @XmlMessage
		  ,@XmlReplyMessage OUTPUT
		  ,@ResultCode OUTPUT
		  ,@ResultText OUTPUT

		DELETE FROM @TaskInfo
		DELETE FROM @OpPosInfo
		DELETE FROM @StockUnitInfo
	
		INSERT INTO @TaskInfo
		SELECT * FROM Handling.ufn_GetTaskInfoFromXmlMsg(@XmlReplyMessage)
		
		INSERT INTO @OpPosInfo
		SELECT * FROM Handling.ufn_GetOpPosInfoFromXmlMsg(@XmlReplyMessage)
		
		INSERT INTO @StockUnitInfo
		SELECT * FROM Handling.ufn_GetStockUnitInfoFromXmlMsg(@XmlReplyMessage)

		SELECT @ReplyMessageType = NULL
		SELECT @ReplyMessageType = MessageType FROM @TaskInfo


		SELECT @MessageType = 'ARWD'
		SELECT  @MessageType, @XmlMessage
		SELECT	@ReplyMessageType,	@XmlReplyMessage as N'@XmlReplyMessage'
		SELECT	@rc as 'Return Value'


		

		
	END


	/****************************************************************** DPAL **********************************************************************/
PRINT '****************************************************************** DPAL **********************************************************************'
	
	IF @ReplyMessageType = 'DPOS'
	BEGIN
		update @TaskInfo
			set MessageType = 'DPAL',
				TaskNumber = @TaskNumber,
				ResourceNumber = @ResourceNumber,
				ResourceType = @ResourceType

		EXEC Handling.usp_CreateXMLMessage 
			@TaskInfo = @TaskInfo,
			@OpPosInfo = @OpPosInfo, 
			@StockUnitInfo = @StockUnitInfo, 
			@XmlMessage = @XmlMessage OUT

		select @XmlMessage = cast (replace (cast(@XmlMessage as nvarchar(max)), '<Sender>wms</Sender>','<Sender>LGVCS</Sender>') as xml)



		EXECUTE @RC = [Handling].[usp_ProcessHandlerMessage_DPAL] 
		   @XmlMessage
		  ,@XmlReplyMessage OUTPUT
		  ,@ResultCode OUTPUT
		  ,@ResultText OUTPUT

		DELETE FROM @TaskInfo
		DELETE FROM @OpPosInfo
		DELETE FROM @StockUnitInfo
	
		INSERT INTO @TaskInfo
		SELECT * FROM Handling.ufn_GetTaskInfoFromXmlMsg(@XmlReplyMessage)
		
		INSERT INTO @OpPosInfo
		SELECT * FROM Handling.ufn_GetOpPosInfoFromXmlMsg(@XmlReplyMessage)
		
		INSERT INTO @StockUnitInfo
		SELECT * FROM Handling.ufn_GetStockUnitInfoFromXmlMsg(@XmlReplyMessage)

		SELECT @ReplyMessageType = NULL
		SELECT @ReplyMessageType = MessageType FROM @TaskInfo

		SELECT @MessageType = 'DPAL'
		SELECT  @MessageType, @XmlMessage
		SELECT	@ReplyMessageType, @XmlReplyMessage as N'@XmlReplyMessage'
		SELECT	@rc as 'Return Value'

		

		

		
	END




DECLARE @AMISMessages xml
DECLARE @SendMessages bit
DECLARE	@return_value Int


EXECUTE @RC = [Shipping].[usp_OutboundShipmentMonitorProcess] 


select 'ShippedStockUnits',* from Shipping.ShippedStockUnit
	select * from Integration.HostOutgoingMessage order by InsertDateTime desc

SELECT * FROM Shipping.Shipment


IF @ROLLBACK = 1
	rollback
ELSE
	commit
GO


```
