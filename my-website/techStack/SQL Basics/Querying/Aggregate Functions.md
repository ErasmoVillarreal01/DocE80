Perform calculation from multiple data to get a single value.
- COUNT( ) : Count number of elements
- SUM( ) : Sums a number of elements
- MAX( ) : Finds the largest value
- MIN( ): Finds the smallest value
- AVG( ): Finds the average value

Count all the rows of the query
```SQL
SELECT COUNT(*)
FROM Employee;

-- Another example
SELECT p.ProductName, COUNT(od.ProductID) AS NumOfProductOrders
FROM Products p
LEFT JOIN [Order Det[[ToDo List]]ails] od ON p.ProductID = od.ProductID
GROUP BY p.productName
ORDER BY COUNT(od.ProductID);
```
Sums all of the minutes watched from the user
```SQL
SELECT SUM(minutes_watched)
FROM user_session
WHERE user_id = 'sherrock42';
```
Obtain the largest value of a column
```SQL
SELECT MAX(ListPrice)
FROM Product;
```
Obtain the smallest value of a column
```SQL
SELECT MIN(ListPrice)
FROM Product;
```
Obtain the average value of a column
```SQL
SELECT AVG(ListPrice)
FROM Product;
```