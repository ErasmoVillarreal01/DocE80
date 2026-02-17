HAVING : Used to filter using grouped data

Obtain the number of rows for each category that is discontinued and the rows are greater than 100
```SQL
SELECT COUNT(*), Category
FROM Product
WHERE Status <> 'Discontinued'
GROUP BY Category
HAVING COUNT(*) > 100;
```

**Important**
Only used when using [GROUP BY](GROUP%20BY.md)