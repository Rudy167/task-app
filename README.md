# task-app
Stack used : Mongo Express Angular Node</br>

Folder-Structure: </br>
`front End` contains angular assets</br>
`example` contains sample screenshots</br>
`back End` contains node assets</br>


Future-Scope: backend is ready, front end is ready, dockerising the assets


Dependencies:
<Strong>Angular CLI, Node, npm, yarn, mongodb, express(all latest stable versions)</Strong>

Steps to run:
1. navigate to `font end`folder
2. run `npm istall`
3. run `ng serve`

This wil start the angular server on port 4200

4. navigate to  `back end/task-app` folder
5. run `yarn install`
6. start the mongo server
7. create a db named task-app, alternatively the connection string in .env is MONGODB_URL=mongodb://127.0.0.1:27017/task-app
8. run `yarn start`

Mongo server will be started locally on localhost:27017 and our node backend server will start on localhost:3000, ignore the warnings

Navigate to localhost:4200/login if you are not already navigated


routes:




login page:  http://localhost:4200/login 
![image](https://user-images.githubusercontent.com/29231015/140036546-c81a5590-9094-46da-ac69-901393d89f37.png)


register page: http://localhost:4200/register
![image](https://user-images.githubusercontent.com/29231015/140036762-e4d90e5e-912f-4f15-ba8b-e20814a78377.png)


task dashboard, will be visible after you login http://localhost:4200/dashboard
![image](https://user-images.githubusercontent.com/29231015/140037318-63dd189f-21ed-40f2-b78f-eb688c0a9954.png)
(edit mode)
![image](https://user-images.githubusercontent.com/29231015/140038950-1a402c5b-ed2e-4193-890f-a2203f55ba08.png)




Considerations:
1) This is a responsive app, i.e it should work for mobile viewports too.
2) Error handling is not completely fininsed on the task dashboard page, there might be inconsistencies.
3) JWT token expires after a while, you will have to login again and again.



Uasage:
1) Double click on the red exit button to logout

Features:
1) Login/Register
2) CRUD on tasks
3) Add Priority and Deadline


