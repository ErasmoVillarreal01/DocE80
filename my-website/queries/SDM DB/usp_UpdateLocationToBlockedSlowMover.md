
# usp_UpdateLocationToBlockedSlowMover

Procedure to alternate between Vertique Slow Mover lanes for dropping stock units

```sql
USE [SDM_DB]
GO
/****** Object:  StoredProcedure [Custom].[usp_UpdateLocationToBlockedSlowMover]    Script Date: 12/02/2026 09:47:18 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [Custom].[usp_UpdateLocationToBlockedSlowMover]
	@IdContainer		INT,
	@ResultCode			INT  OUTPUT,
	@ResultText			XML  OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY


        DECLARE @trancount							INT,
				@rc									INT = 0
        DECLARE @actProcName SYSNAME = OBJECT_NAME(@@PROCID);
        DECLARE @ContainerName NVARCHAR(50),
                @NewContainerName NVARCHAR(50),
                @NewIdContainer INT;

        SELECT @ContainerName = Name
        FROM Warehouse.ContainerName
        WHERE IdContainer = @IdContainer;

         IF EXISTS (
            SELECT 1 FROM Warehouse.[Block] blk
            INNER JOIN Storage.Automation au
            on blk.IdContainer = au.Id_Container
            WHERE IdContainer = @IdContainer and au.Id_AutomationStatus = 10
        )
        BEGIN
            IF RIGHT(@ContainerName, 1) = N'A'
                SET @NewContainerName = LEFT(@ContainerName, LEN(@ContainerName) - 1) + N'B';
            ELSE IF RIGHT(@ContainerName, 1) = N'B'
                SET @NewContainerName = LEFT(@ContainerName, LEN(@ContainerName) - 1) + N'A';

            SELECT TOP(1) @NewIdContainer = IdContainer
            FROM Warehouse.ContainerName
            WHERE Name = @NewContainerName;

            IF NOT EXISTS (
                SELECT 1 FROM Warehouse.[Block] blk
                INNER JOIN Storage.Automation au
                on blk.IdContainer = au.Id_Container
                WHERE IdContainer = @NewIdContainer and au.Id_AutomationStatus = 10
            )
            BEGIN -- when one slow mover blocked
               INSERT INTO InMemoryTmp.UnfitLocation ([IdLocation], ResultCode, ProcedureName, NestLevel, Peremptory) 
               VALUES ( @IdContainer, '' , @actProcName, @@NESTLEVEL, 1 )
               RETURN @NewIdContainer
            END
            else -- when both blocked
            begin 
                INSERT INTO InMemoryTmp.UnfitLocation ([IdLocation], ResultCode, ProcedureName, NestLevel, Peremptory) 
                VALUES ( @IdContainer, '' , @actProcName, @@NESTLEVEL, 1 ), ( @NewIdContainer, '' , @actProcName, @@NESTLEVEL, 1 )
                RETURN @IdContainer
            end
        END
        RETURN @IdContainer
    END TRY

 
	BEGIN CATCH 
		--DECLARE @xstate INT = XACT_STATE()
		--IF ( (@xstate = 1 AND @trancount = 0) OR @xstate = -1 )
		--	ROLLBACK;
		--IF ( (@xstate = 1 AND @trancount = 0) OR @xstate IN (-1, 0) )
		--	EXEC [Common].[usp_LogProcedureError] @LoggingProcedure = @actProcName;
 
		--THROW;
		--RETURN 99   
	END CATCH	 
END




select * from Warehouse.ContainerName 
```