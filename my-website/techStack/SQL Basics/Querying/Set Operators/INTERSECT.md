- INTERSECT: Returns only fields that match in both queries

Obtain all cities that are in both Employees and Customers
```SQL
SELECT City FROM Employees
INTERSECT
SELECT City FROM Customers
```