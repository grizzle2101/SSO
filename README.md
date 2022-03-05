# SSO
Simple Sign On is a sign on provider built with Node.js, Typescript & MongoDB.


Requirements:
-node 16
-MongoDB


Setup Notes:
step 1 - install nodemon & ts-node globally:
npm install -g nodemon ts-node


Step 2 - Create .env File:
create a .env file in the root directory, and copy this text into it.

SERVER_PORT = 8080
ENV = development
API_KEY = <YOUR_API_KEY>
DB_URI = <YOUR_DB_CONNECTION_STRING>
