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
const data_source_1 = require("./data_source");
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create database and run migrations
    yield data_source_1.AppDataSource.initialize();
    yield data_source_1.AppDataSource.query(`CREATE SCHEMA IF NOT EXISTS famba`);
    yield data_source_1.AppDataSource.runMigrations();
    yield data_source_1.AppDataSource.destroy();
});
initDB();
