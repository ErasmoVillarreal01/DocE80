## String
### TRIM
Remove trailing and leading spaces
```SQL
TRIM(expression)
```
### TRIM CHARACTERS
Removes characters from the expression
```SQL
TRIM(characters FROM expression)
```
### LTRIM CHARACTERS
Removes characters from the expression only in the left side
```SQL
LTRIM ( character_expression, [ characters ] )
```
### RTRIM CHARACTERS
Removes characters from the expression only in the right side
```SQL
RTRIM ( character_expression, [ characters ] )
```
### SUBSTRING
Isolate the characters for upper and lower casing. 
```SQL
SUBSTRING(expression, start, length)
```
### UPPER
Applies upper case
```SQL
UPPER(expression)
```
### LOWER
Applies lower case
```SQL
LOWER(expression)
```
### REPLACE
Replaces characters for other characters
```SQL
REPLACE(string_expression, string_pattern, string_replacement)
```
## Dates
### GETDATE
Gets current date
```SQL
GETDATE()
```