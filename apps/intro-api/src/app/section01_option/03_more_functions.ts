/*
  fromPredicate => Converts boolean to Option
  getOrElse => extracts the value from an option, and returns a default value instead of none
*/

import { Request, Response } from 'express';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';
import { toNumber } from 'lodash';

/** Function that checks if a number is even and returns an Option of number */
const executeIsNumberEven = (n: number): O.Option<number> =>
  pipe(
    n,
    O.fromPredicate((n) => n % 2 === 0)
  );

/** The request handler */
export const isNumberEven = (req: Request, res: Response) =>
  pipe(
    req.params.number,
    toNumber,
    executeIsNumberEven,
    O.getOrElse(() => 0), // If number is not even, return 0
    (n) => res.send(n)
  );
