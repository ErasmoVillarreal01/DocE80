- LIKE : Ask if column is like something, not exactly something.
	- % : Any Amount of text 
	- _ : A Single Character

Filters with text that begins with Green.
```SQL
SELECT ProductName, Category, UnitPrice
FROM Product
WHERE ProductName LIKE 'Green%';
```
Filters with text that has Green anywhere
```SQL
SELECT ProductName, Category, UnitPrice
FROM Product
WHERE ProductName LIKE '%Green%';
```
Filters with text with any value in between G and 0
```SQL
SELECT *
FROM Vehicles
WHERE Name LIKE 'Genesis G_0';
```
Filter by excluding a word
```SQL
SELECT ProductName, Category, UnitPrice
FROM Product
WHERE ProductName NOT LIKE '%Green%';
```

**Important**
LIKE keyword might be inefficient because the DBS may perform complex searches.