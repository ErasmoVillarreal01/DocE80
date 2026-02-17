- JOIN : Join another table through its primary key and foreign key
- ON : Specifies the ids used to join the tables

Get columns from employee including its department's information
```SQL
SELECT Employee.FirstName, Employee.LastName, Email, Employee.DepartmentID, Department.Name, Department.Location
FROM Employee
JOIN Department ON Employee.DepartmentID = Departmet.DepartmentID;
```

**Important**
A basic JOIN is the same as INNER JOIN