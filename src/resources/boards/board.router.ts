import httpCodes from 'http-status-codes';
import express from 'express';
import Board from './board.model';
import boardsService from './board.service';

const router = express.Router();

const getId = (params: { [key: string]: string; }): string => {
  if (params && params['id'] && typeof params['id'] === 'string') {
    return params['id'];
  } 
    throw new Error();
}

router.route('/').get(async (req: express.Request, res: express.Response) => {
  try {
    if (!req) {
      // just for linter and ts compiler
    }
    const result: { [key: string]: string | { [key: string]: string; }[]; }[] = [];
    (await boardsService.getAll()).forEach((board) => {
      result.push(Board.toResponse(board));
    });
    res.status(httpCodes.OK).json(result);
  } catch {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.route('/').post(async (req: express.Request, res: express.Response) => {
  try {
    const board = await boardsService.add(req.body);
    res.status(httpCodes.CREATED).json(Board.toResponse(board));
  } catch {
    res.status(httpCodes.BAD_REQUEST).send();
  }
});

router.route('/:id').get(async (req: express.Request, res: express.Response) => {
  try {
    res.status(httpCodes.OK).json(Board.toResponse((await boardsService.get(getId(req.params)))));
  } catch {
    res.status(httpCodes.NOT_FOUND).send();
  }
});

router.route('/:id').put(async (req: express.Request, res: express.Response) => {
  try {
    res.status(httpCodes.OK).json(Board.toResponse((await boardsService.update(getId(req.params), req.body))));
  } catch {
    res.status(httpCodes.NOT_FOUND).send();
  }
});

router.route('/:id').delete(async (req: express.Request, res: express.Response) => {
  try {
    await boardsService.remove(getId(req.params));
    res.status(httpCodes.NO_CONTENT).send();
  } catch {
    res.status(httpCodes.NOT_FOUND).send();
  }
});

export default router;