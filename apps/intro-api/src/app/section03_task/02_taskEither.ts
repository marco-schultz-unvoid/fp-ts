// https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html

/* 
  TaskEither: TaskEither<E, A> represents an asynchronous computation that either yields a 
  value of type A or fails, yielding an error of type E
*/

import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { isLeft } from 'fp-ts/lib/Either';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';

// Usage: Http requests, DB access

// SWAPI interface
interface Character {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

/* 
  This function fetches from the Star Wars API with axios, which should return a promise.
  We'll return a TaskEither instead, returning a left error if the axios request fails 
*/
const executeGetCharacters = (): TaskEither<Error, Character[]> =>
  /*
    tryCatch is a function that transforms a promise into a TaskEither
      - First parameter: callback that executes the promise, is the `right` return
      - Second parameter: callback that handles the promise error, is the `left` return
  */
  tryCatch(
    async () => {
      const response: AxiosResponse<Character[]> = await axios.get(
        'https://swapi.dev/api/people'
      );

      // Returns right if request succeeds, with the data
      return response.data;
    },
    (err) => {
      console.log(err);

      // Returns left if request fails
      return new Error('SWAPI request failed!');
    }
  );

/* Endpoint that fetchs Star Wars API characters or returns an error */
export const getCharacters = async (req: Request, res: Response) => {
  const characters = await executeGetCharacters()();

  if (isLeft(characters)) {
    return res.status(500).json({ error: characters.left.message });
  }

  return res.status(200).json({ charactersFound: characters.right });
};

/**
 * Extra: TaskEither is not just a type, it is a concept called Monad in functional programming
 *
 * https://en.wikipedia.org/wiki/Monad_(functional_programming)
 */
