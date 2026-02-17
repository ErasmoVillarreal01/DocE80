Delete completely eliminates data from a DB. 
Syntax:
```SQL
DELETE FROM table_name 
WHERE {condition}
```

Removing a specific row:
```SQL
DELETE FROM Comments WHERE Id = 58867
```

Remove multiple rows:
```SQL
DELETE FROM Comments WHERE PostId = 25208
AND CreationDate > '2017-12-01'
```

Remove using JOIN:
```SQL
SELECT COUNT(Id) AS CommentCount FROM Comments;

SELECT COUNT(Id) AS NegativeScorePosts FROM Posts WHERE Score < 0;

DELETE FROM Comments
FROM Comments JOIN Posts ON (Comments.PostId = Posts.Id)
WHERE Posts.Score < 0;
```

Can see which tables where deleted using OUTPUT:
```SQL
DELETE TOP(3) FROM Users
OUTPUT DELETED.*
```