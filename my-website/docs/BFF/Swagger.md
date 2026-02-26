# Running the API Locally for Testing

### **1. Stop the API in IIS**

If the API is currently running on IIS, it must be stopped to avoid conflicts with the local instance.

### **2. Run the API from Visual Studio**

1.  In Visual Studio, right‑click the project **SmileE80.Bff.`PROJECT_NAME`**.
2.  Select **Set as Startup Project**.
3.  Run the project (F5).

### **3. Open Swagger Locally**

Swagger will be available at:
`http://localhost:PROJECT_API/swagger/index.html`

The port (`PROJECT_API`) is displayed by Visual Studio when the project starts.

> For reference, IIS also lists the URL bound to the deployed API, as shown in the example image below:  
![alt text](../../static/img/bff/swaggerIp.png)

### **4. Authenticate**

In Swagger:

*   Select the **Authorize** button.
*   Enter valid user credentials.
*   Ensure the authentication token points to the intended environment.  
    If it does not, review the configuration in `generalSettings.cs`.

### **5. Test Each Endpoint**

*   Endpoints ending in **`-sample`** execute logic using sample/mock data and do not interact with the database.
*   Endpoints **without** `-sample` use real data and execute stored procedures when applicable.

Testing should verify:

*   View endpoints return the correct dataset.
*   Procedure endpoints perform the expected operations.
*   Combobox endpoints return the correct value–label pairs.
*   Sorting, filtering, and pagination behave correctly.

***

## **Expected Result Codes**

During testing, the following HTTP status codes should be expected:

*   **`200 OK`** — Successful GET requests and synchronous procedures.
*   **`202 Accepted`** — Asynchronous operations accepted for processing.
*   **`400 Bad Request`** — Input validation failure (typically from incorrect WriteModels).
*   **`500 Internal Server Error`** — Unexpected exception; should be handled by global middleware.

