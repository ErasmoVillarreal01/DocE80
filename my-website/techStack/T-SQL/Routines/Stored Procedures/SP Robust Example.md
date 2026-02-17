Contains:
- Input Validation
- Transaction Protection
- Error Handling

```SQL
USE AdventureWorks2022
GO

DECLARE @try int = 1, @tries int = 5, @en int = 0
WHILE @try <= @tries BEGIN
    BEGIN TRY
        SELECT 1/0
    END TRY
    BEGIN CATCH
        SELECT @en = ERROR_NUMBER()
        SET @try += 1
    END CATCH
END
SELECT @en,@try, @tries


GO


CREATE OR ALTER PROCEDURE Production.AddNewBike 
      @SubcategoryName NVARCHAR(50)
    , @ModelName NVARCHAR(50)
    , @ProductName NVARCHAR(50)
    , @ProductNumber NVARCHAR(25)
    , @Color NVARCHAR(15)
    , @SafetyStockLevel SMALLINT
    , @ReorderPoint SMALLINT
    , @StandardCost MONEY
    , @ListPrice MONEY
    , @DaysToManufacture INT
    , @SellStartDate DATETIME
AS
BEGIN

    -- Automatically roll back transactions if errors occur

    SET XACT_ABORT, NOCOUNT ON 

    -- Validate input parameters

    IF @SubcategoryName IS NULL
        OR @ModelName IS NULL
        OR @ProductName IS NULL
        OR @ProductNumber IS NULL 
        -- OR entry for each of the other parameters
    BEGIN
        DECLARE @msg NVARCHAR(MAX) = N'One or more missing input parameters: ';
        SET @msg += 
            (SELECT * 
            FROM 
                (VALUES (@SubcategoryName, @ModelName, @ProductName, @ProductNumber)) -- other parms
                       v(SubcategoryName, ModelName, ProductName, ProductNumber)      -- other parms
            FOR JSON AUTO, INCLUDE_NULL_VALUES
            );
        THROW 51000, @msg, 1;
        RETURN -1;
    END

    -- Process the data in a TRY/CATCH loop

    DECLARE @try int = 0, @tries int = 10;
    DECLARE @en int;
    DECLARE @delay datetime = '00:00:05'

    WHILE @try < @tries BEGIN
        SET @try += 1;
        BEGIN TRY
            BEGIN TRANSACTION;

            IF Production.ufnGetProductSubcategoryID(@SubcategoryName) IS NULL
            BEGIN
                INSERT INTO Production.ProductSubcategory (
                    ProductCategoryID
                    , Name
                    )
                VALUES (
                    Production.ufnGetProductCategoryID('Bikes')
                    , @SubcategoryName
                    );
            END

            IF Production.ufnGetProductModelID(@ModelName) IS NULL
            BEGIN
                INSERT INTO Production.ProductModel (Name)
                VALUES (@ModelName);
            END

            -- Upsert Product Table

            UPDATE Production.Product WITH (UPDLOCK, SERIALIZABLE) 
                SET 
                  Name                  = @ProductName
                , Color                 = @Color
                , SafetyStockLevel		= @SafetyStockLevel
                , ReorderPoint			= @ReorderPoint
                , StandardCost			= @StandardCost
                , ListPrice			    = @ListPrice
                , DaysToManufacture	    = @DaysToManufacture
                , ProductSubcategoryID	= Production.ufnGetProductSubcategoryID(@SubcategoryName)
                , ProductModelId		= Production.ufnGetProductModelID(@ModelName)
                , SellStartDate		    = @SellStartDate
            WHERE ProductNumber = @ProductNumber

            IF @@ROWCOUNT = 0
            BEGIN
                INSERT INTO Production.Product (
                    Name
                    , ProductNumber
                    , Color
                    , SafetyStockLevel
                    , ReorderPoint
                    , StandardCost
                    , ListPrice
                    , DaysToManufacture
                    , ProductSubcategoryID
                    , ProductModelId
                    , SellStartDate
                    )
                VALUES (
                      @ProductName
                    , @ProductNumber
                    , @Color
                    , @SafetyStockLevel
                    , @ReorderPoint
                    , @StandardCost
                    , @ListPrice
                    , @DaysToManufacture
                    , Production.ufnGetProductSubcategoryID(@SubcategoryName)
                    , Production.ufnGetProductModelID(@ModelName)
                    , @SellStartDate
                    );
            END

            COMMIT;
            BREAK;
        END TRY
        BEGIN CATCH
            SET @en = ERROR_NUMBER();
            RAISERROR ('Caught error %i, iteration %i, trancount %i', 0, 1, @en, @try, @@TRANCOUNT) WITH NOWAIT;

            IF @en = 2601 -- Cannot insert duplicate key row in object 
                BREAK;
            IF @en IN (1205, 1222) -- Deadlock or Lock timeout
            BEGIN
                IF @@TRANCOUNT > 0
                    ROLLBACK;
                WAITFOR DELAY @delay;
                CONTINUE;
            END;

            -- Rethrow the error if not handled
            THROW;
        END CATCH

    END -- End of while loop

    IF @@TRANCOUNT > 0
        ROLLBACK;
    IF @try > @tries
    BEGIN
        THROW 51000, 'Deadlock or lock timeout occurred, aborting operation', 1;
    END

END
GO

BEGIN TRAN

EXEC Production.AddNewBike 'Electric Bikes'
    , 'Electric-100'
    , 'Electric Red'
    , 'BK-E10R-62'
    , 'YELLOW'
    , 1
    , 1
    , 100.00
    , 200.00
    , 1
    , '20240601'

/* -- 
DELETE FROM Production.Product WHERE ProductNumber LIKE 'BK-E10%'
DELETE FROM Production.ProductSubcategory WHERE NAME LIKE 'Electric%'
DELETE FROM Production.ProductModel WHERE NAME LIKE 'Electric%'
-- */

SELECT *
FROM Production.Product
WHERE ProductNumber = 'BK-E10R-62'

ROLLBACK

```