---
title: RET_RQS - Retrieval Request
tags: [sql, message-processing, scripts, sdm, host-messages]
---

## Overview

**Source:** `HOST`  
**Destination:** `SDM`

The `RET_RQS` (Retrieval Request) message is sent by the HOST system to request the retrieval of a unit from the warehouse. This can occur when a new shipment is created, when additional units are added to an existing shipment, or when a unit located anywhere in the warehouse is required. Upon receiving this message, SDM creates or updates the corresponding pick‑advice shipment (if applicable) and generates a retrieval transport order to move the requested unit to its destination. Internally, SDM adjusts transport orders through its retrieval‑request processing workflow.

## Trigger

- **New shipment request:**  
  A shipment is created and requires a unit to be retrieved from storage.

- **Shipment update:**  
  An additional unit is added to an existing shipment, generating an additional retrieval request.

- **Unit requested elsewhere in the warehouse:**  
  A retrieval is required independently of shipment creation or update.

## Expected Behavior

Upon receiving a `RET_RQS` message:

1. SDM **creates or updates the pick‑advice shipment**, depending on whether the shipment already exists.
2. A **retrieval transport order is generated** to move the unit to the required destination.
3. SDM invokes internal procedures to ensure correct processing:  
   - Shipment creation or update via  
     - `[Shipping].[usp_ProcessShipmentCreationXml]`  
     - `[Shipping].[usp_ProcessShipmentUpdateXml]`
   - Retrieval request handling via  
     - `[Handling].[usp_ProcessRetrievalRequestCreationXml]`
4. All necessary transport‑order adjustments are executed to align system operations with the retrieval request.

---

## Example: Processing a `RET_RQS` Message

```sql title="Simulate RET_RQS processing"
SET TRANSACTION ISOLATION LEVEL READ COMMITTED
DECLARE	@return_value Int,
		@XmlReplyMessage xml,
		@ResultCode INT,
		@ResultText NVARCHAR(max)


begin tran

DECLARE @ROLLBACK			BIT = 1


EXEC	@return_value = [Integration].[usp_ProcessHostMessage_RET_RQS]
		@XmlMessage = 
         N'<Document>
            <Header>
            <Sender>HOST</Sender>
            <Receiver>E80</Receiver>
            <SendDate>2026-01-08 12:05:38</SendDate>
            <MessageType>RET_RQS</MessageType>
            <MessageId>12345</MessageId>
            </Header>
            <Body>
            <RetrievalRequestNumber>REPVTQ000ABC01</RetrievalRequestNumber>
            <DeliveryNumber>REPLEN</DeliveryNumber>
            <OrderType></OrderType>
            <ShipmentNumber>REPLEN</ShipmentNumber>
            <DestinationLocation>HQS101</DestinationLocation>
            <Item>1010</Item>
            <LPN></LPN>
            <Lot></Lot>
            <MinExpireDate></MinExpireDate>
            <Quantity>60</Quantity>
            <QAStatus></QAStatus>
            </Body>
        </Document>
        ',

		@XmlReplyMessage = @XmlReplyMessage OUTPUT,
		@ResultCode = @ResultCode OUT,
		@ResultText = @ResultText OUT




SELECT	@XmlReplyMessage as N'@XmlReplyMessage'

SELECT	@return_value as 'Return Value', @ResultCode ResultCode, @ResultText ResultText



select 'Shipment', * from Shipping.Shipment
select 'Delivery', * from Shipping.Delivery
select 'DeliveryItem', * from Shipping.DeliveryItem
select TOP 1 'TransportOrder', Id_Shipment, * from Handling.TransportOrder ORDER BY InsertDateTime DESC
--select 'Lot', * from Inventory.Lot order by Id desc









DECLARE @RC int
DECLARE @AMISMessages xml
DECLARE @SendMessages bit = 1
--DECLARE @ResultCode int
--DECLARE @ResultText nvarchar(max)


EXECUTE @RC = [Handling].[usp_ReleaseTransportOrders] 
   @AMISMessages OUTPUT
  ,@SendMessages
  ,@ResultCode OUTPUT
  ,@ResultText OUTPUT

  select @AMISMessages [AMIS], @ResultCode [ResultCode], @ResultText [ResultText]


  EXECUTE @RC = [Handling].[usp_ReleaseTransportOrders] 
   @AMISMessages OUTPUT
  ,@SendMessages
  ,@ResultCode OUTPUT
  ,@ResultText OUTPUT

  select @AMISMessages [AMIS], @ResultCode [ResultCode], @ResultText [ResultText]



SELECT TOP 1 'TO', * FROM Handling.TransportOrder ORDER BY InsertDateTime DESC
SELECT 'Lgvm OutMess', * FROM Lgvm.OutgoingMessage


IF @ROLLBACK = 1
	rollback
ELSE
	commit
GO

```


## XML Example

``` xml title="RET_RQS xml template"
<Document>
  <Header>
    <Sender>HOST</Sender>
    <Receiver>E80</Receiver>
    <SendDate>2012-09-12 18:05:38+02.00</SendDate>
    <MessageType>RET_RQS</MessageType>
    <MessageId>12345</MessageId>
  </Header>
  <Body>
    <RetrievalRequestNumber>121344112</RetrievalRequestNumber>
    <ShipmentNumber>012223</ShipmentNumber>
    <ShipmentExpectedUnits>10</ShipmentExpectedUnits>
    <DeliverySequence>1</DeliverySequence>
    <Destination>REP01</Destination>
    <StagingArea>SL01</StagingArea>
    <Dock>Dock1</Dock>
    <Priority>012223</Priority>
    <DueDateTime>2012-09-12 20:00:00+02:00</DueDateTime>
    <Item>Itm01</Item>
    <Quantity>20</Quantity>
    <Lpn>20</Lpn>
    <Lot>lot676</Lot>
    <QualityStatus>AV</QualityStatus>
    <MinExpireDate>2012-10-12</MinExpireDate>
    <MaxExpireDate>2012-10-14</MaxExpireDate>
  </Body>
</Document>

```
