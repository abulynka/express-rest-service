const users = new Map();

/**
 * Returns all users
 * 
 * @returns {Promise<Map<number, User>>} map object of users
 */
const getAll = async () => users;

/**
 * Adds new user
 * 
 * @param {User} user input user to set
 * @returns {Promise<User>} the instance of user object
 */
const add = async (user) => {
  users.set(user.id, user);
  return user;
};

/**
 * Returns user object by id
 * 
 * @param {string} id user identifier
 * @returns {Promise<User>} found user
 */
const get = async (id) => users.get(id);

/**
 * Updates user
 * 
 * @param {string} id user identifier
 * @param {object} info new user info
 * @returns {Promise<User>} updated user object
 * @throws {Error} user id not found
 */
const update = async (id, info) => {
  if (users.has(id)) {
    const user = users.get(id);
    user.name = info.name;
    user.login = info.login;
    user.password = info.password;
  } else {
    throw new Error('User not found');
  }
  return users.get(id);
};

/**
 * Removes user
 * 
 * @param {string} id search id
 * @returns {Promise<User>} deleted user object
 * @throws {Error} user not found
 */
const remove = async (id) => {
  if (users.has(id)) {
    const user = users.get(id);
    users.delete(id);
    return user;
  }
  throw new Error('User not found');
};

module.exports = { getAll, add, get, update, remove };
