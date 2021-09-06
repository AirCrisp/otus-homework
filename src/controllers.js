import Boom from 'boom';
import { UserRepo } from './db.js';
const { notFound } = Boom;

export const UserController = (server) => {
  const repo = new UserRepo(server.knex);

  return {
    createUser: async function (req) {
      const userData = req.body;
      return repo.createOne(userData);
    },
    getUser: async function (req) {
      const { userId } = req.params;
      const users = await repo.findOne(userId);
      if (!users?.length) throw notFound('User not found.');
      
      return users;
    },
    getUserList: async function () {
      const users = await repo.findAll();      
      return users;
    },
    updateUser: async function (req) {
      const updateData = req.body;
      const { userId } = req.params;
      const users = await repo.findOne(userId);
      
      if (!users?.length) throw notFound('User not found.');
      
      return repo.updateOne(updateData, userId);
    },
    deleteUser: async function (req) {
      const { userId } = req.params;
      const users = await repo.findOne(userId);
      
      if (!users?.length) throw notFound('User not found.');
      
      return repo.deleteOne(userId);
    }
  }
}