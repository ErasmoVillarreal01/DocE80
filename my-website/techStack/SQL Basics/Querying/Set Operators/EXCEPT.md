- INTERSECT: Returns fields from first query that do not match second query

Obtain all cities from employees that do not match with the cities from customers
```SQL
SELECT City FROM Employees
EXCEPT
SELECT City FROM Customers
```