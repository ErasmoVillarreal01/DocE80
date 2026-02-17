An if for T-SQL
### Standard IF
```SQL
IF x < y
	BEGIN
		--Do something
		PRINT('If true')
	END
```
### IF with ELSE
```SQL
IF x < y
	BEGIN
		--Do something
		PRINT 'TRUE'
	END
ELSE
	BEGIN
		PRINT 'FALSE'
	END
```
### IF with ELSE IF
```SQL
IF x < y
	BEGIN
		--Do something
		PRINT 'less than'
	END
ELSE IF x > y
	BEGIN
		PRINT 'greater than'
	END
ELSE
	BEGIN
		PRINT 'equal'
	END
```
### IIF
Ternary version of IF
```SQL
SELECT IIF(x>y, 'TRUE', 'FALSE')
```