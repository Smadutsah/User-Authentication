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
exports.apolloServer = exports.httpServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const graphql_middleware_1 = require("graphql-middleware");
const context_1 = require("./context");
const http_1 = require("http");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const schemas_1 = __importDefault(require("./api/schemas"));
const server_1 = __importDefault(require("./server"));
const auth_1 = require("./api/auth");
exports.httpServer = (0, http_1.createServer)(server_1.default);
const wsServer = new ws_1.WebSocketServer({
    server: exports.httpServer,
    path: '/api'
});
// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = (0, ws_2.useServer)({
    schema: schemas_1.default,
    context: (ctx, _msg, _args) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, context_1.createContext)(ctx);
    })
}, wsServer);
const { NODE_ENV } = process.env;
exports.apolloServer = new apollo_server_express_1.ApolloServer({
    schema: (0, graphql_middleware_1.applyMiddleware)(schemas_1.default, auth_1.permissionsSchemaShield),
    context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () { return (0, context_1.createContext)(req); }),
    introspection: NODE_ENV !== 'production',
    plugins: [
        // TODO(felix): handle this using ideas from https://www.apollographql.com/docs/apollo-server/data/subscriptions/
        // Proper shutdown for the HTTP server.
        // ApolloServerPluginDrainHttpServer({ httpServer }),
        // Proper shutdown for the WebSocket server.
        {
            serverWillStart() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        drainServer() {
                            return __awaiter(this, void 0, void 0, function* () {
                                yield serverCleanup.dispose();
                            });
                        }
                    };
                });
            }
        }
    ]
});
