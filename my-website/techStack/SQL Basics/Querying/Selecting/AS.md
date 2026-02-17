- AS : Can change name of a column for the result

```SQL
SELECT Category, AVG(ListPrice) AS AveragePrice
FROM Product
GROUP BY Category;
```