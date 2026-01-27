# Data Compare
In Visual Studio, "Data Compare" is a feature in SQL Server Data Tools (SSDT) that lets you compare and synchronize the data (rows and values) between two SQL Server databases. It highlights differences and can generate scripts to update the target database.


![Data Compare](../../static/img/datacompare.png)

    1. Just compare the tables, we don’t care about the views because the in the view we are just joining the tables
    2. Select 3 options in the filter
        a. Different Records
        b. Only in source
        c. Only in target
        
**WE ONLY NEED TO IMPORT THE DATA FOR CONFIGURATION**

All the historical **MUST NOT BE IMPORTED**

**THE IDCONDITIONLOCATION MUST NOT BE IMPORTED just retrigger to generate the table again**