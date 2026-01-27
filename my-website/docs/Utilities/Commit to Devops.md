---
sidebar_position: 1
---

# Version Control Repository

## Commit
1. Open your repository and your branch
2. Click 'Clone' and copy https
![Commit1](../../static/img/commitdev/commit1.png)

3. Open source tree on local computer, click 'Clone' and paste copied url.
![Commit2](../../static/img/commitdev/commit2.png)

4. Create new branch
![Commit3](../../static/img/commitdev/commit3.png)

5. Open: "C:\Users\[yourUser].ELETTRIC80\OneDrive - Elettric 80\Devops\SDM\Source\src\smile80-sdm-database\smile80-sdm-database.sln" or where you saved the sln you want to check and open it on visual studio. 

6. Do a schema comparison, because we want to compare the procedures. Do it from database to project sdm. 
![Commit4](../../static/img/commitdev/commit4.png)

7. Click on compare then check if needed, then update. Make sure to compare again and all changes where updated 

8. Erase the files
![Commit5](../../static/img/commitdev/commit5.png)

9. On source tree stage all changes (git add) 
![Commit6](../../static/img/commitdev/commit6.png)

10. Then click 'COMMIT' to commit the changes, after that click 'PUSH' to the branch you created. Your changes are now in your branch 

## Merge
1. To pass those changes to the dev branch: open devops and go to the repository 

![Commit7](../../static/img/commitdev/commit7.png)
2. Click on pull requests, then click "new pull request" 

![Commit8](../../static/img/commitdev/commit8.png)

3. Make sure from your branch to dev 
![Commit9](../../static/img/commitdev/commit9.png)

4. Check pull was successful, you can check the progress in the pipeline. It will show active on the pull requests tab. 
![Commit10](../../static/img/commitdev/commit10.png)

5. Click on "Complete" to finish the pull request 
![Commit11](../../static/img/commitdev/commit11.png)

6. Make sure the pull request now says completed 
![Commit12](../../static/img/commitdev/commit12.png)