### CAST
Converts one data type to another
```SQL
SELECT CAST(7 AS DECIMAL(5,2)) / 2 AS Division;
SELECT CAST(GETDATE() AS VARCHAR)
```
### TRY_CAST
Converts one data type to another, will return NULL if conversion fails. **Best practice**
```SQL
SELECT TRY_CAST('hello world' AS INT)
```
### CONVERT
Converts one data type to another with additional parameter for styling
```SQL
SELECT CONVERT(VARCHAR, GETDATE(), 2)
```
### TRY_CONVERT
Converts one data type to another with additional parameter for styling, will return NULL if conversion fails
```SQL
SELECT TRY_CONVERT(INT, 'hello world')
```