DISTINCT : Used to obtain single results without duplicates

Obtains all unique countries
```SQL
SELECT DISTINCT country
FROM customer
ORDER BY country;
```

Multiple Columns:
```SQL
SELECT DISTINCT country, city
FROM customer
ORDER BY country;
```