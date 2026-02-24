---
title: Cancel Transport Order
tags: [sql, message-processing, scripts, sdm, handling]
---

Acript to cancel a transport order manually.

``` sql title="Cancel Transport Order"
BEGIN TRAN

UPDATE SDM_DB.Handling.TransportOrder
set ToCancel = 1, CanResume = 0
WHERE Id = 15260

DECLARE @RC int
DECLARE @MessagesForHandler xml
DECLARE @SendMessages bit = 1
DECLARE @ResultCode int
DECLARE @ResultText nvarchar(max)


EXECUTE @RC = [Handling].[usp_CancelTransportOrders] 
   @MessagesForHandler OUTPUT
  ,@SendMessages
  ,@ResultCode OUTPUT
  ,@ResultText OUTPUT

  

SELECT * FROM Handling.TransportOrder
ROLLBACK TRAN

```