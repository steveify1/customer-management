## Description
This is a light-weight customer management system that basically implements CRUD operaions. The program is intended to be run inside a docker container, but can as well be run outside of one. It is built on the NestJs Framework.

The program is compose of a `user` module, an `auth` module, a `gender` module and the `customer` module itself.

## System Requirements
- To run this program and its database outside of a container, ensure that you have NodeJs and MySQL server installed on your computer. Otherwise, you must have docker running.

## Dependencies
- MySQL Server: The programs depends on MySQL Server

## Installation
- Clone the codebase from the repository
  ```bash
  $ git clone git@github.com:steveify1/customer-management.git
  ```
- Configure a `.env` file. The `.env.example` file at the root directory can be used as a guide. Please see below for more details on environment variables.

## Environment variables
- **PORT**: A port number. Defaults to `7000`. When running in a docker container, the port is set to 7000.

- **JWT_AUTH_SECRET**: *(Required)* A JWT secret
- **JWT_EXPIRES_IN**: *(Required)* The JWT expiration

- **DATABASE_TYPE**: *(Required)* Must be set to `mysql`
- **DATABASE_HOST**: *(Required)* Defaults to `localhost`
- **DATABASE_PORT**: *(Required)* Must be set to `33061` if using the mysql services provided in the docker compose file
- **DATABASE_USERNAME**: *(Required)* Your database username.
- **DATABASE_PASSWORD**: *(Required)* Your database password.
- **DATABASE_NAME**: *(Required)* - A database name
- **ROOT_ADMIN_PASSWORD**: (Required)* - A password for the first user to be created in your instance of the application. This variable will only be required the first time you run the application. The programs checks for a root user and attempts to create one with this password if none exists.

## Running the app
As said earlier, this program can be run inside or outside a docker container. However, a MySQL database must be provisioned in both cases.

```
  Ensure that all required environment variables are set!
```

- **Using Docker**
  To run using docker, simply run
  ```bash
  $ docker-compose -f docker-compose.prod.yml up -d 
  ```

  If you're on a unix-like OS, you may be required to use `sudo`. This command will start up a network of 2 services including a MySQL instance and the program itself.

- **Without Using Docker**
  Without using docker, you'll have to provision a MySQL server and a NodeJs instance on your machine. After than run the following commands:

  - Install dependencies
    ```bash
    $ npm install
    ```

  - Run migrations
    ```bash
    $ npm run migrations
    ```
  
  - Start the application
    ```bash
    $ npm run start:prod
    ```

This will start the application at the default port of `7000` or whatever port you had defined in the environment.

As a side note, if you do not have MySQL on your computer, but would like to run the application outside of docker, simply run the following command to provision one running on port `33061`.

```bash
$ docker-compose up -d
```

## Test

```bash
# unit tests
$ npm run test
```

## Endpoints
Please see the Postman file, `Customer-Management.postman_collection.json` at the root directory for usage. Set the `BASE_URL` Postman environment variable to `http://localhost:{your-custom-port-or-7000}/v1` on Postman.