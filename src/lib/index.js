import { apolloHapi, graphiqlHapi } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import runtime from '../runtime';
import jwt from './jwt';
import methods from '../methods';
import routes from '../routes';
import { apiPrefix } from '../config';
import { user } from '../models';
import createResolvers from '../graphql/resolver';
import RootSchema from '../graphql/schema';

exports.register = (server, options, next) => {
  const prefix = apiPrefix === '' ? undefined : apiPrefix;

  const executableSchema = makeExecutableSchema({
    typeDefs: [RootSchema],
    resolvers: createResolvers({ user }),
  });

  server.register(
    [
      { register: runtime },
      { register: jwt },
      { register: methods },
      { register: routes, routes: { prefix } },
      {
        register: apolloHapi,
        options: {
          path: '/graphql',
          route: {
            auth: 'token',
          },
          apolloOptions: request => ({
            pretty: true,
            schema: executableSchema,
            context: {
              user: request.auth.credential,
            },
          }),
        },
      },
      {
        register: graphiqlHapi,
        options: {
          path: '/graphiql',
          graphiqlOptions: {
            endpointURL: '/graphql',
          },
        },
      },
    ],
    (err) => {
      if (err) {
        return next(err);
      }
      return next();
    },
  );
};

exports.register.attributes = {
  name: 'project library',
};
