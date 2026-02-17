GROUP BY : Groups results by a specific category or column.

Obtain number of rows for each category
```SQL
SELECT COUNT(*), Category
FROM Product
GROUP BY Category;
```

**Important**
When you use GROUP BY you must also use an [Aggregate Function](../Aggregate%20Functions.md)