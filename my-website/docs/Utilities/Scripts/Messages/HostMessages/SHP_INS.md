---
title: SHP_INS - Shipment Insert / Update
tags: [sql, message-processing, scripts, sdm, host-messages]
---

## Overview

**Source:** `HOST`  
**Destination:** `SDM`

The `SHP_INS` message is sent by the HOST system to create or update a batch‑mode shipment within SDM. This occurs when a new shipment is requested or when an existing shipment is modified. Upon processing this message, SDM inserts, updates, or deletes deliveries and delivery items according to the details contained in the XML payload, ensuring that the shipment structure reflects the requested changes.

## Trigger

- **New shipment request:**  
  A new batch‑mode shipment is created in the HOST system.

- **Shipment update:**  
  An existing shipment is modified, requiring SDM to adjust delivery and delivery‑item information accordingly.

## Expected Behavior

Upon receiving an `SHP_INS` message:

1. SDM **creates or updates the batch‑mode shipment**, depending on whether the shipment already exists.
2. **Deliveries and delivery items are inserted, updated, or deleted** based on the content of the incoming message.
3. SDM invokes the appropriate shipment‑processing logic:  
   - `[Shipping].[usp_ProcessShipmentCreationXml]`  
   - `[Shipping].[usp_ProcessShipmentUpdateXml]`
4. SDM also calls the internal procedure  
   - `[Shipping].[usp_ProcessDeliveryXml]`  
   to adjust deliveries and delivery items and ensure full alignment of the shipment structure with the data received from HOST.
---

## Example: Processing a `SHP_INS` Message

```sql title="Simulate SHP_INS processing"
SET TRANSACTION ISOLATION LEVEL READ COMMITTED
DECLARE	@return_value Int,
		@XmlReplyMessage xml,
		@ResultCode INT,
		@ResultText NVARCHAR(max)


begin tran


--<Task>
--    <Item></Item>
--    <Quantity></Quantity>
--    <QualityStatus></QualityStatus>
--    <MinExpireDays></MinExpireDays>
--    <RequestId>2025051202</RequestId>
--    <AllocationMethod></AllocationMethod>
--    <SSCC>202505120000000913</SSCC>
--    <EnforceLPN>true</EnforceLPN>
--    <Casepicking>true</Casepicking>
--</Task>


EXEC	@return_value = [Integration].[usp_ProcessHostMessage_SHIP_INS]
		@XmlMessage = N'<Document>
  <Header>
    <Sender>HOST</Sender>
    <Receiver>E80</Receiver>
    <SendDate>2023-09-12T18:05:38+02:00</SendDate>
    <MessageType>SHP_INS</MessageType>
    <MessageId>12345</MessageId>
  </Header>
 <Body>
	<ShipmentNumber>1000004</ShipmentNumber>
	<DueDateTime>2025-11-20T08:00:00</DueDateTime>
	<Swap></Swap>
	<LiveLoad></LiveLoad>
	<Deliveries>
		<Delivery>
			<DeliveryNumber>10001</DeliveryNumber>
			<DeliverySequence>1</DeliverySequence>
			<DeliveryItem>
				<Item>1001</Item>
				<Quantity>10</Quantity>
				<Lot></Lot>
			</DeliveryItem>
		</Delivery>

		<Delivery>
			<DeliveryNumber>10002</DeliveryNumber>
			<DeliverySequence>1</DeliverySequence>
			<DeliveryItem>
				<Item>1002</Item>
				<Quantity>99</Quantity>
				<Lot></Lot>
			</DeliveryItem>
		</Delivery>
		
	</Deliveries>
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
select 'Lot', * from Inventory.Lot order by Id desc

ROLLBACK tran


```


## XML Example

``` xml title="SHP_INS xml template"
<Document>
  <Header>
    <Sender>HOST</Sender>
    <Receiver>E80</Receiver>
    <SendDate>2012-09-12 18:05:38+02.00</SendDate>
    <MessageType>SHP_INS</MessageType>
    <MessageId>12345</MessageId>
  </Header>
  <Body>
    <ShipmentNumber>012223</ShipmentNumber>
    <Priority>2</Priority>
    <DueDateTime>2012-09-12 20:00:00+02.00</DueDateTime>
    <StagingArea>AREA01</StagingArea>
    <Dock>DOCK01</Dock>
    <Deliveries>
      <Delivery>
        <DeliverySequence>1</DeliverySequence>
        <DeliveryItem>
          <Item>ITEM-01</Item>
          <Quantity>360</Quantity>
        </DeliveryItem> 
        <DeliveryItem>
          <Item>ITEM-02</Item>
          <Quantity>480</Quantity>
        </DeliveryItem> 
        <DeliveryItem>
          <Item>ITEM-03</Item>
          <Quantity>240</Quantity>
        </DeliveryItem> 
      </Delivery>
    </Deliveries>
  </Body>
</Document>

```
