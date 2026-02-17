### ALL
X is greater than ALL of them
```SQL
X > ALL(A, B, C)
->
X > A AND X > B AND X > C
```
### ANY
X is greater than ANY of them
```SQL
X > ANY (A, B, C)
->
X > A OR X > B OR X > C
```
### IN
X is IN them
```SQL
X IN (A, B, C)
->
X = A OR X = B OR X = C
```
### NOT IN
X is NOT IN them
```SQL
X NOT IN (A, B, C)
->
X <> A AND X <> B AND X <> C
```
### BETWEEN
X is BETWEEN them
```SQL
X BETWEEN A AND B
->
X >= A AND X <= B
```
### LIKE
X is Like them
```SQL
X LIKE (<pattern>)
->
X matches wildcard pattern
```