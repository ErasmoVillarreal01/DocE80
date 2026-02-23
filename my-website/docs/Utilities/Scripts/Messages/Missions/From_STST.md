---
title: From STST - Mission strated from STST
tags: [sql, message-processing, scripts, sdm, missions, lgv, handling]
---

## Overview

**Source:** `Task Handler` (usually `LGVCS`)  
**Destination:** `SDM`

The `STST` (Station Status) message is sent by the Task Handler to inform SDM that a stock unit has arrived at the first pick‑up position of a conveyor or station. This notification enables SDM to detect that a stock unit is ready for processing, transfer, or mission execution, ensuring synchronized coordination between material‑handling equipment and SDM’s internal workflows.

## Trigger

- **Stock unit ready at pick‑up position:**  
  A stock unit reaches the first pick‑up point on a conveyor or station, prompting the Task Handler to notify SDM.

## Expected Behavior

Upon receiving an `STST` message:

1. SDM **registers the station status update**, acknowledging that a stock unit is now ready at the pick‑up location.  
2. SDM **evaluates any pending missions** or handling tasks involving that station and determines whether further actions should be triggered.  
3. SDM maintains synchronization with the Task Handler, ensuring that stock‑unit movements continue seamlessly across automated equipment and internal processes.

---

## Example: Simulating mission process from AMIS

```sql title="Simulate STST mission"

begin tran

DECLARE @ROLLBACK			BIT = 0

DECLARE @PROCESS_PKUP		BIT = 1

DECLARE @ResultCode			int
DECLARE @ResultText			nvarchar(max)
DECLARE @ResourceNumber		INT = 11
DECLARE @ResourceType		NVARCHAR(50) = 'SingleFork'
DECLARE @TaskNumber			NVARCHAR(50) = 'L00000000010'

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
DECLARE	@return_value Int




DECLARE @Lpn NVARCHAR(30) = '202602200856'
update Inventory.StockUnit set ShapeCheckResult = 0 where Lpn = @Lpn 



DECLARE	@XmlMessage XML = 
N'<Message>
  <Header>
    <Sender>LGVCS</Sender>
    <Receiver>WMS</Receiver>
    <Date>2024-09-13T00:26:02</Date>
    <MessageType>STST</MessageType>
    <MessageId>165075</MessageId>
  </Header>
  <Body>
    <ResourceType>SingleFork</ResourceType>
    <RequestId>1150</RequestId>
    <Column>
      <Source>
        <OpPosInfo OpPointName="IBC01_01" Position="1" Level="1" StackLevel="1" Row="1" OperationHeight="0" DistanceFromBegin="0" DistanceFromEnd="0" />
      </Source>
      <Tracking>
        <StockUnitInfo Position="1" StackLevel="1" Row="1" Lpn="' + @Lpn + N'" Sku="" Quantity="0" Side="0" 
		Length="0" Width="0" Height="0" Weight="0" LoadAid="0" QualityStatus="0" ReelDiameter="0" WindingDirection="0" ReelOrientation="0" />
      </Tracking>
    </Column>
    <TruckLoadingSuspended>false</TruckLoadingSuspended>
  </Body>
</Message>	
'

/****************************************************************** STST **********************************************************************/
PRINT '****************************************************************** STST **********************************************************************'

	EXEC	@rc = [Handling].[usp_ProcessHandlerMessage_STST]
			@XmlMessage = @XmlMessage,
			@XmlReplyMessage = @XmlReplyMessage OUTPUT

	DELETE FROM @TaskInfo
	DELETE FROM @OpPosInfo
	DELETE FROM @StockUnitInfo
	--SELECT 'RM', @XmlReplyMessage

	SET @XmlReplyMessage.modify('delete //Destination[1]')
	INSERT INTO @TaskInfo
	SELECT * FROM Handling.ufn_GetTaskInfoFromXmlMsg(@XmlReplyMessage)
		
	INSERT INTO @OpPosInfo
	SELECT * FROM Handling.ufn_GetOpPosInfoFromXmlMsg(@XmlReplyMessage)
		
	INSERT INTO @StockUnitInfo
	SELECT * FROM Handling.ufn_GetStockUnitInfoFromXmlMsg(@XmlReplyMessage)

	SELECT @ReplyMessageType = NULL
	SELECT @ReplyMessageType = MessageType, @Result = ResultCode FROM @TaskInfo
	
	INSERT INTO @LPNs (LPN) SELECT DISTINCT LPN FROM @StockUnitInfo

	

	SELECT @MessageType = 'STST'
	SELECT	@MessageType, @XmlMessage
	SELECT	@ReplyMessageType,	@XmlReplyMessage as N'@XmlReplyMessage'
	SELECT	@rc as 'Return Value'


/****************************************************************** PKUP **********************************************************************/
PRINT '****************************************************************** PKUP **********************************************************************'
	
	IF @ReplyMessageType = 'PQTY' AND @Result = 0 AND @PROCESS_PKUP = 1
	BEGIN

		update @TaskInfo
			set MessageType = 'PKUP',
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




select TOP 1 'StockUnitMeasurement', * from Inventory.StockUnitMeasurement order by MeasurementDateTime desc
select TOP 1 'StockUnitProperties', * from Inventory.StockUnitProperties order by Id desc
select TOP 1 'StockUnitStorage', * from Warehouse.StockUnitStorage order by PositioningTime desc



IF @ROLLBACK = 1
	rollback
ELSE
	commit
GO



```





``` xml title="STST xml template"
<Message>
  <Header>
    <Sender>LGVCS</Sender>
    <Receiver>SDM</Receiver>
    <Date>2012-09-21 14:05:38:000Z</Date>
    <MessageType>STST</MessageType>
    <MessageId>12345</MessageId>
  </Header>
  <Body>
    <RequestId>1</RequestId>
    <ResourceType>Double LGV</ResourceType>
    <Column>
      <Source>
        <OpPosInfo OpPointName = 'CV01' Position = '1' Level = '1' Row = '1' OperationHeight = '400' DistanceFromEnd = '0'/>
      </Source>
      <Tracking>
        <StockUnitInfo Position = '1' StackLevel = '1' Row = '1' Lpn = '12' Sku = 'Sku01' Length = '1000' Width = '1000' Height = '800' Weight = '50' ItemClass = '1' LoadAid = '1' StabilityCode = '1' QualityStatus = '1'/>
      </Tracking>
    </Column>
  </Body>
</Message>

```
