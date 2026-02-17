Stored Procedures are saved queries that can be called and executed. Stored Procedures are similar to [Functions](../Functions/Functions.md) and can receive parameters. 

Stored Procedures **can** perform permanent environmental changes in SQL Server (Ex. `INSERT` or  `UPDATE`)

General Structure of a Stored Procedure:
```SQL
CREATE PROCEDURE Demo.uspUpdateRepPerformance

AS
BEGIN
	SET NOCOUNT ON;
	
	SELECT 
	SP.BusinessEntityID AS EmployeeID,
	SUM(SOD.OrderQty) AS SalesQuantity,
	SUM(SOD.OrderQty * PRD.ListPrice) AS SalesRevenue,
	DATEPART(YEAR, SOH.OrderDate) AS OrderYear
	
	FROM
	Sales.SalesOrderHeader SOH
	LEFT JOIN Sales.SalesOrderDetail SOD
		ON SOD.SaledOrderID = SOH.SalesOrderID
	LEFT JOIN Sales.SalesPerson SP
		ON SP.BusinessEntityID = SOH.SalesPerson ID
	LEFT JOIN HumanResources.Employee EMP
		ON EMP.BusinessEntityID = SP.BusinessEntityID
	LEFT JOIN Person.Person PER
		ON PER.BusinessEntityID = EMP.BusinessEntityID
	LEFT JOIN Production.Product PRD
		ON PRD.ProductID = SOD.ProductID
		
	GROUP BY
	SP.BusinessEntityID,
	DATEPART(YEAR, SOH.OrderDate)

END
GO
```

To utilize the stored procedure:
```SQL
EXECUTE Demo.uspUpdateRepPerformance;
```

Modify to insert in a Stored Procedure:
```SQL
ALTER PROCEDURE Demo.uspUpdateRepPerformance

AS
BEGIN
	SET NOCOUNT ON;
	
	-- Delete data beofre inserting (specific case)
	TRUNCATE TABLE Demo.RepPerformance
	
	INSERT INTO Demo.RepPerformance
	(
		EmployeeID,
		SalesQuantity,
		SalesRevenue,
		OrderYear
	)
	
	SELECT 
	SP.BusinessEntityID AS EmployeeID,
	SUM(SOD.OrderQty) AS SalesQuantity,
	SUM(SOD.OrderQty * PRD.ListPrice) AS SalesRevenue,
	DATEPART(YEAR, SOH.OrderDate) AS OrderYear
	
	FROM
	Sales.SalesOrderHeader SOH
	LEFT JOIN Sales.SalesOrderDetail SOD
		ON SOD.SaledOrderID = SOH.SalesOrderID
	LEFT JOIN Sales.SalesPerson SP
		ON SP.BusinessEntityID = SOH.SalesPerson ID
	LEFT JOIN HumanResources.Employee EMP
		ON EMP.BusinessEntityID = SP.BusinessEntityID
	LEFT JOIN Person.Person PER
		ON PER.BusinessEntityID = EMP.BusinessEntityID
	LEFT JOIN Production.Product PRD
		ON PRD.ProductID = SOD.ProductID
		
	GROUP BY
	SP.BusinessEntityID,
	DATEPART(YEAR, SOH.OrderDate)

END
GO
```

Parameters can also be included in the Stored Procedure:
```SQL
ALTER PROCEDURE Demo.uspUpdateRepPerformance
	@OrderYear INT
AS
BEGIN
	SET NOCOUNT ON;
	
	-- Delete data beofre inserting (specific case)
	TRUNCATE TABLE Demo.RepPerformance
	
	INSERT INTO Demo.RepPerformance
	(
		EmployeeID,
		SalesQuantity,
		SalesRevenue,
		OrderYear
	)
	
	SELECT 
	SP.BusinessEntityID AS EmployeeID,
	SUM(SOD.OrderQty) AS SalesQuantity,
	SUM(SOD.OrderQty * PRD.ListPrice) AS SalesRevenue,
	DATEPART(YEAR, SOH.OrderDate) AS OrderYear
	
	FROM
	Sales.SalesOrderHeader SOH
	LEFT JOIN Sales.SalesOrderDetail SOD
		ON SOD.SaledOrderID = SOH.SalesOrderID
	LEFT JOIN Sales.SalesPerson SP
		ON SP.BusinessEntityID = SOH.SalesPerson ID
	LEFT JOIN HumanResources.Employee EMP
		ON EMP.BusinessEntityID = SP.BusinessEntityID
	LEFT JOIN Person.Person PER
		ON PER.BusinessEntityID = EMP.BusinessEntityID
	LEFT JOIN Production.Product PRD
		ON PRD.ProductID = SOD.ProductID
		
	WHERE 
	DATEPART(YEAR, SOH.OrderDate) = @OrderYear
		
	GROUP BY
	SP.BusinessEntityID,
	DATEPART(YEAR, SOH.OrderDate)

END
GO
```

To use a stored procedure with parameters we use:
 ```SQL
EXEC Demo.uspUpdateRepPerformance @OrderDate = 2012;
```

To delete a stored procedure:
```SQL
DROP PROCEDURE <procedureName>
```