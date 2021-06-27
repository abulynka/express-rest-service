import {v4 as uuidv4} from 'uuid';

export class User {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * Constructor
   * @param {Object} param0 input params
   */
  constructor({
    id = uuidv4(),
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
  static toResponse(user: User): { [key: string]: string; } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}