This keyword is used to add data to a table. The standard syntax is as follows:
```SQL
INSERT INTO table_name (column_one, column_two, ..., column_n) VALUES ({default | NULL | expression})
```
### NULL and DEFAULT
- Specifying certain column is optional if columns are `NULL` or have `DEFAULT` values

### Constraints
Constraints are used to specify rules for the data in the table.
- `NOT NULL`
- `UNIQUE`
- `PRIMARY KEY`
- `FOREIGN KEY`
- `DEFAULT`
### Multiple Values
Can insert multiple rows separating the VALUES statement with commas.
### Using SELECT Statement for Insert
```SQL
INSERT INTO Comments (CreationDate, PostId, Score, Text, UserDisplayName, UserId)
VALUES (
	GETDATE(),
	(SELECT Id FROM Posts WHERE Title = 'Parallel and distributed computing'),
	0,
	'I added a comment using a SELECT',
)
```
### Retrieving Records on INSERT with OUTPUT
To receive default values or ids, we use OUTPUT:
```SQL
INSERT INTO Posts (PostTypeId, Body)
OUTPUT INSERTED.Id
VALUES (1, 'This is a new post');
```