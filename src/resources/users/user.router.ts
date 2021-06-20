import express from 'express';
import httpCodes from 'http-status-codes';
import User from './user.model';
import usersService from './user.service';
import { Exception } from '../../middleware/exception';

const router = express.Router({mergeParams: true});

const getId = (params: { [key: string]: string; }): string => {
  if (params && params['id'] && typeof params['id'] === 'string') {
    return params['id'];
  }
  throw new Exception(Exception.STATUS_BAD_REQUEST, 'unable to find id');
}

router.route('/').get(async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const users = await usersService.getAll();
    const result: { [key: string]: string }[] = [];
    users.forEach((user) => {
      result.push(User.toResponse(user));
    });
    res.status(httpCodes.OK).json(result);
    next();
  } catch(e) {
    next(e);
  }
});

router.route('/').post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.status(httpCodes.CREATED).json(User.toResponse((await usersService.add(req.body))));
    next();
  } catch (e) {
    next(e);
  }
});

router.route('/:id').get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.status(httpCodes.OK).json(User.toResponse((await usersService.get(getId(req.params)))));
    next();
  } catch (e) {
    next(e);
  }
});

router.route('/:id').put(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
  res.json(User.toResponse((await usersService.update(getId(req.params), req.body))));
  next();
  } catch (e) {
    next(e);
  }
});

router.route('/:id').delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await usersService.remove(getId(req.params));
    res.status(httpCodes.NO_CONTENT).send();
    next();
  } catch (e) {
    next(e);
  }
});

export default router;