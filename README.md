# SSO

[![Node.js CI](https://github.com/grizzle2101/SSO/actions/workflows/node.js.yml/badge.svg)](https://github.com/grizzle2101/SSO/actions/workflows/node.js.yml)

Simple sign on is a self hosted, single sign on provider & user management interface built entirely in Typescript, using the MEAN Stack.
(MongoDB, Express.js, Angular & Node.js).

---

Requirements:
-node 16 (or higher)
-MongoDB

## Setup Notes

## Getting Node.js backend running:

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
PRIVATE_KEY=<sso_jwt_private_key>
```

## Getting Angular App running:

### Step 1

Install Angular CLI globally

```console
    $ npm install -g @angular/cli
```

### Step 2

Install dependencies

```console
    $ npm install
```

run application

```console
    $ ng serve
```

**Note:**
Make sure the backend .env file and frontend environments.ts match e.g.

```
PORT = 3000
apiEndpoint: 'http://localhost:3000/api'
```
