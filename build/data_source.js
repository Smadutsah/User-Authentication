"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
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
