"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data_source");
/*
  This file is run right after the env variables have been set
  
  Creates DBs for all the workers. To do that, we create a template DB
  and run migrations. After that, we copy the template to all the DBs for
  the workers so that we do not have to run migrations for each of the workers.
*/
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create test database and run migrations
    const databaseName = 'test_template';
    yield data_source_1.AppDataSource.initialize();
    yield data_source_1.AppDataSource.query(`DROP DATABASE IF EXISTS ${databaseName}`);
    yield data_source_1.AppDataSource.query(`CREATE DATABASE ${databaseName}`);
    console.log('Running migrations', process.env['JEST_WORKERS']);
    const workers = parseInt(process.env['JEST_WORKERS'] || '1');
    for (let i = 1; i <= workers; i++) {
        const workerDatabaseName = `test_${i}`;
        console.log(`Creating database ${workerDatabaseName}`);
        yield data_source_1.AppDataSource.query(`DROP DATABASE IF EXISTS ${workerDatabaseName};`);
        yield data_source_1.AppDataSource.query(`CREATE DATABASE ${workerDatabaseName} TEMPLATE ${databaseName};`);
    }
    yield data_source_1.AppDataSource.destroy();
});
