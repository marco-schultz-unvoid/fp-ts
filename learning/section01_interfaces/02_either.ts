// https://gcanti.github.io/fp-ts/modules/Either.ts.html

/* 
  Either: Either<E, A> represents a value of one of two possible types:
    - Left: represents error
    - Right: represents success
*/

import { Either, isLeft, left, right } from 'fp-ts/lib/Either';

// Example 1
export const divide = (n1: number, n2: number): Either<null, number> => {
  if (n2 === 0) {
    return left(null);
  }

  return right(n1 / n2);
};

const n = divide(14, 6);

if (isLeft(n)) {
  console.log('Cannot divide by 0!');
} else {
  console.log(n.right);
}
