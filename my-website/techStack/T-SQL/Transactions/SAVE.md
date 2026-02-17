SAVE creates a save point during the transaction. Useful for rollback to a specific point instead of whole transaction.

```SQL
BEGIN TRAN;

DELETE FROM Comments WHERE Comments.Text LIKE '%python%';

SAVE TRAN del_python;

DELETE FROM Comments WHERE Comments.Text LIKE '%java%';

SAVE TRAN del_java;

SELECT * FROM Comments WHERE Comments.Text  LIKE '%python%' OR Comments.Text LIKE '%c++%';

ROLLBACK TRAN del_python;

COMMIT TRAN;

-- Comments are still present
SELECT * FROM Comments WHERE Comments.Text LIKE '%java%';
```