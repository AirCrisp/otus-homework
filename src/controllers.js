import Joi from 'joi';
import cryptoRandomString from 'crypto-random-string';
import Boom from 'boom';
const { notFound } = Boom;

const store = {};

const createUser = (req) => {
  const userData = req.body;
  userData.id = cryptoRandomString({ length: 24, type: 'alphanumeric' });
  store[userData.id] = userData;
  return userData;
};

const getUser = (req) => {
  const { userId } = req.params;

  if (!store[userId]) throw notFound('User not found.');

  return store[userId];
};

const updateUser = (req) => {
  const updateData = req.body;
  const { userId } = req.params;

  if (!store[userId]) throw notFound('User not found.');

  store[userId] = {
    ...store[userId],
    ...updateData
  };

  return 'Ok';
};

const deleteUser = (req) => {
  const { userId } = req.params;

  if (!store[userId]) throw notFound('User not found.');

  store[userId] = undefined;

  return 'Ok';
};

export function UserController(fastify) {
  fastify.post('/api/user', {
    schema: {
      body: Joi.object({
        username: Joi.string().max(256).required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/)
      })
    },
    validatorCompiler: ({ schema, }) => {
      return data => schema.validate(data)
    },
    handler: createUser
  });
  fastify.get('/api/user/:userId', {
    schema: {
      params: Joi.object({
        userId: Joi.string().length(24).required()
      })
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => {
      return data => schema.validate(data)
    },
    handler: getUser
  });
  fastify.put('/api/user/:userId', {
    schema: {
      params: Joi.object({
        userId: Joi.string().length(24).required()
      }),
      body: Joi.object({
        username: Joi.string().max(256),
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email({ tlds: { allow: false } }),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/)
      })
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => {
      return data => schema.validate(data)
    },
    handler: updateUser
  });
  fastify.delete('/api/user/:userId', {
    schema: {
      params: Joi.object({
        userId: Joi.string().length(24).required()
      })
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => {
      return data => schema.validate(data)
    },
    handler: deleteUser
  });
};
