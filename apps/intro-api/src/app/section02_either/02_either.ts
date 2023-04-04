// https://gcanti.github.io/fp-ts/modules/Either.ts.html

/* 
  Either: Either<E, A> represents a value of one of two possible types:
    - Left: represents error
    - Right: represents success
*/

import { Request, Response } from 'express';
import { Either, isLeft, left, right } from 'fp-ts/lib/Either';

/* 
  In this function, an error can occur if the user tries to divide by 0, so we can use 
  Either to implement it
*/
const executeDivide = (n1: number, n2: number): Either<Error, number> => {
  // If dividing by 0, return left
  if (n2 === 0) {
    return left(new Error('Cannot divide by 0!'));
  }

  // Otherwise return right, and execute the division
  return right(n1 / n2);
};

/* Request handler that executes a division and returns a result or an error */
export const divide = (req: Request, res: Response) => {
  const n1 = Number(req.params['n1']);
  const n2 = Number(req.params['n2']);

  const result = executeDivide(n1, n2);

  // If is left, send error as response
  if (isLeft(result)) {
    return res.status(500).json({ error: result.left.message });
  }

  // If is right, send the result
  return res.status(200).json({ result: result.right });
};

/**
 * Note: We have to access result.left or result.right to get the value, otherwise it will
 * return an object with _tag and left or right property
 */
