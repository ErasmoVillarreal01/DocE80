Databases are organized systems you put your data into.
## Data Base Management Systems (DBMS) 
Used to create, manage and work with one or more databases.
- Microsoft SQL Server
- PostgreSQL
- MySQL
### Relational Data Base Management Systems (RDBMS)
Databases based on the relational model. Standard DB.
### NoSQL
Databases that do not use SQL
- Redis
- MongoDB
## Tables
Also called **entity**. Each table consists of a defined structure and repeating data. Each table contains rows and columns of data that are controlled and constrained.
### Columns
A column represents a single, specific value of the table. Each column needs:
- Name
- Type of data
### Row
A row is a specific entry for that table.
### Product Table Data Type Definition

| Column Name   | Data Type     |
| ------------- | ------------- |
| ProductID     | INT           |
| Name          | VARCHAR(100)  |
| Category      | VARCHAR(50)   |
| Description   | TEXT          |
| StockQuantity | INT           |
| Price         | DECIMAL(10,2) |
| DateAdded     | DATE          |
