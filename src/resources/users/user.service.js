const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * Returns all users
 * @returns {Promise<Map<number, User>>} map object of users
 */
const getAll = async () => usersRepo.getAll();

/**
 * Adds new user
 * @param {Object} params new user info
 * @returns {Promise<User>} new added user
 * @throw {Error} wrong input data
 */
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

/**
 * Returns user by input id
 * @param {string} id user id to get
 * @returns {Promise<User>} user by id
 */
const get = async (id) => usersRepo.get(id);

/**
 * Updates user
 * @param {string} id user id to update
 * @param {Object} info new user info
 * @returns {Promise<User>} new User updated object
 */
const update = async (id, info) => usersRepo.update(id, info);

/**
 * Removes user by input id
 * @param {Promise<string>} id user id to remove 
 * @returns {void} nothing to return
 */
const remove = async (id) => {
  await usersRepo.remove(id);
  await tasksRepo.cleanUser(id);
};

module.exports = { getAll, add, get, update, remove };
