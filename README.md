# task-app
Stack used : MEAN</br>
Folder-Structure: </br>
`front End` contains angular assets</br>
`example` contains sample screenshots</br>
`back End` contains node assets</br>


Future-Scope: backend is ready, front end is ~50%, dockerising the assets


Dependencies:
<Strong>Angular CLI, Node, npm, yarn, mongodb (all latest stable versions)</Strong>

Steps to run:
1. navigate to `font end`folder
2. run `npm istall`
3. run `ng serve`

This wil start the angular server on port 4200

4. navigate to  `back end` folder
5. run `yarn install`
6. start the mongo server
7. create a db named task-app, alternatively the connection string in .env is MONGODB_URL=mongodb://127.0.0.1:27017/task-app
8. run `yarn start`

Mongo server will be started locally on localhost:27017 and our node backend server will start on localhost:3000, ignore the warnings

Navigate to localhost:3000/login if you are not already navigated
