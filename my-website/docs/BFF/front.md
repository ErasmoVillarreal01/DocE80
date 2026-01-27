---
sidebar_position: 1
---

# FrontEnd UI

## Publish
1. Stop IIS Service, click on the stop
2. Select SmileE80.Bff.Custom como StartUp project and right click on Publish (the folder)
3. Leave default target, close and click on the button publish
4. It is recommended to do a backup of all this folder before pasting the new one
5. Copy the target path and paste it in this path except 2 json files in the middle of the folder

## Update FrontEnd in Linux Machine
1. Open **cmd** as **admin**
2. Login to copy: sftp [user]@[ip], -> Enter -> Password (Yes if Trust Certificate).

    Example:
      - File transfer command
        ```bash
        sftp smile80admin@10.241.5.190
        ```
      - Password
        ```bash
        StandardE80CC2198!
        ```
      - Yes (certificate)
3. Copy file to the linux machine:

      - Put 
        ```bash
        C:\inetpub\wwwroot\SmilE80\JSON\*.json /home/smile80admin/smile80/swagger
        ``` 
4. Restart Linux, Open in another terminal as admin, login and reboot: 
      - Login in Linux
        ```bash
        ssh smile80admin@10.241.5.190
        ```
      - Password
          ```bash
          StandardE80CC2198!
          ```
      - Restart
        ```bash
        sudo reboot
        ```
5. Restart BFF server (restart all, click start)
6. Open WebUI and refresh connection
      - Page edit and select the one which was udpated 


Appendix:
        ```bash
        Scaffold-DbContext "Server=26.72.195.89;User ID=e80_service;Password=StandardE80;Database=SDM_DB;MultipleActiveResultSets=true;Encrypt=True;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir "Models" -Context "BffDbContext" -DataAnnotations -project "SmilE80.BFF.Database" -ContextDir "Context" -Tables "vwItem" -Force
        ```
