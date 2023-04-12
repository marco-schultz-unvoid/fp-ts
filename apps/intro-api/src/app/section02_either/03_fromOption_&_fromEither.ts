/* eslint-disable @typescript-eslint/no-unused-vars */

/*
  Either.fromOption: Function that converts an option to an either, 
  Option.fromOption: Function that converts an either to an option


*/

import { Request, Response } from 'express';
import * as E from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';
import { isNil } from 'lodash';

type Person = {
  readonly name: string;
};

const PEOPLE: Person[] = [
  { name: 'Marco' },
  { name: 'Tom' },
  { name: 'Robert' },
  { name: 'Bob' },
];

/* This first function will search a person by name, and return an Option */
const findPersonByName = (name: string): O.Option<Person> => {
  const foundPerson = PEOPLE.find(
    (Person) => Person.name.toLowerCase() === name.toLowerCase()
  );

  // If found Person is undefined, return `none`
  if (isNil(foundPerson)) {
    return O.none;
  }
  // If Person is found, return `some`
  return O.some(foundPerson);
};

/* This function will transform the Option to an Either using Either.fromOption */
const eitherGetPersonByName = (name: string): E.Either<Error, Person> => {
  const personFound = findPersonByName(name);
  return E.fromOption(() => new Error('Not found!'))(personFound);
};

/* We can also convert an Either to an Option by using the function Option.fromEither */
const optionGetPersonByName = (name: string): O.Option<Person> =>
  O.fromEither(eitherGetPersonByName(name));

/* 
  Notes:
    - These functions also exist for other monads, like TaskOption.fromEither
    - The first function call receives a callback that will return the left value
    - The second function call receives the option we want to convert
    - It looks better if we use pipe, then we don't have to call the function twice:

    const executeGetPersonByName = (name: string): Either<Error, Person> => 
      pipe(
        findPersonByName(name),
        fromOption(() => new Error('Not found!'))
      )

    - We started using a different import pattern:
      import * as E from 'fp-ts/lib/Either';
      import * as O from 'fp-ts/lib/Option';
      
      This is because there many functions in fp-ts that have the same name in different 
      packages. For instance, we have Set.fromArray, ReadonlyArray.fromArray, 
      NonEmptyArray.fromArray, and plenty more
*/
