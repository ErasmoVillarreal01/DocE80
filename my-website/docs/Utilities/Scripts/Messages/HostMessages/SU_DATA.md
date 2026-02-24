---
title: SU_DATA - Stock Unit Creation
tags: [sql, message-processing, scripts, sdm, host-messages]
---

## Overview

**Source:** `HOST`  
**Destination:** `SDM`

The `SU_DATA` message is sent by the HOST system to instruct SDM to create a new stock unit within the warehouse. This message provides the necessary attributes—such as LPN, item, lot information, quantities, and other operational data—allowing SDM to register the stock unit in its inventory model and make it available for all warehouse processes.

## Trigger

- **New stock unit creation request:**  
  HOST sends detailed stock‑unit information that must be created in SDM.

## Expected Behavior

Upon receiving an `SU_DATA` message:

1. SDM **creates a new stock unit** using the attributes supplied in the message (e.g., LPN, Item, Lot, Quantity, Status).
2. The stock unit becomes **available for warehouse operations**, including storage, retrieval and shipping .
3. SDM ensures that all mandatory data elements are validated and stored consistently in the inventory model.


---

## Example: Processing a `SU_DATA` Message

```sql title="Simulate SU_DATA processing"

SET TRANSACTION ISOLATION LEVEL READ COMMITTED
DECLARE	@return_value Int,
		@XmlReplyMessage xml,
		@ResultCode INT,
		@ResultText NVARCHAR(max)


begin tran

DECLARE @ROLLBACK			BIT = 0


EXEC	@return_value = [Integration].[usp_ProcessHostMessage_SU_DATA]
		@XmlMessage = 
		N'<Document>
			<Header>
				<Sender>HOST</Sender>
				<Receiver>E80</Receiver>
				<SendDate>2025-12-12T18:05:38+02:00</SendDate>
				<MessageType>SU_DATA</MessageType>
				<MessageId>12345</MessageId>
			</Header>
			<Body>
				<Item>1010</Item>
				<Lot>LOTXEP0025</Lot>
				<LPN>202602200856</LPN>
				<SourceLocation>IBC01</SourceLocation>
				<LoadAidType>10010</LoadAidType>
				<QAStatus>UNRESTRICTED</QAStatus>
				<Quantity>60</Quantity>
				<ExpirationDate>20271227</ExpirationDate>
			</Body>
		</Document>',


		@XmlReplyMessage = @XmlReplyMessage OUTPUT,
		@ResultCode = @ResultCode OUT,
		@ResultText = @ResultText OUT

SELECT	@XmlReplyMessage as N'@XmlReplyMessage'

SELECT	@return_value as 'Return Value', @ResultCode ResultCode, @ResultText ResultText



select TOP 1 'StockUnit', * from Inventory.StockUnit order by lastupdateDateTime desc
select TOP 1 'StockUnitPart', * from Inventory.StockUnitPart order by LastUpdateDateTime desc
select TOP 1 'Lot', * from Inventory.Lot WHERE Id = (select TOP 1 Id_Lot from Inventory.StockUnitPart order by LastUpdateDateTime desc
)

select 'StockUnitStorage', * from Warehouse.StockUnitStorage where IdStockUnit = (select top 1 Id from Inventory.StockUnit order by LastUpdateDateTime desc)

select 'ContainerName', * from Warehouse.ContainerName where IdContainer in (
	select IdContainer from Warehouse.StockUnitStorage where IdStockUnit = (select top 1 Id from Inventory.StockUnit order by LastUpdateDateTime desc)
)



IF @ROLLBACK = 1
	rollback
ELSE
	commit
GO



```


## XML Example

``` xml title="SU_DATA xml template"
<Document>
			<Header>
				<Sender>HOST</Sender>
				<Receiver>E80</Receiver>
				<SendDate>2025-12-12T18:05:38+02:00</SendDate>
				<MessageType>SU_DATA</MessageType>
				<MessageId>12345</MessageId>
			</Header>
			<Body>
				<Item>1010</Item>
				<Lot>LOTXEP0025</Lot>
				<LPN>202602200856</LPN>
				<SourceLocation>IBC01</SourceLocation>
				<LoadAidType>10010</LoadAidType>
				<QAStatus>UNRESTRICTED</QAStatus>
				<Quantity>60</Quantity>
				<ExpirationDate>20271227</ExpirationDate>
			</Body>
		</Document>'
```
