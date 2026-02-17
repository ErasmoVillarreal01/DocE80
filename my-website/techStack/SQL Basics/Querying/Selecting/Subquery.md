It is a way to run a query inside of another query. Typically used to include inside WHERE conditions using aggregate functions.

Get all products with a list price above the average
```SQL
SELECT ProductName, ListPrice
FROM Product
WHERE ListPrice > (SELECT AVG(ListPrice) FROM Product);
```