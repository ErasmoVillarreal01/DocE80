There are two general type of functions:
- Built-in Functions: Includes [Aggregate Functions](../../../SQL%20Basics/Querying/Aggregate%20Functions.md), Mathematical Functions and other type of standard TSQL functions
- User-Defined Functions (UDF): For UDF there are two types:
	- [Table Valued Functions](Table%20Valued%20Functions.md)
	- [Scalar Valued Functions](Scalar%20Valued%20Functions.md)

Generally functions are used to get a value or set of values.
Functions **can not** perform permanent environmental changes in SQL Server (Ex. `INSERT` or  `UPDATE`)
### Functions are useful for:
- Reusability
- Central Management
- Readability