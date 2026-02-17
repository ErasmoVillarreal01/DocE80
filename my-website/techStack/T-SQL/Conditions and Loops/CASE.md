Simple case sample
```SQL
SELECT
	CASE WHEN 1 = 5 THEN
		'1 equals 5'
	ELSE
		'1 does not equal 5'
	END AS result
```
Multiple conditions
```SQL
SELECT
	CASE WHEN 1 > 0 THEN
		'1 is greater than 0'
	WHEN 1 = 1 THEN
		'1 equals 1'
	END AS result
```
Example
```SQL
SELECT
	CASE WHEN ISDATE(HireDate) = 1 THEN
		FORMAT(HireDate, 'MMM dd yyyy')
	ELSE
		'Unknown'
	END AS HireDate
```