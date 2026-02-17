Common Table Expressions (CTE) are temporary result sets.
Its field data types are determined by the populating query.
Must be followed by a `SELECT` query.
Can use several CTEs separated by a comma `,` .
 
```SQL
WITH CTE_Name AS (
	SELECT 
		field1 AS FieldName1, 
		field2 AS FieldName2,
		field3 AS FieldName3
		
	FROM table
)

SELECT 
	FieldName1,
	FieldName2,
	FieldName3

FROM CTE_Name
```

Practical Example:
```SQL
WITH cte AS (
    SELECT
        Hackers.hacker_id AS id,
        Hackers.name AS name,
        Submissions.challenge_id,
        MAX(Submissions.score) AS max_score
        
    FROM Hackers
        INNER JOIN Submissions ON (Hackers.hacker_id = Submissions.hacker_id)

    GROUP BY
        Hackers.hacker_id, Hackers.name, Submissions.challenge_id
)

SELECT
    id,
    name,
    SUM(max_score) AS total_score

FROM cte

GROUP BY
    id, name

HAVING SUM(max_score) > 0

ORDER BY
    total_score DESC,
    id ASC;
```

Multiple and Nested CTEs Example:
```SQL
WITH earnings_per_day_city AS (
  SELECT
    ds.day,
    c.id,
    c.name,
    SUM(amount_earned) AS total_earnings

  FROM salesman s
		  JOIN daily_sales ds ON s.id = ds.salesman_id
		  JOIN city c ON s.city_id = c.id

  GROUP BY ds.day, c.id, c.name
),
overall_day_city_avg AS (
  SELECT
    AVG(total_earnings) AS avg_earnings

  FROM earnings_per_day_city
)

SELECT
  day,
  id,
  name,
  total_earnings

FROM earnings_per_day_city, overall_day_city_avg

WHERE total_earnings > avg_earnings;
```