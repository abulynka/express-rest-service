import express from 'express';
import httpCodes from 'http-status-codes';
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

const getId = (params: { [key: string]: string; }): string => {
  if (params && params['id'] && typeof params['id'] === 'string') {
    return params['id'];
  }
  throw new Error('unable to find id');
}

router.route('/').get(async (req: express.Request, res: express.Response) => {
  try {
    if (!req) {
      // just for linter and ts compiler
    }
    const users = await usersService.getAll();
    const result: { [key: string]: string }[] = [];
    users.forEach((user) => {
      result.push(User.toResponse(user));
    });
    res.status(httpCodes.OK).json(result);
  } catch (e) {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.route('/').post(async (req: express.Request, res: express.Response) => {
  try {
    res.status(httpCodes.CREATED).json(User.toResponse((await usersService.add(req.body))));
  } catch (e) {
    res.status(httpCodes.BAD_REQUEST).send();
  }
});

router.route('/:id').get(async (req: express.Request, res: express.Response) => {
  try {
    res.status(httpCodes.OK).json(User.toResponse((await usersService.get(getId(req.params)))));
  } catch (e) {
    res.status(httpCodes.NOT_FOUND).send();
  }
});

router.route('/:id').put(async (req: express.Request, res: express.Response) => {
  try {
    res.json(User.toResponse((await usersService.update(getId(req.params), req.body))));
  } catch (e) {
    res.status(httpCodes.BAD_REQUEST).send();
  }
});

router.route('/:id').delete(async (req: express.Request, res: express.Response) => {
  try {
    await usersService.remove(getId(req.params));
    res.status(httpCodes.NO_CONTENT).send();
  } catch (e) {
    res.status(httpCodes.NOT_FOUND).send();
  }
});

export default router;