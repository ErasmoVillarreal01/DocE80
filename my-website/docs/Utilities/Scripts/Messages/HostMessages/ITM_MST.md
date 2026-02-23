---
title: ITM_MST - Item Master
tags: [sql, message-processing, scripts, sdm]
---

# ITM_MST - Item Master

- **Source:** HOST
- **Destination:** SDM
- **Trigger:** Change some items or skus in the system or insert a new items and skus.
- **Action:** Item(s) and sku(s) change according to the newer data. Nothing changes on already created stock unit having one of the changed skus.

---

Example of processing the message

```sql title="Process_ITM_MST.sql"
--SET TRANSACTION ISOLATION LEVEL READ COMMITTED
DECLARE	@return_value Int,
		@XmlReplyMessage xml,
		@ResultCode INT,
		@ResultText NVARCHAR(max)

DECLARE @ROLLBACK			BIT = 1

begin tran


EXEC	@return_value = [Integration].[usp_ProcessHostMessage_ITM_MST]
		@XmlMessage = 
		N'<Document>
			<Header>
				<Sender>Host</Sender>
				<Receiver>E80</Receiver>
				<SendDate>2025-12-12T09:32:25+02:00</SendDate>
				<MessageType>ITM_MST</MessageType>
				<MessageId>12345</MessageId>
			</Header>
			<Body>
			<Items>
				<Item>
					<Item>55501</Item>
					<LegacyItemName>999002</LegacyItemName>
					<ItemType>ZFIN</ItemType>
					<ItemDescription>999002</ItemDescription>
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
							<SkuName>980050</SkuName>
							<SkuDescription>980050</SkuDescription>
							<SkuLoadAid>WOOD</SkuLoadAid>
							<SkuLength>48</SkuLength>
							<SkuHeight>70</SkuHeight>
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
		</Document>',


		@XmlReplyMessage = @XmlReplyMessage OUTPUT,
		@ResultCode = @ResultCode OUT,
		@ResultText = @ResultText OUT

SELECT	@XmlReplyMessage as N'@XmlReplyMessage'

SELECT	@return_value as 'Return Value', @ResultCode ResultCode, @ResultText ResultText

select TOP 1 'Item', * from Inventory.Item ORDER BY LastUpdateDateTime DESC
select TOP 1 'Sku', * from Inventory.Sku ORDER BY LastUpdateDateTime DESC




IF @ROLLBACK = 1
	rollback
ELSE
	commit
GO

```

Example of ITM_MST xml message

```xml
<Document>
  <Header>
    <Sender>HOST</Sender>
    <Receiver>SDM</Receiver>
    <SendDate>2013-04-08T09:32:25+02.00</SendDate>
    <MessageType>ITM_MST</MessageType>
    <MessageId>12345</MessageId>
  </Header>
  <Body>
    <Items>
      <Item>
        <ItemName>101060</ItemName>
        <ItemDescription>Item 101060 description</ItemDescription>
        <ItemExtendedDescription>Item 101060 extended description</ItemExtendedDescription>
        <ItemGTIN>08121001010101</ItemGTIN>
        <ItemLength>0.31</ItemLength >
        <ItemWidth>0.40</ItemWidth>
        <ItemHeight>0.37</ItemHeight>
        <ItemWeight>4.40</ItemWeight>
        <ItemQuantity>4.40</ItemQuantity>
        <ItemUom>Pieces</ItemUom>
        <ItemUomPackage>Cases</ItemUomPackage>
        <ItemIncubationDays>20</ItemIncubationDays>
        <ItemDaysToExpiry>60</ItemDaysToExpiry>
        <ItemShelflife>350</ItemShelflife>
        <ItemEquivalenceDays>2</ItemEquivalenceDays>
        <SkuName>101060A</SkuName>
        <SkuDescription>Sku 101060 A description</SkuDescription>
        <SkuLoadAid>EURO</SkuLoadAid>
        <SkuLength>140</SkuLength>
        <SkuWidth>140</SkuWidth>
        <SkuHeight>140</SkuHeight>
        <SkuWeight>140</SkuWeight>
        <SkuQuantity>140</SkuQuantity>
        <SkuLayers>2</SkuLayers>
        <SkuGTIN>10210012101145</SkuGTIN>
        <SkuStability>9</SkuStability>
        <SkuMaxStackHeight>1</SkuMaxStackHeight>
      </Item>
     </Items>
  </Body>
</Document>


```


