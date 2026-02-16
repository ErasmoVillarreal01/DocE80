## 1: Test API 
1. Stop the server on IIS Manager.
2. In Visual Studio right‑click on the project **SmileE80.Bff.`PROJECT_NAME`** and select: **Set as Startup Project**, and run the project.
3. Open Swagger on localhost: `http://localhost:PROJECT_API/swagger/index.html`.   
    *(The API is found on IIS -> selcting the name of the project and on the right something like the following image will be there.)*  
    ![alt text](../../static/img/bff/swaggerIp.png)
4. Authorize the connection by writing the credentials
5. Start testing the different actions.
    - when the action name like Get... ends in -sample. it means that it is just testing the logic on bff using sample data
    - when it is just the name it tests with actual data from the database, and runs the procedures if any.

## 2: Possible result codes
*   `200 OK` for successful GETs.
*   `202 Accepted` or `200 OK` for successful procedure calls (depending on whether processing is async).
*   `400 Bad Request` for validation failures.
*   `500 Internal Server Error` should be handled by global exception middleware (recommended).
