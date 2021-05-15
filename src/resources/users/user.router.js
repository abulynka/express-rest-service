const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  usersService
    .getAll()
    .then((users) => {
      const result = [];
      users.forEach((user) => {
        result.push(User.toResponse(user));
      });
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(500).send();
    });
});

router.route('/').post(async (req, res) => {
  usersService
    .add(req.body)
    .then((e) => {
      res.status(201);
      res.json(User.toResponse(e));
    })
    .catch(() => {
      res.status(400).send();
    });
});

router.route('/:id').get(async (req, res) => {
  usersService
    .get(req.params.id)
    .then((user) => {
      res.status(200);
      res.json(User.toResponse(user));
    })
    .catch(() => {
      res.status(404).send();
    });
});

router.route('/:id').put(async (req, res) => {
  usersService
    .update(req.params.id, req.body)
    .then((user) => {
      res.json(User.toResponse(user));
    })
    .catch(() => {
      res.status(400).send();
    });
});

router.route('/:id').delete(async (req, res) => {
  usersService
    .remove(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(404);
      res.send();
    });
});

module.exports = router;
