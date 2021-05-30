import httpCodes from 'http-status-codes';
import express from 'express';
import Task from './task.model';
import tasksService from './task.service';

const router = express.Router();

const getBoardId = (params: { [key: string]: string; }): string => {
  if (params && params['boardId'] && typeof params['boardId'] === 'string') {
    return params['boardId'];
  } 
    throw new Error();
};

const getTaskId = (params: { [key: string]: string; }): string => {
  if (params && params['taskId'] && typeof params['taskId'] === 'string') {
    return params['taskId'];
  } 
    throw new Error();
};

router.route('/:boardId/tasks').get((req: express.Request, res: express.Response) => {
  try {
    tasksService
    .getAll(getBoardId(req.params))
    .then((tasks) => {
      const results: object[] = [];
      tasks.forEach((task) => {
        results.push(Task.toResponse(task));
      });
      res.status(httpCodes.OK).json(results);
    })
    .catch(() => {
      res.status(httpCodes.BAD_REQUEST).send();
    });
  } catch {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.route('/:boardId/tasks').post((req: express.Request, res: express.Response) => {
  try {
  tasksService
    .add(getBoardId(req.params), req.body)
    .then((task) => {
      res.status(httpCodes.CREATED).json(Task.toResponse(task));
    })
    .catch(() => {
      res.status(httpCodes.BAD_REQUEST).send();
    });
  } catch {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.route('/:boardId/tasks/:taskId').get((req: express.Request, res: express.Response) => {
  try {
    tasksService
      .get(getBoardId(req.params), getTaskId(req.params))
      .then((task) => {
        res.status(httpCodes.OK).json(Task.toResponse(task));
      })
      .catch(() => {
        res.status(httpCodes.NOT_FOUND).send();
      })
  } catch {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.route('/:boardId/tasks/:taskId').put((req: express.Request, res: express.Response) => {
  try {
    tasksService
      .update(getBoardId(req.params), getTaskId(req.params), req.body)
      .then((task) => {
        res.status(httpCodes.OK).json(Task.toResponse(task));
      })
      .catch(() => {
        res.status(httpCodes.BAD_REQUEST).send();
      });
  } catch {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send();
  }
})

router.route('/:boardId/tasks/:taskId').delete((req: express.Request, res: express.Response) => {
  try {
    tasksService
      .remove(getBoardId(req.params), getTaskId(req.params))
      .then(() => {
        res.status(httpCodes.NO_CONTENT).send();
      })
      .catch(() => {
        res.status(httpCodes.NOT_FOUND).send();
      })
  } catch {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send();
  }
});

export default router;