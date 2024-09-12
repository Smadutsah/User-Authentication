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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("./apollo_server");
const server_1 = __importDefault(require("./server"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    // await AppDataSource.initialize()
    //   .then(async () => {
    console.log('[Success] DB is connected');
    yield apollo_server_1.apolloServer.start();
    apollo_server_1.apolloServer.applyMiddleware({
        app: server_1.default,
        path: '/',
        onHealthCheck: () => {
            return new Promise((_resolve, _reject) => {
                // Replace the `true` in this conditional with more specific checks!
                return true;
            });
        }
    });
    apollo_server_1.httpServer.listen(4000, () => {
        console.log(`🚀 Server ready at http://localhost:4000/api`);
    });
    // })
    // .catch((error: any) => {
    //   console.error('[Error] Error connecting DB', error);
    // });
}))();
