// https://gcanti.github.io/fp-ts/modules/Option.ts.html

/* 
  Option: Option<A> an optional value of type A. 
  If the value of type A is present, the Option<A> is an instance of Some<A>. 
  If the value is absent, the Option<A> is an instance of None.

  It is equivalent to a nullable variable, however, Option is better for avoiding bugs due 
  to forgetting to check if the value is null
*/

import { Request, Response } from 'express';
import { Option, isNone, none, some, toNullable } from 'fp-ts/lib/Option';
import { isNil } from 'lodash';

export type Person = {
  readonly name: string;
};

const people: Person[] = [
  { name: 'Marco' },
  { name: 'Tom' },
  { name: 'Robert' },
  { name: 'Bob' },
];

/* 
  In this function we want to get a Person by name, but if not found return null, so we can
  use Option here 
*/
const executeGetPersonByName = (name: string): Option<Person> => {
  const foundPerson = people.find(
    (Person) => Person.name.toLowerCase() === name.toLowerCase()
  );

  // If found Person is undefined, return `none` from fp-ts/Option
  if (isNil(foundPerson)) {
    return none;
  }
  // If Person is found, return `some` Person from fp-ts/Option
  return some(foundPerson);
};

/* Request handler that sends null or the Person as a response */
export const getPersonByName = (req: Request, res: Response) => {
  const PersonName = req.params.name;

  const Person = executeGetPersonByName(PersonName);

  // If option value is none, we could also use isSome instea0d
  if (isNone(Person)) {
    // toNullable => converts Option to a nullable variable. There is also fromNullable, which does the opposite
    return res.status(200).json(toNullable(Person));
  }

  // We can access the value property to get the person
  return res.status(200).json(Person.value);
};
