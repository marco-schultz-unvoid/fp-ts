import { Either, left, right } from 'fp-ts/lib/Either';

export const divide = (n1: number, n2: number): Either<null, number> => {
  if (n2 === 0) {
    return left(null);
  }

  return right(n1 / n2);
};
