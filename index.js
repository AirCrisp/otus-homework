const server = require('fastify')({ logger: true });

server.get('/health', (req, res) => {
  res.send({ status: "OK" });
});

server.listen(8080, '0.0.0.0');