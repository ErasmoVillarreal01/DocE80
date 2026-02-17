Paging refers to the amount of information presented.

## TOP
Returns the top n results
```SQL
SELECT TOP(3) 
Item, SUM(Quantity) AS NumberOfOtemsSold
FROM OrderItems
GROUP BY Item
ORDER BY NumberOfOtemsSold DESC
```
Can also be used with percentage
```SQL
SELECT TOP(30) PERCENT 
Item, SUM(Quantity) AS NumberOfOtemsSold
FROM OrderItems
GROUP BY Item
ORDER BY NumberOfOtemsSold DESC
```
Can use `WITH TIES` to overflow tied rows
```SQL
SELECT TOP(3) WITH TIES 
Item, SUM(Quantity) AS NumberOfOtemsSold
FROM OrderItems
GROUP BY Item
ORDER BY NumberOfOtemsSold DESC
```
## ANSI Standard
Another way of pagination
```SQL
SELECT Item, SUM(Quantity) AS NumberOfOtemsSold
FROM OrderItems
GROUP BY Item
ORDER BY NumberOfOtemsSold DESC
OFFSET 0 ROWS FETCH NEXT 3 ROWS ONLY; 
```