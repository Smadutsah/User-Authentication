"use strict";
// This file is executed once in the worker before executing each test file. We
// wait for the database connection and make sure to close it afterwards.
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
// TODO(felix) we do not need to run this for all the tests
// for instance there are tests that do not need a database.
// maybe add it to the files using: https://dev.to/caiulucas/tests-with-jest-and-typeorm-4j1l
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize();
    yield data_source_1.AppDataSource.query(`CREATE SCHEMA IF NOT EXISTS famba`);
    yield data_source_1.AppDataSource.runMigrations();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    data_source_1.AppDataSource.entityMetadatas.forEach((entity) => __awaiter(void 0, void 0, void 0, function* () {
        const repository = data_source_1.AppDataSource.getRepository(entity.name);
        yield repository.query(`DELETE FROM ${entity.schema}.${entity.tableName}`);
    }));
    yield data_source_1.AppDataSource.destroy();
}));
