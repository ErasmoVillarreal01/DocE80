---
title: Mission strated from AMIS
tags: [sql, message-processing, scripts, sdm, missions, lgv, handling]
---


## Overview

**Source:** `SDM`  
**Destination:** `Task Handler` (typically `LGVCS`)

The `AMIS` (Add Mission) message is sent by SDM to notify the Task Handler that a new handling mission is required. This mission may involve one or more stock units that must be moved from any source location to any destination within the warehouse. Through this message, SDM communicates that a new physical movement task must be executed by the automated handling system.

## Trigger

- **New handling mission request:**  
  SDM determines that one or more stock units must be moved from a specific source location to a designated destination, generating a new mission for the Task Handler.

## Expected Behavior

Upon receiving an `AMIS` message:

1. The Task Handler (e.g., LGVCS) **registers the new mission request**, consisting of one or more stock‑unit movements.
2. The mission is **queued, scheduled, or assigned** based on the Task Handler’s internal logic (e.g., LGV availability, routing, task priority).
3. The automated system prepares to **execute the handling mission**, moving the specified stock units from the source to the destination according to SDM’s instructions.

---

## Example: Simulating mission process from AMIS

```sql title="Simulate AMIS mission"
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



DECLARE @XmlMessage xml = 

N'<Message>
  <Header>
    <Sender>Wms</Sender>
    <Receiver>LGVCS</Receiver>
    <Date>2026-01-27T19:32:54.983</Date>
    <MessageType>AMIS</MessageType>
    <MessageId>52047</MessageId>
  </Header>
  <Body>
    <TaskNumber>W00000001208</TaskNumber>
    <Priority>20</Priority>
    <ResourceType>SingleFork</ResourceType>
    <Column>
      <Source>
        <OpPosInfo OpPointName="AO049A" Position="1" Level="1" Row="1" StackLevel="1" ResourcePosition="1" LocationLength="12500" LocationClearance="9400" />
      </Source>
      <Destination>
        <OpPosInfo OpPointName="HQS103B" Position="1" Level="1" Row="1" StackLevel="1" ResourcePosition="1" OperationHeight="0" DistanceFromEnd="0" LocationLength="1300" LocationClearance="2350" CenterSearchMode="0" HeightSearchMode="0" />
      </Destination>
      <Tracking>
        <StockUnitInfo Position="1" StackLevel="1" Row="1" Id_StockUnit="106845" Lpn="202601271228" Sku="1010_10010" Quantity="60" Length="1219" Width="1016" Height="1778" Weight="907" ForkSide="0" ReelDiskHeight="0" ItemClass="AGN" LoadAid="1" StabilityCode="7" QualityStatus="Default" ExpireDate="2027-12-27" ShapeControlResult="0" />
      </Tracking>
    </Column>
  </Body>
</Message>'

DECLARE @mensaje NVARCHAR(MAX) = CONVERT(NVARCHAR(MAX), @XmlMessage)
DECLARE @AMIS_Lpn NVARCHAR(20) = 
	SUBSTRING( @mensaje,
    CHARINDEX('Lpn="', @mensaje) + LEN('Lpn="'),
    CHARINDEX('"', @mensaje, CHARINDEX('Lpn="', @mensaje) + LEN('Lpn="')) 
        - (CHARINDEX('Lpn="', @mensaje) + LEN('Lpn="'))
)

--SELECT 'Lpn', @AMIS_Lpn

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

SELECT TOP 1 'TransportOrders' [TO], * FROM Handling.TransportOrder ORDER BY ReleaseDateTime DESC
SELECT TOP 1 'Tasks' [Task],* FROM Handling.Task WHERE Id = 
	(SELECT TOP 1 Id_Task FROM Handling.TransportOrder ORDER BY ReleaseDateTime DESC
)

SELECT 'StockUnitStorage', * FROM Warehouse.StockUnitStorage
WHERE IdStockUnit IN (
SELECT Id FROM Inventory.StockUnit WHERE Lpn = @AMIS_Lpn)

--SELECT 'ContainerName', * FROM Warehouse.ContainerName WHERE IdStockUnit IN (
--SELECT Id FROM Inventory.StockUnit WHERE Lpn = @AMIS_Lpn)



IF @ROLLBACK = 1
	rollback
ELSE
	commit
GO


```





``` xml title="AMIS xml template"
<Message>
  <Header>
    <Sender>SDM</Sender>
    <Receiver>LGVCS</Receiver>
    <Date>2012-09-21 14:05:38:000Z</Date>
    <MessageType>AMIS</MessageType>
    <MessageId>12345</MessageId>
  </Header>
  <Body>
    <TaskNumber>W00000000001</TaskNumber>
    <TaskType>HouseKeeping</TaskType>
    <DueDateTime>2012-09-28 14:05:38:000Z</DueDateTime>
    <Priority>5</Priority>
    <ResourceType>Double LGV</ResourceType>
    <Column>
      <Source>
        <OpPosInfo OpPointName = 'BS_1_15' Position = '2' Level = '1' Row = '1' OperationHeight = '1600' DistanceFromEnd = '3000'/>
      </Source>
      <Destination>
        <OpPosInfo OpPointName = 'BS_1_33' Position = '1' Level = '1' Row = '1' OperationHeight = '0' DistanceFromEnd = '0'/>
      </Destination>
      <Tracking>
        <StockUnitInfo Position = '2' StackLevel = '3' Row = '1' Lpn = '12' Sku = 'Sku01' Length = '1000' Width = '1000' Height = '1500' Weight = '50' ItemClass = '1' LoadAid = '1' StabilityCode = '1' QualityStatus = '1'/>
      </Tracking>
    </Column>
    <Column>
      <Source>
        <OpPosInfo OpPointName = 'BS_1_15' Position = '2' Level = '1' Row = '2' OperationHeight = '1600' DistanceFromEnd = '3000' />
      </Source>
      <Destination>
        <OpPosInfo OpPointName = 'BS_1_33' Position = '1' Level = '1' Row = '2' OperationHeight = '0' DistanceFromEnd = '0' />
      </Destination>
      <Tracking>
        <StockUnitInfo Position = '2' StackLevel = '3' Row = '2' Lpn = '15' Sku = 'Sku01' Length = '1000' Width = '1000' Height = '1500' Weight = '50' ItemClass = '1' LoadAid = '1' QualityStatus = '1' />
      </Tracking>
    </Column>
  </Body>
</Message>

```
