- ORDER BY: Written at the end, specifies a sorting rule.

Order a query by Unit Price by Ascending Order
```SQL
SELECT ProductName, Category, UnitPrice
FROM Product
WHERE Status <> 'Discontinued'
ORDER BY UnitPrice;
```
Order a query by Unit Price by Descending Order
```SQL
SELECT ProductName, Category, UnitPrice
FROM Product
WHERE Status <> 'Discontinued'
ORDER BY UnitPrice DESC;
```
Order a query by multiple columns, first last_name then first_name
```SQL
SELECT last_name, first_name
FROM employees
WHERE status = 'Active'
ORDER BY last_name, first_name;
```