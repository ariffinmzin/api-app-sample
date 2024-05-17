# API APP SAMPLE

This project is a simple implementation for a client application to connect to a REST server.

The application will attempt to login with the input the user entered. If the login is successful, the app will request data from the second API endpoint to get a list of users.

* **LOGIN**
POST /api/login 

* **USERS**
GET /api/users?page={page-number}
