---
title: Shipment Process
tags: [sql, message-processing, scripts, sdm, shipping]
---

## Overview

This script simulates the complete life cycle of a shipment after its creation, sequentially progressing through each shipment status. It includes the activation of the shipment, the generation of the required transport orders, and the execution of those orders until the shipment is fully completed.


---

## Example: Simulating mission process

```sql title="Shipment monitor process"

begin tran

select 'before monitor', * from Shipping.Shipment

DECLARE @RC int
DECLARE @AMISMessages xml
DECLARE @SendMessages bit
DECLARE	@return_value Int,
		@XmlReplyMessage xml,
		@ResultCode INT,
		@ResultText NVARCHAR(max)


EXECUTE @RC = [Shipping].[usp_OutboundShipmentMonitorProcess] 
EXECUTE @RC = [Shipping].[usp_OutboundShipmentMonitorProcess] 
EXECUTE @RC = [Shipping].[usp_OutboundShipmentMonitorProcess] 
EXECUTE @RC = [Shipping].[usp_OutboundShipmentMonitorProcess] 


EXEC	@return_value = [Integration].[usp_ProcessHostMessage_SHP_CTRL]
		@XmlMessage = N'<Document>
  <Header>
    <Sender>HOST</Sender>
    <Receiver>E80</Receiver>
    <SendDate>2023-09-12T18:05:38+02:00</SendDate>
    <MessageType>SHP_CTRL</MessageType>
    <MessageId>12345</MessageId>
  </Header>
  <Body>
    <ShipmentNumber>202505261107</ShipmentNumber>
    <Priority>10</Priority>
    <DueDatetime>2023-09-30 20:00:00+02:00</DueDatetime>
    <ControlCode>Activate</ControlCode>
  </Body>
</Document>
',


		@XmlReplyMessage = @XmlReplyMessage OUTPUT,
		@ResultCode = @ResultCode OUT,
		@ResultText = @ResultText OUT

SELECT	@XmlReplyMessage as N'@XmlReplyMessage'

SELECT	@return_value as 'Return Value', @ResultCode ResultCode, @ResultText ResultText


select * from Shipping.Shipment



-- TODO: Set parameter values here.
set @SendMessages = 'true'

EXECUTE @RC = [Handling].[usp_ReleaseTransportOrders] 
   @AMISMessages OUTPUT
  ,@SendMessages
  ,@ResultCode OUTPUT
  ,@ResultText OUTPUT


EXECUTE @RC = [Handling].[usp_ReleaseTransportOrders] 
   @AMISMessages OUTPUT
  ,@SendMessages
  ,@ResultCode OUTPUT
  ,@ResultText OUTPUT


EXECUTE @RC = [Shipping].[usp_OutboundShipmentMonitorProcess] 

select 'debug 2', * from Shipping.Shipment


EXECUTE @RC = [Handling].[usp_ReleaseTransportOrders] 
   @AMISMessages OUTPUT
  ,@SendMessages
  ,@ResultCode OUTPUT
  ,@ResultText OUTPUT


EXECUTE @RC = [Shipping].[usp_OutboundShipmentMonitorProcess] 


select 'debug 3', * from Shipping.Shipment



EXECUTE @RC = [Handling].[usp_ReleaseTransportOrders] 
   @AMISMessages OUTPUT
  ,@SendMessages
  ,@ResultCode OUTPUT
  ,@ResultText OUTPUT


select 'after monitor', * from Shipping.Shipment

select 'TOs', * from HAndling.TransportOrder


SELECT 'LGVM OutgoingMessages', * FROM Lgvm.OutgoingMessage
SELECT top 100 'HostOutgoingMessage', * FROM Integration.HostOutgoingMessage order by InsertDateTime desc



rollback tran

```
