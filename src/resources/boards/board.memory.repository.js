const boards = new Map();

const getAll = async () => boards;

const add = async (board) => {
  boards.set(board.id, board);
  return board;
};

const get = async (id) => {
  if (!boards.has(id)) {
    throw new Error('Unknown id');
  }
  return boards.get(id);
};

const update = async (id, params) => {
  if (!boards.has(id)) {
    throw new Error('Unknown board');
  }

  const board = boards.get(id);
  board.title = params.title;
  return board;
};

const remove = async (id) => {
  if (!boards.has(id)) {
    throw new Error('Unable to find board');
  }

  boards.delete(id);
};

module.exports = { getAll, add, get, update, remove };
