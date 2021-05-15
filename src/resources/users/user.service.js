const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = async () => usersRepo.getAll();

const add = async (params) => {
  if (!params || !params.name || !params.login || !params.password) {
    throw new Error('Wrong input data');
  }
  const user = new User();

  user.name = params.name;
  user.login = params.login;
  user.password = params.password;

  usersRepo.add(user);

  return user;
};

const get = async (id) => usersRepo.get(id);

const update = async (id, info) => usersRepo.update(id, info);

const remove = async (id) => {
  await usersRepo.remove(id);
  await tasksRepo.cleanUser(id);
};

module.exports = { getAll, add, get, update, remove };
