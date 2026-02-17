- `PARTITION`: Determines if rows should be grouped or ranked by a column (Several 1s for example). No partition means ranked against each other.
- `ORDER BY` : Determines by what they should be ranked. Can be several.

### RANK
 Function used to assign a position or rank to each row in a result set based on specific criteria. Rank allows ties, if two rows tie for rank 1, the next rank will be 3.
```SQL
RANK() OVER (PARTITION BY column1, column2, ... ORDER BY   
sort_column1, sort_column2, ...)
```
### DENSE RANK
Like RANK but it avoids gaps by giving tied rows consecutive ranks, ensuring a continuous sequence.
```SQL
DENSE_RANK() OVER (PARTITION BY column1, column2, ... ORDER BY   
sort_column1, sort_column2, ...)
```
### NTILE
Ranks the data into a specified amount of ranks.
```SQL
NTILE ( N ) OVER (PARTITION BY column1, column2, ... ORDER BY 
sort_column1, sort_column2, ...)
```
### ROW_NUMBER
Row number is very similar to RANK but forces a strict ordering, each row gets a unique rank.
```SQL
ROW_NUMBER() OVER (PARTITION BY column1, column2, ... ORDER BY   
sort_column1, sort_column2, ...)
```