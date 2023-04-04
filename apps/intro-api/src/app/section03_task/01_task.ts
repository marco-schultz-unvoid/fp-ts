// https://gcanti.github.io/fp-ts/modules/Task.ts.html

/* 
  Task: Task<A> represents an asynchronous computation that yields a value of type A
  and never fails. 

  The Task interface wraps a function that returns a Promise.

  Here's the implementation code of the Task interface: 
  
  interface Task<A> {
    (): Promise<A>
  }

  That's why you must call it twice to execute.
*/

import { Request, Response } from 'express';
import { Task } from 'fp-ts/lib/Task';

/*
  Here we have a function that returns an asynchronous function that returns 'hello', 
  this external function can be typed as Task, wrapping the Promise, now it is lazy, 
  and never fails 
*/
const asyncHelloWorld = async () => 'Hello World'; // Promise
const executeSayHi = (): Task<string> => asyncHelloWorld; // Task wraps the promise

/* Endpoint that returns "Hello World" message */
export const sayHi = (req: Request, res: Response) =>
  res.status(200).send(executeSayHi()());

/**
 * Extra: Task is not just a type, it is a concept called Monad in functional programming
 *
 * https://en.wikipedia.org/wiki/Monad_(functional_programming)
 */
