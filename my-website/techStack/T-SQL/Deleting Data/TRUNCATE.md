Removes all data from a table. Is faster than normal delete. Can also delete records from partitions
When using TRUNCATE, it resets id count.

Syntax:
```SQL
TRUNCATE TABLE table_name WITH (PARTITIONS (partition_number_expression) )
```