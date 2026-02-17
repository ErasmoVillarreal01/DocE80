The ROLLBACK returns state of data to a previous state.
Can also just use `ROLLBACK` keyword.

```SQL
BEGIN TRANSACTION insert_another_user;

INSERT INTO Users (DisplayName, Location, AboutMe)
VALUES ('another-sql-user', 'Costa Rica', 'This user will never exist');

ROLLBACK TRANSACTION insert_another_user;

-- User will not appear
SELECT * FROM Users WHERE DisplayName = 'another-sql-user'

```