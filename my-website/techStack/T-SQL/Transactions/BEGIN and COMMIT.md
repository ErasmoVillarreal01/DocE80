BEGIN Transaction initializes a transaction.
COMMIT Transaction publishes the transaction.

Can also just use `BEGIN` and `COMMIT` keywords.

Example:
```SQL
BEGIN TRANSACTION;

UPDATE Posts SET
	OwnerUserId = 75298,
	OwnerDisplayName = 'xavier-morera'
WHERE OwnerUserId = 836;

UPDATE Comments SET
	UserId = 75298,
	UserDisplayName = 'xavier-morera'
WHERE UserId = 836;

COMMIT TRANSACTION;
```

To query data locked in a transaction use NOLOCK
```SQL
SELECT * FROM Posts
WITH (NOLOCK)
WHERE OwnerUserId = 75298;
```