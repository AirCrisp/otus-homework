import Joi from 'joi';
import { UserController } from './controllers.js';

export function UserRouter(fastify) {
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
    handler: UserController.createUser
  });
  fastify.get('/api/user/:userId', {
    schema: {
      params: Joi.object({
        userId: Joi.string().length(24).required()
      })
    },
    validatorCompiler: ({ schema }) => {
      return data => schema.validate(data)
    },
    handler: UserController.getUser
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
    validatorCompiler: ({ schema }) => {
      return data => schema.validate(data)
    },
    handler: UserController.updateUser
  });
  fastify.delete('/api/user/:userId', {
    schema: {
      params: Joi.object({
        userId: Joi.string().length(24).required()
      })
    },
    validatorCompiler: ({ schema }) => {
      return data => schema.validate(data)
    },
    handler: UserController.deleteUser
  });
};
