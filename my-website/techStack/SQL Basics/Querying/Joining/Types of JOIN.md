## INNER JOIN
Retrieves data from two tables but only shows results when there is an exact match (normal JOIN)
```SQL
SELECT Employee.FirstName, Employee.LastName, Email, Employee.DepartmentID, Department.Name, Department.Location
FROM Employee
INNER JOIN Department ON Employee.DepartmentID = Departmet.DepartmentID;
```
## OUTER JOIN
If any rows in table A that do not match with Table B still return those rows. 
Left is FROM table
Right is JOIN table
FULL is everything

Additional rows from Employee even if no match with Department
```SQL
SELECT Employee.FirstName, Employee.LastName, Email, Employee.DepartmentID, Department.Name, Department.Location
FROM Employee
LEFT OUTER JOIN Department ON Employee.DepartmentID = Departmet.DepartmentID;
```
Additional rows from Department even if no match with Employee
```SQL
SELECT Employee.FirstName, Employee.LastName, Email, Employee.DepartmentID, Department.Name, Department.Location
FROM Employee
RIGHT OUTER JOIN Department ON Employee.DepartmentID = Departmet.DepartmentID;
```
Additional rows from Department and Employee
```SQL
SELECT Employee.FirstName, Employee.LastName, Email, Employee.DepartmentID, Department.Name, Department.Location
FROM Employee
FULL OUTER JOIN Department ON Employee.DepartmentID = Departmet.DepartmentID;
```
## NATURAL JOIN
Joins the table without the need of specifying the ON relationship.
Both tables must have a column with the same name and data type.
```SQL
SELECT OrderID, OrderDate, TotalAmount,
	Customer.LastName, Customer.Email
FROM Order NATURAL JOIN Customer;
```
## SELF JOIN
Creates a JOIN to itself, used when a table has a relationship to itself.
```SQL
SELECT 
	mngrs.EmployeeID AS ManagerID,
	emps.EmployeeID
FROM Employees emps
LEFT JOIN Employees mngrs ON emps.ReportsTo = mngrs.EmployeeID
```