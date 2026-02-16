# Where Models Are Used

*   **ReadModels** are returned by **controller**, typically after mapping from database views.
*   **WriteModels** are accepted by **controller**, validated, and passed into **./service.md** which call the database (via stored procedures).