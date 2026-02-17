Used to insert more than 1 record with a large file with structured data (`.csv`)

Example:
```SQL
BULK INSERT Comments
FROM 'F:\tsql\comments.csv'
WITH (
	FIRSTROW = 2,
	FORMAT = 'CSV'
);
```