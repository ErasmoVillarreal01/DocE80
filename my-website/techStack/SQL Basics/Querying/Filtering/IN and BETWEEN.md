- IN : Use column name once and filter for multiple values
- BETWEEN : Filter by a range of numbers, dates  and times

Filters by multiple conditions
```SQL
SELECT *
FROM Employee
WHERE Department IN ('Sales', 'Marketing', 'Engineering');
```
Filters by not multiple conditions
```SQL
SELECT *
FROM Employee
WHERE Department NOT IN ('Sales', 'Marketing', 'Engineering');
```
Filters by a range of numbers
```SQL
SELECT *
FROM Artifacts
WHERE year BETWEEN 1900 AND 1950;
```
Filter by a range of dates
```SQL
SELECT *
FROM Orders
WHERE OrderDate BETWEEN '2024-01-01' AND '2024-01-31';
```