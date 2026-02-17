- WHERE: Filters data by a condition

Returns all titles.
```SQL
SELECT Title
FROM Movie;
```
Filters by release year (no quotes for int)
```SQL
SELECT Title
FROM Movie
WHERE ReleaseYear = 2005;
```
Filters by movie name (single quotes for strings)
```SQL
SELECT Title
FROM Movie
WHERE Title = 'Citizen Kane';
```
Filters by not a year (`<>` not equal to)
```SQL
SELECT Title
FROM Movie
WHERE ReleaseYear <> 2005;
```

Other operations:
- `<` : Less than
- `>` : Greater than
- `<=` : Less than or equal to
- `>=` : Greater than or equal to

Multiple Conditions:
- `AND`: Both conditions must be met
- `OR` : Only one condition must be met
- `()` : Used to specify an order of operations

Filter by Category and Unit Price
```SQL
SELECT ProductID, ProductName
FROM Product
WHERE Category = 'Electronics' AND UnitPrice > 100;
```
Filter by multiple conditions with order
```SQL
SELECT ProductID, ProductName
FROM Product
WHERE (Category = 'Electronics')
	OR (Category = 'Books' AND UnitPrice < 10);
```