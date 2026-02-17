Creates a loop for SQL. While Loops can also have BREAK and CONTINUE.
```SQL
DECLARE @Counter INT
SET @Counter=1

WHILE ( @Counter <= 10)
BEGIN
    PRINT 'The counter value is = ' + CONVERT(VARCHAR,@Counter)
    SET @Counter  = @Counter  + 1
END
```