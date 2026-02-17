Variables can also hold several items in a table variable. This is useful to store temporal data.

How to declare a table variable:
```SQL
DECLARE @TableVariable TABLE
(
	column_1 DATATYPE,
	column_2 DATATYPE,
	column_N DATATYPE,
)
```
To insert values into this table variables:
```SQL
DECLARE @ListOfWeekDays TABLE (
	DayNumber INT,
	DayAbb VARCHAR(40),
	WeekName VARCHAR(40)
)

INSERT INTO @ListOfWeekDays
VALUES
(1,'Mon','Monday'),
(2,'Tue','Tuesday'),
(3,'Wed','Wednesday'),
(4,'Thu','Thursday'),
(5,'Fri','Friday'),
(6,'Sat','Saturday'),
(7,'Sun','Sunday');

--or

INSERT INTO @ListOfWeekDays
SELECT
	Number,
	Abreviation,
	Name
FROM WeekDays
WHERE Number < 8;
```
To `SELECT` data from the Table Variable we use it with a normal `FROM`:
```SQL
SELECT *
FROM @ListOfDayWeeks
```