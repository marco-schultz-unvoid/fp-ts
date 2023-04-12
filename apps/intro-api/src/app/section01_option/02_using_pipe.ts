/*
  In this example, we'll use pipe to have a more functional code that looks better.

  fold => receives 2 callbacks as params, the first one defines what to do with the `none` 
  result, the second defines what to do with the `some` result
*/

import { Request, Response } from 'express';
import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

type Person = {
  readonly name: string;
};

const PEOPLE: Person[] = [
  { name: 'Marco' },
  { name: 'Tom' },
  { name: 'Robert' },
  { name: 'Bob' },
];

/* 
  In this function we want to get a Person by name, but if not found return null, so we can
  use Option here 
*/
const executeGetPersonByName = (name: string): O.Option<Person> =>
  // Function from fp-ts Array module that helps us search an array, returning an Option
  A.findFirst((person: Person) => person.name === name)(PEOPLE);

/* Request handler that sends null or the Person as a response */
export const getPersonByName = (req: Request, res: Response) =>
  pipe(
    req.params.name,
    executeGetPersonByName,
    O.fold(
      () => res.status(200).json(null),
      (person: Person) => res.status(200).json(person)
    )
  );
