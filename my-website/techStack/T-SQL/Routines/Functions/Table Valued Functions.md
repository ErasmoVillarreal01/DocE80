For Table Valued Functions the user must define the output as **TABLE** in the `RETURNS` statement.
When using the function must use `SELECT`.

Uses a similar structure found in [](Scalar%20Valued%20Functions.md). 

Valid Structure **1** for a Table Valued Function:
```SQL
CREATE FUNCTION GetEmployeesByDepartment(
	@DeptName VARCHAR(50)
)
RETURNS TABLE
AS 
RETURN (
	SELECT EmployeeID, FirstName, LastName
	FROM Employees
	WHERE Department = @DeptName
)
```

Valid Structure **2** for a Table Valued Function.
This type is also called **Multi-Statement Table-Valued Functions** : ^aa1667
```SQL
CREATE FUNCTION GetEmployeesByDepartment_MV(
	@DeptName VARCHAR(50)
)
RETURNS @EmployeeTable TABLE (
	EmployeeID INT,
	FirstName VARCHAR(50),
	LastName VARCHAR(50)
)
AS 
BEGIN
	INSERT INTO @EmployeeTable(EmployeeID, FirstName, LastName)
	SELECT EmployeeID, FirstName, LastName
	FROM Employees
	WHERE Department = @DeptName
	
	RETURN
END
```

To use the Table Valued Function:
```SQL
SELECT * FROM GetEmployeesByDepartment('IT')
SELECT * FROM GetEmployeeByDepartment_MV('IT')
```