import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 3000,
  username: 'username',
  password: 'password',
  database: 'postgres',
  synchronize: false,
  logging: false,
  entities: ['src/account_management/data/*.ts', 'src/communication/data/*.ts'],
  subscribers: [],
  migrations: ['src/migrations/*.ts']
});
