import httpCodes from 'http-status-codes';
import express from 'express';
import Task from './task.model';
import tasksService from './task.service';

const router = express.Router();

const getBoardId = (params: { [key: string]: string; }): string => {
  if (params && params['boardId'] && typeof params['boardId'] === 'string') {
    return params['boardId'];
  } 
    throw new Error('unable to find board id');
};

const getTaskId = (params: { [key: string]: string; }): string => {
  if (params && params['taskId'] && typeof params['taskId'] === 'string') {
    return params['taskId'];
  } 
    throw new Error('unable to find task id');
};

router.route('/:boardId/tasks').get(async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.params);
    const tasks = await tasksService.getAll(getBoardId(req.params));
    const results: object[] = [];
    tasks.forEach((task) => {
      results.push(Task.toResponse(task));
    });
    res.status(httpCodes.OK).json(results);
  } catch (e) {
    res.status(httpCodes.BAD_REQUEST).send();
  }
});

router.route('/:boardId/tasks').post(async (req: express.Request, res: express.Response) => {
  try {
    const task = await tasksService.add(getBoardId(req.params), req.body);
    res.status(httpCodes.CREATED).json(Task.toResponse(task));
  } catch (e) {
    console.log(e);
    res.status(httpCodes.BAD_REQUEST).send();
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req: express.Request, res: express.Response) => {
  try {
    const task = await tasksService.get(getBoardId(req.params), getTaskId(req.params));
    res.status(httpCodes.OK).json(Task.toResponse(task));
  } catch (e) {
    res.status(httpCodes.NOT_FOUND).send();
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req: express.Request, res: express.Response) => {
  try {
    const task = await tasksService.update(getBoardId(req.params), getTaskId(req.params), req.body);
    res.status(httpCodes.OK).json(Task.toResponse(task));
  } catch (e) {
    res.status(httpCodes.BAD_REQUEST).send();
  }
})

router.route('/:boardId/tasks/:taskId').delete(async (req: express.Request, res: express.Response) => {
  try {
    await tasksService.remove(getBoardId(req.params), getTaskId(req.params));
    res.status(httpCodes.NO_CONTENT).send();
  } catch (e) {
    res.status(httpCodes.NOT_FOUND).send();
  }
});

export default router;