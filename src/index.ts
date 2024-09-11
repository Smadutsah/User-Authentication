import { apolloServer, httpServer } from './apollo_server';
import { AppDataSource } from './data_source';
import app from './server';

(async () => {
  // await AppDataSource.initialize()
  //   .then(async () => {
  console.log('[Success] DB is connected');
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: '/',
    onHealthCheck: () => {
      return new Promise((_resolve, _reject) => {
        // Replace the `true` in this conditional with more specific checks!
        return true;
      });
    }
  });
  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/api`);
  });
  // })
  // .catch((error: any) => {
  //   console.error('[Error] Error connecting DB', error);
  // });
})();
