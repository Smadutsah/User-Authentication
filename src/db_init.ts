import { AppDataSource } from './data_source';

const initDB = async () => {
  // Create database and run migrations
  await AppDataSource.initialize();
  await AppDataSource.query(`CREATE SCHEMA IF NOT EXISTS famba`);
  await AppDataSource.runMigrations();
  await AppDataSource.destroy();
};
initDB();
