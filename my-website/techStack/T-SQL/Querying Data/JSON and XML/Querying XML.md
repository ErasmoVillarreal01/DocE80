## What is XML?
eXtensible Markup Language (XML) is a data-interchange format used for communications between application and servers and storing data.
Basic XML Example:

```XML
<root>
	<employee id="1" name="Xavier Morera" birth="14/01/1990">
		<address country="USA" state="MN"></address>
		<phoneNumbers>
			<phone type="home" number="555 222 3456" />
			<phone type="cellphone" number="555 777 8910" />
		</phoneNumbers>
	</employee>
</root>
```
## Storing in SQL Server
To store XML in our DB we use `XML` type
## Retrieving XML Data
Whenever we want to retrieve data from a XML we can use **column methods**:
### value()
Extracts a scalar value from an XML Field
```SQL
-- .value(XQuery, SQLType)
SELECT
	Post_xml.value('(/root/Posts/@Id)[1]', 'int') AS [Post Id],
	Post_xml.value('(/root/Posts/@Title)[1]', 'varchar(500)') AS [Post Title],
	Post_xml.value('(/root/Posts/@CreationDate)[1]', 'datetime') AS [Post Date]
FROM Posts
WHERE 
	Post_xml.value('(/root/Posts/@Score)[1]', 'int') > 100 AND
	Post_xml.value('(/root/Posts/@Title)[1]', 'varchar(500)') IS NOT NULL;
```
### query()
Extracts an XML object value from a XML Field
```SQL
-- .query(XQuery)
SELECT
	Post_xml.query('(/root/Posts/Comments)') AS [ Post Author]
FROM Posts
WHERE 
	Post_xml.value('(/root/Posts/@Score)[1]', 'int') > 100 AND
	Post_xml.value('(/root/Posts/@Title)[1]', 'varchar(500)') IS NOT NULL;
```
## Updating XML Data
To update XML data we use modify with replace. If we want to delete we can use modify with delete:
```SQL
SET @xmlDocument.modify('
replace value of (/root/Post/Title/text())[2]
with "Best Python library for Neural Networks"
')
```
## Filtering Data
We can filter data with contains and exist:
```SQL
SELECT
	Id,
	Post_xml.value('(//Posts/@Title)[1]', 'nvarchar(255)') AS [Post Title],
	Post_xml.value('(//Posts/@Tags)[1]', 'nvarchar(255)') AS [Post Tags],
	Post_xml.query('(//Comment)') AS [All Comments]
FROM Posts
WHERE
	Post_xml.exist('//Comment') = 1 AND
	Post_xml.exist('(//Posts[contains(@Tags, "machine-learning")])[1]') = 1;
```