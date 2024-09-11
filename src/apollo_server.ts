import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { Context, createContext } from './context';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import schema from './api/schemas';
import app from './server';
import { permissionsSchemaShield } from './api/auth';

export const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/api'
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer(
  {
    schema,
    context: async (ctx, _msg, _args) => {
      return createContext(ctx);
    }
  },
  wsServer
);

const { NODE_ENV } = process.env;

export const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema, permissionsSchemaShield),
  context: async ({ req }): Promise<Context> => createContext(req),
  introspection: NODE_ENV !== 'production',
  plugins: [
    // TODO(felix): handle this using ideas from https://www.apollographql.com/docs/apollo-server/data/subscriptions/
    // Proper shutdown for the HTTP server.
    // ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          }
        };
      }
    }
  ]
});
