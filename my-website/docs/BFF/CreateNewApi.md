This page will talk about the different steps and requirments needed to create a page from scratch.

***
# **Step 1: Define the WebUI Page Functionality**
Before any development begins, the analyst should clearly determine the expected behavior of the WebUI page.  

To do this, the following guiding questions must be answered:

1.  **What is the expected behavior of the page?**  
    Identify its main purpose and what the user should accomplish with it.

2.  **Will the page only display data, or will it allow actions such as adding, editing, or deleting records?**  
    This defines whether backend procedures will be required.

3.  **Which elements must be visible on the page?**  
    List all fields, tables, filters, buttons, and dynamic sections needed.

4.  **What layout structure will the new page follow?**  
    Examples include:
    *   Fixed one‑section layout
    *   Fixed two‑section layout
    *   Fixed three‑section layout
    *   Any custom arrangement required by the design

5.  **Will buttons or additional features be necessary?**  
    Consider actions such as “Save,” “Delete,” “Export,” “Refresh,” or any other interactive functionality.

<br>
</br>

***
# **Step 2: Create the required Stored Procedure(s)**

*(Applicable when the page performs actions other than simply displaying data.)*

If the WebUI page needs to execute an operation — such as inserting, updating, deleting, or executing logic — a dedicated stored procedure must be created.

The procedure should contain **all logic required for the corresponding action**, ensuring that the WebUI receives a consistent and structured response.

A typical execution pattern is shown below.  
Note that BFF endpoints commonly return the result content in **XML format**, using `ResultText` as the output variable.

```sql
DECLARE @ResultCode INT = 0,
        @ResultText XML = NULL;

EXEC [Schema].[usp_ProcedureName]
    @Variable_1 = 'Value_1',
    @Variable_N = 'Value_N',
    @ResultCode = @ResultCode OUT,
    @ResultText = @ResultText OUT;
```

<br>
</br>

***
# **Step 3: Create the Required View(s)**

*(Views are used exclusively for data retrieval and presentation.)*

For each section defined in the selected layout, a dedicated view must be created.  
Each view should expose only the variables and fields necessary to display the required information on the WebUI page.

Only **one view per layout section** should be created to maintain clarity, modularity, and ease of maintenance.

A standard view definition follows the structure shown below:

```sql
CREATE VIEW [Schema].[vwViewName]
AS

SELECT
    t1.Id,
    t2.Id AS IdTable2,
    t1.Name
FROM [Schema].[Table_1] AS t1
LEFT JOIN [Schema].[Table_2] AS t2 
    ON t1.Id = t2.Id_Table1
WHERE t2.Id IS NULL;
```

<br>
</br>

***
# **Step 4: Update DbContext.cs**

*(From this step formward, the process wil be done on the BFF code, until stated otherwise.)*

To pass the creted views on the Bff project, the DbContext file must be edited. To do so, the following steps are required:
1. Navigate to SmileE80.Bff.Database -> Context
2. Rename `BffDbContext.cs` ->  `BffDbContext_.cs`
3. Right click on `SmileE80.Bff.Database` and select the option **Set as Startup Project** 
4. On the top bar go to Tools -> NuGet Package Manager -> Package Manager Console (Make sure that on the top of the console the Default project is `SmileE80.Bff.Database`).
5. The following command should be pasted on the console (changing the values between [] to the used ones): 
```bash
Scaffold-DbContext "Server=[DatabaseAPI];User ID=[UserName];Password=[Password];Database=[DatabaseName];MultipleActiveResultSets=true;Encrypt=True;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir "Models" -Context "BffDbContext" -DataAnnotations -project "SmilE80.BFF.Database" -ContextDir "Context" -Tables "[ViewName]" -Force
```

<br>
</br>

***
# **Step 4: Create new proyect**
### * In case the folder where you are going to add your page is already created, then skip this step.

Create a new project **ASP.NET Core Empty**. This will be the new API inside the IIS.

Inside the project, create three folders.
1. Model
2. Service
3. Controller



