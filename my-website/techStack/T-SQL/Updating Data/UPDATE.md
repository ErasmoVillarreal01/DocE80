Updates data in an existing table
 ```SQL
 UPDATE table_name SET (column_1 = value_1, column_2 = value_2, ..., column_n = value_n)
 WHERE {condition}
 ```

To modify data in one row use WHERE condition that only returns one user (PK or UNIQUE):
```SQL
UPDATE Users SET
	UpVotes = 10,
	DownVotes = 5
	WHERE DisplayName = 'Xavier'
```

Can use ROWCOUNT to get number of rows updated:
```SQL
DECLARE @rowsAffected INT

UPDATE Users SET
	Views = 1001
	WHERE DisplayName LIKE '%Xavier%';
	
SET @rowsAffected = @@ROWCOUNT

IF @rowsAffected > 0
PRINT 'Multiple rows have been updated: ' + CAST(@rowsAffected AS VARCHAR(10));
```

Updates using a variable:
```SQL
SELECT Id, DisplayName, Reputation, CreationDate
FROM Users
ORDER BY Reputation DESC

DECLARE @YearsActive INT = 0

UPDATE Users SET
	@YearsActive = YEAR(GETDATE()) - YEAR(Users.CreationDate),
	Reputation += @YearsActive;
```

Updates can also be done using JOIN and FROM:
```SQL
SELECT ID, PostTypeId, Score, Title
FROM Posts
WHERE PostTypeId = 1
ORDER BY Score DESC;

UPDATE Posts
SET Posts.Score += Comments.Score * 10
FROM Posts. INNER JOIN Comments ON (Posts.Id = Comments.PostId)
WHERE Posts.PostTypeId = 1;
```

Can also use OUPUT to see updated data:
```SQL
UPDATE Posts SET
	Score += FavoriteCount
OUTPUT Inserted.Id, Inserted.Title, Inserted.Score, Inserted.FavoriteCount
WHERE FavoriteCount > 50;
```