import httpCodes from 'http-status-codes';
import express from 'express';
import { Task } from './task.model';
import tasksService from './task.service';
import { Exception } from '../../common/exception';

const router = express.Router({mergeParams: true});

const getBoardId = (params: { [key: string]: string; }): string => {
  if (params && params['boardId'] && typeof params['boardId'] === 'string') {
    return params['boardId'];
  } 
  throw new Exception(Exception.STATUS_BAD_REQUEST, 'unable to find board id');
};

const getTaskId = (params: { [key: string]: string; }): string => {
  if (params && params['taskId'] && typeof params['taskId'] === 'string') {
    return params['taskId'];
  } 
  throw new Exception(Exception.STATUS_BAD_REQUEST, 'unable to find task id');
};

router.route('/:boardId/tasks').get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const tasks = await tasksService.getAll(getBoardId(req.params));
    const results: object[] = [];
    tasks.forEach((task) => {
      results.push(Task.toResponse(task));
    });
    res.status(httpCodes.OK).json(results);
    next();
  } catch (e) {
    next(e);
  }
});

router.route('/:boardId/tasks').post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const task = await tasksService.add(getBoardId(req.params), req.body);
    res.status(httpCodes.CREATED).json(Task.toResponse(task));
    next();
  } catch (e) {
    next(e);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const task = await tasksService.get(getBoardId(req.params), getTaskId(req.params));
    res.status(httpCodes.OK).json(Task.toResponse(task));
    next();
  } catch (e) {
    next(e);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const task = await tasksService.update(getBoardId(req.params), getTaskId(req.params), req.body);
    res.status(httpCodes.OK).json(Task.toResponse(task));
    next();
  } catch (e) {
    next(e);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await tasksService.remove(getBoardId(req.params), getTaskId(req.params));
    res.status(httpCodes.NO_CONTENT).send();
    next();
  } catch (e) {
    next(e);
  }
});

export default router;