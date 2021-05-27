const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  boardsService
    .getAll()
    .then((boards) => {
      const result = [];
      boards.forEach((board) => {
        result.push(Board.toResponse(board));
      });
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(500).send();
    });
});

router.route('/').post(async (req, res) => {
  boardsService
    .add(req.body)
    .then((board) => {
      res.status(201).json(Board.toResponse(board));
    })
    .catch(() => {
      res.status(400).send();
    });
});

router.route('/:id').get(async (req, res) => {
  boardsService
    .get(req.params.id)
    .then((board) => {
      res.status(200).json(Board.toResponse(board));
    })
    .catch(() => {
      res.status(404).send();
    });
});

router.route('/:id').put(async (req, res) => {
  boardsService
    .update(req.params.id, req.body)
    .then((board) => {
      res.status(200).json(Board.toResponse(board));
    })
    .catch(() => {
      res.status(400).send();
    });
});

router.route('/:id').delete(async (req, res) => {
  boardsService
    .remove(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(404).send();
    });
});

module.exports = router;
