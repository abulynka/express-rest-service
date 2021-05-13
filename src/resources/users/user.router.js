const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  await usersService.getAll()
    .then(
      (users) => {
        const result = [];
        users.forEach(
          (user) => {
            result.push(User.toResponse(user));
          }
        );
        res.json(result);
      }
    )
    .catch(
      () => {
        res.status(500);
        res.send();
      }
    );
});

router.route('/').post(async (req, res) => {
  if (!req.body || !req.body.name || !req.body.login || !req.body.password) {
    res.status(400);
    res.send();
  } else {
    const user = new User();

    user.name = req.body.name;
    user.login = req.body.login;
    user.password = req.body.password;

    usersService.addUser(user)
      .then(
        (e) => {
          res.status(201);
          res.json(User.toResponse(e));
        }
      )
      .catch(
        () => {
          res.status(500);
          res.send();
        }
      );
  }
});

router.route('/:id').get(async (req, res) => {
  await usersService.getUser(req.params.id)
    .then(
      (user) => {
        res.status(200);
        res.json(User.toResponse(user));
      }
    ).catch(
      () => {
        res.status(404);
        res.send();
      }
    );
});

router.route('/:id').put(async (req, res) => {
  await usersService.updateUser(req.params.id, req.body)
    .then(
      (user) => {
        res.json(User.toResponse(user));
      }
    ).catch(
      () => {
        res.status(400);
      }
    );
  res.send();
});

router.route('/:id').delete(async (req, res) => {
  await usersService.deleteUser(req.params.id)
    .then(
      (user) => {
        res.status(204);
        res.json(User.toResponse(user));
      }
    ).catch(
      () => {
        res.status(404);
        res.send();
      }
    );
});

module.exports = router;
