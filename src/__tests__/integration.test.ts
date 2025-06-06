import type { ApolloServerOptions, BaseContext } from '@apollo/server';
import { ApolloServer } from '@apollo/server';
import type {
  CreateServerForIntegrationTestsOptions,
  CreateServerForIntegrationTestsResult,
} from '@apollo/server-integration-testsuite';
import { defineIntegrationTestSuite } from '@apollo/server-integration-testsuite';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express, { json } from 'express';
import type { RequestListener } from 'http';
import http from 'http';
import { expressMiddleware } from '..';
import { urlForHttpServer } from './utils';

defineIntegrationTestSuite(async function (
  serverOptions: ApolloServerOptions<BaseContext>,
  testOptions?: CreateServerForIntegrationTestsOptions,
): Promise<CreateServerForIntegrationTestsResult> {
  const app = express();
  // See
  // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/70563#issuecomment-2676702572
  // for why we have this `as`.
  const httpServer = http.createServer(app as RequestListener);
  const server = new ApolloServer({
    ...serverOptions,
    plugins: [
      ...(serverOptions.plugins ?? []),
      ApolloServerPluginDrainHttpServer({
        httpServer,
      }),
    ],
  });
  await server.start();

  app.use(
    cors(),
    json(),
    expressMiddleware(server, {
      context: testOptions?.context,
    }),
  );
  await new Promise<void>((resolve) => {
    httpServer.listen({ port: 0 }, resolve);
  });
  return { server, url: urlForHttpServer(httpServer) };
});
