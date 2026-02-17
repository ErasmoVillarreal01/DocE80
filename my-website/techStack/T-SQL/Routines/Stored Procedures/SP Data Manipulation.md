Stored Procedures real usefulness comes from being able to manipulate data. For example creating, updating or deleting data with parameters.

Example Updating Procedure:
```SQL
CREATE PROCEDURE updateSalesPersonData
	@BusinessEntityID INT,
	@SalesQuota MONEY,
	@Bonus MONEY,
	@ComissionPct MONEY
AS
BEGIN
SET NOCOUNT ON
	UPDATE Sales.SalesPersonPluralsightDemo
	SET SalesQuota = @SalesQuota,
		Bonus = @Bonus,
		ComissionPct = @ComissionPct
	WHERE BusinessEntityID = @BusinessEntityID
END

EXCECUTE updateSalesPersonData
	@BusinessEntityID = 300,
	@SalesQuota = 300000,
	@Bonus = 2000,
	@ComissionPct = 0.02
```