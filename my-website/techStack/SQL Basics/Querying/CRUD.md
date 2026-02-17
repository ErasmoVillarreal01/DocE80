
| CRUD | Create | Read   | Update | Delete |
| ---- | ------ | ------ | ------ | ------ |
| SQL  | INSERT | SELECT | UPDATE | DELETE |
## INSERT
Creates a row of data into a table. Does not need to insert data to all columns if columns accept NULL or DEFAUL values.
```SQL
INSERT INTO TableName (column1, column2) VALUES (value1, value2);
```
## UPDATE
Updates the data of a table. Must specify the columns that are meant to be updated.
```SQL
UPDATE Employee
SET status = 'Retired', Salary = 0, DepartmentID = NULL
WHERE EmployeeID = 6543;
```
**Important**
Updates must always have a where clause, or all data will be updated for table.
## DELETE
Deletes data of a table. If delete is used all of the row will be deleted.
```SQL
DELETE FROM Employee
WHERE EmployeeID = 6543;
```
**Important**
Deletes must always have a where clause, or all data will be deleted for table.