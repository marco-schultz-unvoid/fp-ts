/*
  In this example, we'll refactor the previous one using pipe to have a more functional 
  code that looks better.

  fromPredicate => 1st param is a callback that determines if should return right, 2nd param
  is a callback for when the predicate fails that returns left

  map => maps the right result of an Either

  fold => receives 2 callbacks as params, the first one defines what to do with the `left` 
  result, the second defines what to do with the `right` result
*/

import { Request, Response } from 'express';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

/* 
  In this function, an error can occur if the user tries to divide by 0, so we can use 
  Either to implement it
*/
const executeDivide = (n1: number, n2: number): E.Either<Error, number> =>
  pipe(
    { n1, n2 },
    E.fromPredicate(
      ({ n2 }) => n2 !== 0,
      () => new Error('Cannot divide by 0!')
    ),
    E.map(({ n1, n2 }) => n1 / n2)
  );

/* Request handler that executes a division and returns a result or an error */
export const dividePipe = (req: Request, res: Response) =>
  pipe(
    executeDivide(Number(req.params['n1']), Number(req.params['n2'])),
    E.fold(
      (error) => res.status(500).json({ error: error.message }),
      (result) => res.status(200).json({ result })
    )
  );
