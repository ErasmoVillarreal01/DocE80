A short temporary name that can be assigned to a table when joining,
Must be written after table names.
Can also be written with AS keyword.

```SQL
SELECT o.order_id, o.order_date, o.status, c.last_name, c.status
FROM orders o INNER JOIN customers c
ON o.customer_id = c.customer_id
ORDER BY o.order_date DESC;
```