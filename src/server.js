import Glue from 'glue';
import Chalk from 'chalk';
import mongoose from 'mongoose';
import manifest from './manifest';
import { database } from './config';

const opts = { relativeTo: `${process.cwd()}/src` };

Glue.compose(manifest, opts, (err, server) => {
  if (err) {
    throw err;
  }

  const bootMessage = `
${Chalk.bgGreen.white('Server started with success!')}\n
${Chalk.bgGreen.white(`${manifest.server.app.product.name} is listening on`)} 
${Chalk.white.underline(manifest.server.app.server.phisioApi.uri)}\n
${Chalk.bgGreen.white(`Environment: ${manifest.server.app.env}`)}`;

  mongoose.Promise = Promise;
  mongoose.connect(`mongodb://${database.host}:${database.port}/${database.name}`);

  server.initialize((err) => {
    if (err) {
      throw err;
    }

    server.start((err) => {
      if (err) {
        throw err;
      }
      console.log(bootMessage);
    });
  });
});
