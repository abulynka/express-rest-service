import httpCodes from 'http-status-codes';
import express from 'express';
import { Board } from './board.model';
import boardsService from './board.service';
import { Exception } from '../../common/exception';

const router = express.Router({mergeParams: true});

const getId = (params: { [key: string]: string; }): string => {
  if (params && params['id'] && typeof params['id'] === 'string') {
    return params['id'];
  } 
  
  throw new Exception(Exception.STATUS_NOT_FOUND, 'unable to find id in request params');
}

router.route('/').get(async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const result: { [key: string]: string | { [key: string]: string | number; }[]; }[] = [];
    (await boardsService.getAll()).forEach((board) => {
      result.push(Board.toResponse(board));
    });
    res.status(httpCodes.OK).json(result);
    next();
  } catch (e) {
    next(e);
  }
});

router.route('/').post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const board = await boardsService.add(req.body);
    res.status(httpCodes.CREATED).json(Board.toResponse(board));
    next();
  } catch (e) {
    next(e);
  }
});

router.route('/:id').get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.status(httpCodes.OK).json(Board.toResponse((await boardsService.get(getId(req.params)))));
    next();
  } catch (e) {
    next(e);
  }
});

router.route('/:id').put(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.status(httpCodes.OK).json(Board.toResponse((await boardsService.update(getId(req.params), req.body))));
    next();
  } catch (e) {
    next(e);
  }
});

router.route('/:id').delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await boardsService.remove(getId(req.params));
    res.status(httpCodes.NO_CONTENT).send();
    next();
  } catch (e) {
    next(e);
  }
});

export default router;