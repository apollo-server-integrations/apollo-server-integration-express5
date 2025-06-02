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
import { expressMiddleware } from '../../dist/index.js';
import type { Server } from 'http';
import type { AddressInfo } from 'net';
import { format } from 'url';

export function urlForHttpServer(httpServer: Server): string {
  const { address, port } = httpServer.address() as AddressInfo;

  // Convert IPs which mean "any address" (IPv4 or IPv6) into localhost
  // corresponding loopback ip. Note that the url field we're setting is
  // primarily for consumption by our test suite. If this heuristic is wrong for
  // your use case, explicitly specify a frontend host (in the `host` option
  // when listening).
  const hostname = address === '' || address === '::' ? 'localhost' : address;

  return format({
    protocol: 'http',
    hostname,
    port,
    pathname: '/',
  });
}

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
