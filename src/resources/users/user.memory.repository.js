const users = new Map();

const getAll = async () => users;

const add = async (user) => {
  users.set(user.id, user);
  return user;
};

const get = async (id) => users.get(id);

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

const remove = async (id) => {
  if (users.has(id)) {
    const user = users.get(id);
    users.delete(id);
    return user;
  }
  throw new Error('User not found');
};

module.exports = { getAll, add, get, update, remove };
