### ISNULL
IF X IS NULL, returns Y
```SQL
ISNULL (X, Y)
```
### COALESCE
Returns the first known expression
```SQL
COALESCE (X, Y, Z)
```
### CASE
Generic conditional expression
```SQL
CASE
	WHEN X IS NULL
		THEN Y
	ELSE Z
END
```
### NULLIF
Evaluates to NULL if X = Y
```SQL
NULLIF (X, Y)
```