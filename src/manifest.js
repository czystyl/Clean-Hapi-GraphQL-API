import Config from './config';

const ServerConfig = Config.server.phisioApi;

const manifest = {
  server: {
    app: Config,
  },

  connections: [
    {
      host: ServerConfig.host,
      port: ServerConfig.port,
    },
  ],

  registrations: [
    { plugin: { register: 'hapi-auth-jwt2' } },
    { plugin: { register: 'hapi-cors', options: { origins: ['*'] } } },
    { plugin: { register: './lib' } },
  ],
};

if (Config.cache) {
  const caches = [];
  Object.keys(Config.cache).forEach((key) => {
    caches.push(Config.cache[key]);
  });

  manifest.server.cache = caches;
}

ServerConfig.uri = `${ServerConfig.tls ? 'https://' : 'http://'
  }${ServerConfig.host}:${ServerConfig.port}`;

module.exports = manifest;
