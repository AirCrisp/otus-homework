import cryptoRandomString from 'crypto-random-string';
import Boom from 'boom';
const { notFound } = Boom;

const store = {};

export const UserController = {
  createUser: (req) => {
    const userData = req.body;
    userData.id = cryptoRandomString({ length: 24, type: 'alphanumeric' });
    store[userData.id] = userData;
    return userData;
  },
  getUser: (req) => {
    const { userId } = req.params;
    
    if (!store[userId]) throw notFound('User not found.');
    
    return store[userId];
  },
  updateUser: (req) => {
    const updateData = req.body;
    const { userId } = req.params;
    
    if (!store[userId]) throw notFound('User not found.');
    
    store[userId] = {
      ...store[userId],
      ...updateData
    };
    
    return 'Ok';
  },
  deleteUser: (req) => {
    const { userId } = req.params;
    
    if (!store[userId]) throw notFound('User not found.');
    
    store[userId] = undefined;
    
    return 'Ok';
  }
};