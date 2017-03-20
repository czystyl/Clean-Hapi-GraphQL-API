module.exports = {
  env: 'development',

  product: {
    name: 'HapiGraphQL',
  },

  server: {
    phisioApi: {
      host: '0.0.0.0',
      port: process.env.PORT || 3000,
      tls: false,
    },
  },

  database: {
    host: 'db',
    port: 27017,
    name: 'phisio',
  },

  chairo: {
    options: {
      // prevent seneca timeout error
      // https://github.com/senecajs/seneca-transport/issues/23
      timeout: 999999999,
    },
  },

  cache: {
    mainCache: {
      engine: 'catbox-memory',
      name: 'mainCache',
      partition: 'hapi-api',
    },
  },

  apiPrefix: '/api/v1',
};
