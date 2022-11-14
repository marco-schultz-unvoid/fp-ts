// https://gcanti.github.io/fp-ts/modules/Task.ts.html

/* 
  Task: Task<A> represents an asynchronous computation that yields a value of type A
  and never fails. 
*/

import { Task } from 'fp-ts/lib/Task';

// Example 1
export const sayHi = (): Task<string> => async () => 'hello';

// Usage: fetch requests, async functions that do not throw errors
const users = ['Me', 'TheGreat', 'Rasputinn'];

export const getUsers = (): Task<string[]> => {
  return async () => users;
};
