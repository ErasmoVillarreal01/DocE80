To declare a variable in T-SQL:
```SQL
DECLARE @num AS BIGINT
```
To set the value of a variable:
```SQL
SET @num = 30
```
Variable can then be used in queries as follows:
```SQL
SELECT TOP(@num)
...
```

Variables can be assigned values using SELECT:
```SQL
-- 1. Declare the variable
DECLARE @VariableName DataType;

-- 2. Assign the value using SELECT
SELECT @VariableName = ColumnName
FROM TableName
WHERE Condition;
```