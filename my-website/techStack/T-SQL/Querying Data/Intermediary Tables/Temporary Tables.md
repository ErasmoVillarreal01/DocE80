Temporary Tables held in memory as long as the connection is open. They must have alias field names (`AS`).
Can be used just as any other table in the database to query data.

```SQL
SELECT field1, field2, field3
INTO #Temporary_Table
FROM table
SELECT FieldName1, FieldName2, FieldName3
DROP TABLE #Temporary_Table
```