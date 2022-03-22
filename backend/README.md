# SSO

Simple sign on is a self hosted, single sign on provider & user management interface built entirely in Typescript, using the MEAN Stack.
(MongoDB, Express.js, Angular & Node.js).

---

Requirements:
-node 16 (or higher)
-MongoDB

## Setup Notes

### Step 1

Install nodemon & ts-node globally:

```console
    $ npm install -g nodemon ts-node
```

### Step 2

Create .env File:
Create a .env file in the root directory, and copy this text into it.

```console
NODE_ENV = development
DB_URI = <db_connection_string>
PORT = <default_port>
```
