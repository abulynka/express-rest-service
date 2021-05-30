const uuid = require('uuid').v4;

class User {
  /**
   * Constructor
   * @param {Object} param0 input params
   * @returns {void} nothing to return
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Converts user to response
   * @param {User} user input User object
   * @returns {Object} result object
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
