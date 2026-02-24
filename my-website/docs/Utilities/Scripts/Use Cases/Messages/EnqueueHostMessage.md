---
title: Enqueue Message
tags: [sql, message-processing, scripts, sdm, host-messages]
---

Procedure to enqueue host incoming messages.

``` sql title="Enqueue Host Incoming Message"

BEGIN TRAN

DECLARE @RC int
DECLARE @MessageText nvarchar(max)
DECLARE @ProcessedMessages BIGINT


-- TODO: Set parameter values here.

SET @MessageText = 

N'<Document>
			<Header>
				<Sender>Host</Sender>
				<Receiver>E80</Receiver>
				<SendDate>2026-02-20T14:35:25+02:00</SendDate>
				<MessageType>ITM_MST</MessageType>
				<MessageId>12345</MessageId>
			</Header>
			<Body>
			<Items>
				<Item>
					<Item>55002</Item>
					<LegacyItemName>55001</LegacyItemName>
					<ItemType>ZFIN</ItemType>
					<ItemDescription>55001</ItemDescription>
					<ItemClass>AGN</ItemClass>
					<ItemWeekToExpiry>15</ItemWeekToExpiry>
					<ItemWeekSTS>7</ItemWeekSTS>
					<ItemWeekSTT>10</ItemWeekSTT>
					<ItemEquivalenceDays>6</ItemEquivalenceDays>
					<ItemLength>11</ItemLength>
					<ItemWidth>16</ItemWidth>
					<ItemHeight>8</ItemHeight>
					<ItemWeight>28</ItemWeight>
					<ItemUom>PA</ItemUom>
					<ItemBrand>Pepsi</ItemBrand>
					<ItemVelocity>A</ItemVelocity>
					<Skus>
						<Sku>
							<SkuName>5544001</SkuName>
							<SkuDescription>5544001</SkuDescription>
							<SkuLoadAid>WOOD</SkuLoadAid>
							<SkuLength>48</SkuLength>
							<SkuHeight>7099</SkuHeight>
							<SkuWidth>40</SkuWidth>
							<SkuWeight>2000</SkuWeight>
							<SkuQuantity>50</SkuQuantity>
							<SkuGTIN>10019000012249</SkuGTIN>
							<SkuMaxStackHeight>1</SkuMaxStackHeight>
						</Sku>
					</Skus>
				</Item>
			</Items>
		</Body>
		</Document>'

EXECUTE @RC = [Integration].[usp_EnqueueHostInboundMessage] 
   @MessageText



 --EXECUTE [Integration].[usp_ProcessHostInboundMessages]
 --    @ProcessedMessages OUTPUT



SELECT * FROM Integration.HostIncomingMessage ORDER BY InsertDateTime DESC
--SELECT ResultText, * FROM Historical.HostIncomingMessage ORDER BY InsertDateTime DESC

---------------------
---------------------
--SELECT TOP 1* FROM Integration.HostOutgoingMessage ORDER BY InsertDateTime DESC
--SELECT * FROM Historical.HostOutgoingMessage ORDER BY InsertDateTime DESC


--SELECT TOP 1 [Name] FROM Inventory.Item ORDER BY InsertDateTime DESC
--SELECT [Name] FROM Inventory.Sku ORDER BY InsertDateTime DESC

ROLLBACK TRAN



```