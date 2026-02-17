A View is a virtual table created from the results of a SELECT Query. It is a way to save queries, sort of like a function but for SELECT Queries. 

Useful for:
- Convenience of simplification
- Enhanced Security

### Creating a View
To create a View:
```SQL
CREATE VIEW view_name AS
SELECT
	column1,
	column2,
	...
FROM table_name
WHERE condition;
```

Example:
```SQL
CREATE VIEW DetialsView AS
SELECT Name, Address
FROM StudentDetails
WHERE S_ID < 5;
```
### Using a View
To use the view:
```SQL
SELECT * FROM DetailsView;
```
### Updating a View
To update the view definition:
```SQL
CREATE OR REPLACE VIEW view_name AS  
SELECT column1, column2, ...  
FROM table_name  
WHERE condition;
```
### Deleting a View
```SQL
DROP VIEW view_name;
```