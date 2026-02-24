---
title: Enqueue Message
tags: [sql, message-processing, scripts, sdm, host-messages]
---

Procedure to enqueue host incoming messages.

``` sql title="Enqueue Host Incoming Message"
BEGIN TRAN
    
DECLARE @RC int
DECLARE @IdContainer int = 26524
DECLARE @IdBlockingReason smallint = 24
DECLARE @User nvarchar(50) = 'System'
DECLARE @Comment nvarchar(1024) = 'Test block'
DECLARE @IdContainerBlock bigint
DECLARE @ResultCode int
DECLARE @ResultText xml

EXECUTE @RC = [BffCore].[usp_AddBlockFromUi] 
   @IdContainer
  ,@IdBlockingReason
  ,@User
  ,@Comment
  ,@IdContainerBlock OUTPUT
  ,@ResultCode OUTPUT
  ,@ResultText OUTPUT

SELECT @ResultCode, @ResultText, @IdContainerBlock

ROLLBACK TRAN

-------------------
-------------------
GO
-------------------
------------------- 

BEGIN TRAN

DECLARE @RC int
DECLARE @IdContainerBlock bigint = 117
DECLARE @User nvarchar(50) = 'SYSTEM'
DECLARE @Comment nvarchar(1024)= 'Test enable'
DECLARE @ResultCode int
DECLARE @ResultText xml

EXECUTE @RC = [BffCore].[usp_RemoveBlockFromUi] 
   @IdContainerBlock
  ,@User
  ,@Comment
  ,@ResultCode OUTPUT
  ,@ResultText OUTPUT

SELECT @ResultCode, @ResultText, @IdContainerBlock

SELECT * FROM Warehouse.Block -- este tiene el @IdContainerBlock
ROLLBACK TRAN
```