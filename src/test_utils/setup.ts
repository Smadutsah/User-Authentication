import { AppDataSource } from '../data_source';

/*
  This file is run right after the env variables have been set
  
  Creates DBs for all the workers. To do that, we create a template DB
  and run migrations. After that, we copy the template to all the DBs for
  the workers so that we do not have to run migrations for each of the workers.
*/
export default async () => {
  // Create test database and run migrations
  const databaseName = 'test_template';
  await AppDataSource.initialize();
  await AppDataSource.query(`DROP DATABASE IF EXISTS ${databaseName}`);
  await AppDataSource.query(`CREATE DATABASE ${databaseName}`);

  console.log('Running migrations', process.env['JEST_WORKERS']);

  const workers = parseInt(process.env['JEST_WORKERS'] || '1');
  for (let i = 1; i <= workers; i++) {
    const workerDatabaseName = `test_${i}`;

    console.log(`Creating database ${workerDatabaseName}`);

    await AppDataSource.query(`DROP DATABASE IF EXISTS ${workerDatabaseName};`);
    await AppDataSource.query(`CREATE DATABASE ${workerDatabaseName} TEMPLATE ${databaseName};`);
  }

  await AppDataSource.destroy();
};
