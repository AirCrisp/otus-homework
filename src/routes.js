import Joi from 'joi';
import { UserController } from './controllers.js';

export function UserRouter(fastify) {
  const userController = UserController(fastify);
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
    handler: userController.createUser.bind(userController)
  });
  fastify.get('/api/user/:userId', {
    schema: {
      params: Joi.object({
        userId: Joi.string().length(36).required()
      })
    },
    validatorCompiler: ({ schema }) => {
      return data => schema.validate(data)
    },
    handler: userController.getUser.bind(userController)
  });
  fastify.put('/api/user/:userId', {
    schema: {
      params: Joi.object({
        userId: Joi.string().length(36).required()
      }),
      body: Joi.object({
        username: Joi.string().max(256),
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email({ tlds: { allow: false } }),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/)
      })
    },
    validatorCompiler: ({ schema }) => {
      return data => schema.validate(data)
    },
    handler: userController.updateUser.bind(userController)
  });
  fastify.delete('/api/user/:userId', {
    schema: {
      params: Joi.object({
        userId: Joi.string().length(36).required()
      })
    },
    validatorCompiler: ({ schema }) => {
      return data => schema.validate(data)
    },
    handler: userController.deleteUser.bind(userController)
  });
  console.log(fastify.knex?.schema);
};
