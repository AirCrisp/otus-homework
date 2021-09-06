import fastify from 'fastify';
import Boom from 'fastify-boom';
import knex from 'fastify-knexjs';
import fastifyEnv from 'fastify-env';
import metricsPlugin from 'fastify-metrics';

import { UserRouter } from './routes.js';
import { initModels } from './db.js';

const server = fastify({ logger: { level: process.env.APP_LOG_LEVEL || 'info' } });

server.register(metricsPlugin, { endpoint: '/metrics' });

const schema = {
  type: 'object',
  required: [ 'APP_PORT' ],
  properties: {
    APP_HOST: {
      type: 'string',
      default: 'localhost'
    },
    APP_PORT: {
      type: 'number',
      default: 3000
    },
    APP_LOG_LEVEL: {
      type: 'string',
      default: 'info'
    },
    DATABASE_HOST: {
      type: 'string',
      default: 'localhost'
    },
    DATABASE_NAME: {
      type: 'string',
      default: 'app'
    },
    DATABASE_DEBUG: {
      type: 'boolean',
      default: false
    },
    DATABASE_USERNAME: {
      type: 'string',
      default: 'user'
    },
    DATABASE_PASSWROD: {
      type: 'string',
      default: 'user'
    },
    DATABASE_PORT: {
      type: 'string',
      default: '5432'
    }
  }
}

await server.register(fastifyEnv, { schema });

await server.register(knex, {
  client: 'pg',
  connection: {
    host : server.config.DATABASE_HOST,
    user: server.config.DATABASE_USERNAME,
    password : server.config.DATABASE_PASSWROD,
    database : server.config.DATABASE_NAME,
    port:  server.config.DATABASE_PORT
  },
  debug: server.config.DATABASE_DEBUG 
});
  
await initModels(server.knex);

await server.register(Boom);

server.get('/health', (req, res) => {
  res.send({ status: "OK" });
});

server.get('/', (req, res) => {
  res.send({ status: "OK" });
});

UserRouter(server);

server.listen(server.config.APP_PORT, server.config.APP_HOST);