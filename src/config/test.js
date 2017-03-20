module.exports = {
  env: 'test',

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

  chairo: {
    options: {
      // prevent seneca timeout error
      // https://github.com/senecajs/seneca-transport/issues/23
      timeout: 999999999,
    },
  },
};
