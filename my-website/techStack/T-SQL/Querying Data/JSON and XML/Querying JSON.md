## What is JSON?
JavaScript Object Notation (JSON) is a lightweight data-interchange format used for communications between application and servers and storing data.
Basic JSON Example:

```JSON
[{
"employee" : {
		"id" : 12345,
		"first name" : "Xavier",
		"last name" : "Morera",
		"birth" : "14/01/1990",
		"address" : {
			"country" : "USA",
			"state" : "MN"
		},
		"phone numbers" : [
		{
			"type" : "home",
			"number" : "555 222 3456",
		},
		{
			"type" : "cellphone",
			"number" : "555777 8910"
		}
		]
	}
}]
```
## Storing in SQL Server
To store JSON in our DB we use `NVARCHAR(max)` or `NVARCHAR(4000)` if < 8 KB
## Retrieving JSON Data
Whenever we want to retrieve data from a JSON we can either retrieve a:
- Scalar Value: Single Values
- Non Scalar Value: JSON Object 
### Scalar Values
To retrieve a scalar value we use the function JSON_VALUE:
```SQL
-- JSON_VALUE(expression, path)
JSON_VALUE(jsonData, '$.employee.birth')
```
### Non Scalar Values
To retrieve a non scalar value we use the function JSON_QUERY:
```SQL
-- JSON_QUERY(expression, path)
JSON_QUERY(jsonData, '$.employee.address')
```
### IS JSON
Test whether a string contains a valid JSON. 1 if valid JSON, 0 if not
```SQL
-- ISJSON(expression)
SELECT JSON_VALUE(jsonData, '$.Title'), jsonData
FROM Posts
WHERE ISJSON(jsonData) > 0 AND JSON_VALUE(jsonData, '$.Title') LIKE '%c#%';
```
## Format Query Results as JSON
To format query results as JSON we use FOR JSON 
### FOR JSON PATH
Define the structure of your JSON string
```SQL
FOR JSON PATH, ROOT ('root_name')
```
### FOR JSON AUTO
Structure of your JSON string created automatically
```SQL
FOR JSON AUTO
```
## Updating JSON Value
To update a JSON value we use JSON_MODIFY
```SQL
-- JSON_MODIFY(expression, path, newValue)
UPDATE Posts
SET jsonData = JSON_MODIFY(jsonData, '$.OwnerUserId', '63')
WHERE JSON_VALUE(jsonData, '$.Id') = '9';
```