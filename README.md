# Backend

## To run locally

1. Install the packages
   $ `yarn install`

2. Setup the db

- run `docker-compose up -d`
- Navigate to localhost:5001 and sign in using credentials in the `compose.yml` file
- Register a server named famba in pgadmin with the following creds
  1.  Host-name/Address: `<Container Name of the service named db in compose.yml>`
  2.  Port: `<Container Port of the service named db in compose.yml>`
  3.  Username: `<POSTGRES_USER env var of the service named db in compose.yml>`
  4.  Password: `<POSTGRES_PASSWORD env var of the service named db  compose.yml>`

4. Run migrations
   $ `yarn init-db`

5. Run the application
   $ `yarn run start:dev`

## To run for production

1. Install the packages
   $ `yarn install`

2. Build and start the application
   $ `yarn run start`

## Running tests

To run a particular test file, use the following:
$ `yarn test path-to-file`
e.g. $ `yarn test src/api/data/test.test.ts`

To run a particular test in a file, use the following:
$ `yarn test path-to-file -t test-name`
e.g. $ `yarn test src/api/data/test.test.ts -t "basic -- data is expected"`

To run all files in a folder, use the following:
$ `yarn test path-to-folder`
e.g. $ `yarn test src/<domain>/tests`

To run all tests, use the following:
$ `yarn test`
e.g. $ `yarn test`

## Other command

To create DB migrations
$ `yarn create-db-migrations src/migrations/<migration_name>`

To run DB migrations
$ `yarn run-db-migrations`

To revert DB migrations
$ `yarn revert-db-migrations`
