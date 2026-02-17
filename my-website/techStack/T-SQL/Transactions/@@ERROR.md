Can use `@@ERROR` to verify if there was an error throughout the process and rollback, else commit.
```SQL
BEGIN

INSERT INTO Person.ContactType(Name)
VALUES('Owner')

IF(@@ERROR > 0)
BEGIN
	ROLLBACK
END
ELSE
BEGIN
	COMMIT
END
```