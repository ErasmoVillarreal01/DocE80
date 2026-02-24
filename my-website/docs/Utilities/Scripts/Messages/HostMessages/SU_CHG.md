---
title: SU_CHG - Stock Unit Change
tags: [sql, message-processing, scripts, sdm, host-messages]
---

## Overview

**Source:** `HOST`  
**Destination:** `SDM`

The `SU_CHG` message is sent by the HOST system to update the properties of one or more stock units in SDM. These updates apply to stock units identified by LPN, Lot, or Item, allowing HOST to modify operational attributes while ensuring that SDM reflects the most current stock‑unit information required for warehouse processes.

## Trigger

- **Change of stock‑unit properties:**  
  HOST modifies one or more attributes of stock units, determined by LPN, Lot, or Item references.

## Expected Behavior

Upon receiving an `SU_CHG` message:

1. SDM **updates the properties of the affected stock units** based on the identifying criteria (LPN, Lot, or Item).
2. Only the specified stock‑unit records are modified, ensuring targeted and controlled updates.
3. SDM maintains data consistency so that all operational processes use the updated stock‑unit attributes.

---

## Example: Processing a `SU_CHG` Message

```sql title="Simulate SU_CHG processing"
SET TRANSACTION ISOLATION LEVEL READ COMMITTED
DECLARE	@return_value Int,
		@XmlReplyMessage xml,
		@ResultCode INT,
		@ResultText NVARCHAR(max)


begin tran



EXEC	@return_value = [Integration].[usp_ProcessHostMessage_SU_CHG]
		@XmlMessage = 
        N'<Document>
            <Header>
                <Sender>HOST</Sender>
                <Receiver>E80</Receiver>
                <SendDate>2025-12-12T18:05:38+02:00</SendDate>
                <MessageType>SU_CHG</MessageType>
                <MessageId>12345</MessageId>
            </Header>
            <Body>
                <Item>10007</Item>
                <QAStatus>RESTRICTED</QAStatus>
                <Lot>202510007</Lot>
            </Body>
        </Document>',


		@XmlReplyMessage = @XmlReplyMessage OUTPUT,
		@ResultCode = @ResultCode OUT,
		@ResultText = @ResultText OUT

SELECT	@XmlReplyMessage as N'@XmlReplyMessage'

SELECT	@return_value as 'Return Value', @ResultCode ResultCode, @ResultText ResultText



select 'StockUnit', * from Inventory.StockUnit
select 'StockUnitPart', * from Inventory.StockUnitPart WHERE Id_Item = 58 ORDER BY LastUpdateDateTime
select 'Lot', * from Inventory.Lot

rollback tran


```


## XML Example

``` xml title="SU_CHG xml template"
<Document>
 <Header>
    <Sender>HOST</Sender>
    <Receiver>E80</Receiver>
    <SendDate>2012-09-12 18:05:38+02.00</SendDate>
    <MessageType>SU_CHG</MessageType>
    <MessageId>12345</MessageId>
  </Header>
  <Body>
    <CurrentLPN>123132183</CurrentLPN>
    <CurrentItem>ITM01</CurrentItem>
    <CurrentLot>LOT01</CurrentLot>
    <LPN>123132183</LPN>
    <Item>ITM02</Item>
    <Lot>LOT01</Lot>
    <Quantity>10</Quantity>
    <ExpireDate>2015-05-01</ExpireDate>
    <ProductionDate>2015-01-19</ProductionDate>
    <LoadAidType>EURO</LoadAidType>
    <QualityStatus>AV</QualityStatus>
  </Body>
</Document>
```
