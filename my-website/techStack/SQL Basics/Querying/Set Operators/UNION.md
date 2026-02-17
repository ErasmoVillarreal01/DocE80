- UNION: Used to combine the results of two or more SELECT statements into one larger result set. Union expects the same number of columns and data types. Will use the first name. Will not show duplicates.
- UNION ALL: Same as UNION but will show duplicates.

Obtain all data from all customers from current and past customers tables
```SQL
SELECT Email FROM CurrentCustomers
UNION
SELECT email FROM PastCustomers;
```
Obtain all data including duplicates from all customers from current and past customers tables
```SQL
SELECT Email FROM CurrentCustomers
UNION ALL
SELECT email FROM PastCustomers;
```