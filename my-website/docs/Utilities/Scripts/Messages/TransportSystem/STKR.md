---
title: STKR
tags: [sql, message-processing, scripts, sdm, transport-system]
---

## Overview


**Source:** `Transport System` 
**Destination:** `SDM`

The `STKR` (Station Status) message is sent by the Transport System to inform SDM that a stock unit has arrived. This message is used for validation and induction of the pallets through transport units such as an inbound conveyor.


---

## Example: Simulating STKR processing

```sql title="Simulate STKR processing"


DECLARE	@return_value Int,
		@XmlReplyMessage xml,
		@ResultCode INT,
		@ResultText NVARCHAR(max),
		@XmlMessage xml


begin tran

SELECT	@XmlMessage = N'<Message>
  <Header>
    <Sender>TS</Sender>
    <Receiver>SDM</Receiver>
    <MessageType>STKR</MessageType>
  </Header>
  <Body>
    <RequestId>4bbf1031-78e1-4bce-b7bc-9f41bc7b2d97</RequestId>
    <ResourceType>1</ResourceType>
    <Destination>0</Destination>
    <Column>
      <Source>
        <OpPosInfo OpPointName="INB1.SHAPE" Position="1" Level="1" Row="1" />
      </Source>
      <Tracking>
        <StockUnitInfo Id_StockUnit="0" Lpn="202505190000001422" Sku="" Line="" Status="" Length="1219" Width="1016" OversizeFront="0" 
            OversizeRear="0" OversizeRight="0" OversizeLeft="0" Height="1803" PalletCheck="" Weight="9181" WeightByPass="0" ShapeCtrlByPass="0" PalletCheckByPass="0" 
            PalletCenteringDeviceByPass="0" ErrorCode="0" CameraBarcodes="202505190000001422,202505190000001422" />
      </Tracking>
    </Column>
  </Body>
</Message>'

EXEC	@return_value = [TransportSystem].[usp_ProcessHandlerMessage_STKR]
		@XmlMessage = @XmlMessage,
		@XmlReplyMessage = @XmlReplyMessage OUTPUT,
		@ResultCode = @ResultCode OUT,
		@ResultText = @ResultText OUT


SELECT	@XmlReplyMessage as N'@XmlReplyMessage'

SELECT	@return_value as 'Return Value', @ResultCode ResultCode, @ResultText ResultText



select * from Warehouse.StockUnitStorage order by PositioningTime desc
select * from Inventory.StockUnitMeasurement order by MeasurementDateTime desc
select * from Inventory.StockUnit Order By InsertDateTime desc

rollback tran



```
