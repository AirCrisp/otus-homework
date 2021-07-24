import { UserController } from './controllers.js';
import fastify from 'fastify';
import Boom from 'fastify-boom';


const server = fastify({ logger: true });

server.register(Boom);

server.get('/health', (req, res) => {
  res.send({ status: "OK" });
});

UserController(server);

server.listen(8080, '0.0.0.0');