# Overview


Mongoose Boilerplate is a basic application from where a developer can start a new service. It showcase all (or almost all) of the features or say best practices that we can use in an API.


# Technology Stack
* [Node.js](https://nodejs.org) server.
* [MongoDB](https://docs.mongodb.com/) database.
* [mongoose](http://mongoosejs.com/) Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box for MongoDB.
* [TypeScript](https://www.typescriptlang.org/docs/home.html)
* [Express](https://expressjs.com/) node.js framework for building REST APIs
* [Jest](https://jestjs.io/docs/en/getting-started) Jest is used to test Javascript frameworks
* [Supertest](https://www.npmjs.com/package/supertest) provide a high-level abstraction for testing HTTP


# Getting Started - Setup
This section is for getting started with service on your development environment.


1. **Clone the repository**
 ```
 git clone <link>
 ```
2. **Install all the packages**
 ```
 npm install
  ```
  if recieving any optional dependency warnings then use this :


  ```
 npm install --no-optional
  ```


 It will prompt for your github access token in order to install our inbuilt package.
 3. **Change  envsample to .env**: Put all your constant, credentials, and path etc here.


# Key Features


1. **User Module** This module is based on the user data with CRUD operation and user data is stored in MongoDB Collection.
 * `Crud Operation:` User Module contain total 8 API's
 - GET(List) : It is used to fetch all the user data from the collection.
 - GET(byId) : It is used to fetch a particular user data from the collection.
 - POST : It is used to create a new user data in the collection.
 - PUT : It is used to update the previous user data in the collection.
 - DELETE : It is used to delete the existing user data from the collection.
 - BULKINSERT : It is used to create a new mutiple user data in the collection.
 - BULKUPDATE : It is used to update existing users information.
 - BULKDELETE : It is used to delete the multiple existing user data from the  
                collection
 2. **InBuilt Package** We have three custom npm package which is response-handler, comm-handler and logger.


 - Response-handler: It is a basic inbuilt package used to handle the informative messages. It handle all (or almost all) of the responses.


 - logger: It is a basic inbuilt package used to handle the system logs. It handle all (or almost all) of the logs.
  - comm-handler: It is a basic inbuilt package used to handle/call api end points. 


3. **Swagger** Swagger UI to generate interactive API documentation that lets your users try out the API calls directly in the browser.


4. **Services**  These services act as a middleware which initiate different services for a particular module. We can use these services as microservice for our application.


# Running the app
```
npm run start
 ```
# Testing
We use unit tests with [Jest](https://github.com/facebook/jest) in this project.


- To run tests
 ```
 npm run test
 ```
- To run test in watch mode
 ```
 npm run test:w
 ``` 
# Linting
We also use [Eslint](https://github.com/eslint/eslint) with Typescript Standard Style.
- To run lint:
 ```
 npm run lint
 ```
- To fix the error automatically
 ```
 npm run lint:fix
 ```


### Guidelines - must be followed strictly
 - Developer must enable pre-commit and pre-push hooks
 ```
 npx husky add .husky/pre-commit "npm run lint"
 ```
 ```
 npx husky add .husky/pre-push "npm run lint"
 ```
### IDE
Our preferred IDE is `VSCODE`
Please enable following plugins for your editor:
- **EditorConfig:** To enable reading of .editorconfig file for consistent coding convention.
- **Eslint:** For linting errors
close
