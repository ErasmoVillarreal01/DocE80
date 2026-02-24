---
title: RET_CNL - Retrieval Cancel
tags: [sql, message-processing, scripts, sdm, host-messages]
---

## Overview

**Source:** `HOST`  
**Destination:** `SDM`

The `RET_CNL` (Retrieval Cancel) message is sent by the **HOST system** to instruct SDM to cancel an existing retrieval request. This typically happens when a shipment update removes a unit previously requested or when a pending retrieval request must be explicitly deleted.



## Trigger

- **Shipment update:**  
  A unit previously included in the shipment request is removed.
- **Deletion of an active retrieval request:**  
  The request still exists in the `TransportOrder` list and must be cancelled.

## Expected Behavior

Upon receiving a `RET_CNL` message:

1. SDM **deletes the retrieval request** linked to the specified retrieval number.
2. SDM **updates the shipment** with the details included in the XML message (if provided).

---



## Example: Processing a `RET_CNL` Message

```sql title="Simulate RET_CNL processing"
SET TRANSACTION ISOLATION LEVEL READ COMMITTED
DECLARE	@return_value Int,
		@XmlReplyMessage xml,
		@ResultCode INT,
		@ResultText NVARCHAR(max)


begin tran




EXEC	@return_value = [Integration].[usp_ProcessHostMessage_RET_CNL]
		@XmlMessage = N'<Document>
  <Header>
    <Sender>HOST</Sender>
    <Receiver>E80</Receiver>
    <SendDate>2025-10-10 18:05:38</SendDate>
    <MessageType>RET_CNL</MessageType>
    <MessageId>12345</MessageId>
  </Header>
  <Body>
    <RetrievalRequestNumber>1213</RetrievalRequestNumber>
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
select 'TransportOrder', Id_Shipment, * from Handling.TransportOrder

ROLLBACK tran

```

## XML Example

``` xml title="RET_CNL xml template"
<Document>
  <Header>
    <Sender>HOST</Sender>
    <Receiver>E80</Receiver>
    <SendDate>2012-09-12 18:05:38+02.00</SendDate>
    <MessageType>RET_CNL</MessageType>
    <MessageId>12345</MessageId>
  </Header>
  <Body>
    <RetrievalRequestNumber>121344112</RetrievalRequestNumber>
    <ShipmentNumber>012223</ShipmentNumber>
    <ShipmentExpectedUnits>10</ShipmentExpectedUnits>
  </Body>
</Document>

```