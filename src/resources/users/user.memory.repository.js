const users = new Map();

const getAll = async () => users;

const addUser = async (user) => {
  users.set(user.id, user);
};

const getUser = async (id) => users.get(id);

const updateUser = async (id, info) => {
  if (users.has(id)) {
    const user = users.get(id);
    user.name = info.name;
    user.login = info.login;
    user.password = info.password;
  } else {
    throw new Error('User not found');
  }
  return users.get(id);
}

const deleteUser = async (id) => {
  if (users.has(id)) {
    const user = users.get(id);
    users.delete(id);
    return user;
  } 
    throw new Error('User not found');
  
}

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
