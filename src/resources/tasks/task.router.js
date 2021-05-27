const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get((req, res) => {
  tasksService
    .getAll(req.params.boardId)
    .then((tasks) => {
      const results = [];
      tasks.forEach((task) => {
        results.push(Task.toResponse(task));
      });
      res.status(200).json(results);
    })
    .catch(() => {
      res.status(400).send();
    });
});

router.route('/:boardId/tasks').post((req, res) => {
  tasksService
    .add(req.params.boardId, req.body)
    .then((task) => {
      res.status(201).json(Task.toResponse(task));
    })
    .catch(() => {
      res.status(400).send();
    });
});

router.route('/:boardId/tasks/:taskId').get((req, res) => {
  tasksService
    .get(req.params.boardId, req.params.taskId)
    .then((task) => {
      res.status(200).json(Task.toResponse(task));
    })
    .catch(() => {
      res.status(404).send();
    });
});

router.route('/:boardId/tasks/:taskId').put((req, res) => {
  tasksService
    .update(req.params.boardId, req.params.taskId, req.body)
    .then((task) => {
      res.status(200).json(Task.toResponse(task));
    })
    .catch(() => {
      res.status(400).send();
    });
});

router.route('/:boardId/tasks/:taskId').delete((req, res) => {
  tasksService
    .remove(req.params.boardId, req.params.taskId)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(404).send();
    });
});

module.exports = router;
