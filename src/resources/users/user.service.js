const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const addUser = (user) => usersRepo.addUser(user);
const getUser = (id) => usersRepo.getUser(id);
const updateUser = (id, info) => usersRepo.updateUser(id, info);
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
