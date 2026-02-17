For Scalar Valued Functions the user must define the output **data type** in the `RETURNS` statement.
When using the function must use `SELECT`.

General Structure of a Scalar Valued Function:
```SQL
CREATE FUNCTION Demo.ufnGetFirstOrderDate
(

)
RETURNS DATE
AS
BEGIN
	--Declare the return variable
	DECLARE @FirstOrderDate AS DATE;
		
	--Statement to compute the return value here
	SELECT @FirstOrderDate = '2/05/2019';
	
	--Return the result of the function
	RETURN @FirstOrderDate;
END
```

To utilize the scalar valued function:
```SQL
SELECT Demo.ufnGetFirstOrderDate()
```

To modify a function that already exists, we use the `ALTER` keyword:
```SQL
ALTER FUNCTION Demo.ufnGetFirstOrderDate
(

)
RETURNS DATE
AS
BEGIN
	--Declare the return variable
	DECLARE @FirstOrderDate AS DATE;
		
	--Statement to compute the return value here
	SELECT @FirstOrderDate = '2/05/2020';
	
	--Return the result of the function
	RETURN @FirstOrderDate;
END
```

Parameters can also be included in the function:
```SQL
CREATE FUNCTION dbo.AddValues
(
	@Val_1 INT,
	@Val_2 INT
)
RETURNS INT
AS
BEGIN
	--Return the result of the function
	RETURN @Val_1 + @Val_2;
END
```

To use a function with parameters we use:
 ```SQL
SELECT dbo.AddValues(1,2)
```

Parameters can have default values:
```SQL
CREATE FUNCTION dbo.AddValues
(
	@Val_1 INT = 1,
	@Val_2 INT = 2
)
RETURNS INT
AS
BEGIN
	--Return the result of the function
	RETURN @Val_1 + @Val_2;
END
```

If want to use default values, `default` must be specified:
 ```SQL
SELECT dbo.AddValues(default, default)
```