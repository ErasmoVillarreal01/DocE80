Returns the position of a pattern in a string, if the pattern is not found, this function returns 0:
```SQL
PATINDEX('%pattern%', string)
```

```SQL
SELECT PATINDEX('%com%', 'W3Schools.com');
```

Validate Email Format in a [[Triggers|Trigger]] Example:
```SQL
CREATE TRIGGER ValidateEmailFormat
ON ExampleTable
FOR INSERT
AS
BEGIN
	IF EXISTS (SELECT * FROM inserted WHERE
		PATINDEX('%[_a-z0-9-]+(\.[_a-z0-9-]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})%', email) = 0)
		RAISERROR('Invalid email format', 16, 1)
	ELSE
		INSERT INTO ExampleTable SELECT * FROM inserted
END
```