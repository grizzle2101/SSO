##SSO

___________
Simple Sign On is a sign on provider built with Node.js, Typescript & MongoDB.
___________


Requirements:
-node 16
-MongoDB

Setup Notes:
_______________
Step 1:
Install nodemon & ts-node globally:
```console
    $ npm install -g nodemon ts-node
```

Step 2:
Create .env File:
Create a .env file in the root directory, and copy this text into it.

```console
SERVER_PORT = 8080
ENV = development
API_KEY = <YOUR_API_KEY>
DB_URI = <YOUR_DB_CONNECTION_STRING>
```