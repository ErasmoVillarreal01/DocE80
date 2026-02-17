- IS: Whenever you want to check for NULL

Filter data where a value is NULL
```SQL
SELECT *
FROM Employee
WHERE MiddleInitial IS NULL;
```

Filter data where a value is not NULL
```SQL
SELECT *
FROM Employee
WHERE MiddleInitial IS NOT NULL;
```