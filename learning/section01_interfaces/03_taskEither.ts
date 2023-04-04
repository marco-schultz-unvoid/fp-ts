// https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html

/* 
  TaskEither: TaskEither<E, A> represents an asynchronous computation that either yields a 
  value of type A or fails, yielding an error of type E
*/

import axios, { AxiosResponse } from 'axios';
import { isLeft, left, right } from 'fp-ts/lib/Either';
import { TaskEither } from 'fp-ts/lib/TaskEither';

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

const makeGetCharacters = (): TaskEither<Error, Character[]> => async () => {
  try {
    const response: AxiosResponse<Character[]> = await axios.get(
      'https://swapi.dev/api/people'
    );
    return right(response.data);
  } catch (err) {
    return left(new Error('SWAPI request failed!'));
  }
};

const getCharacters = makeGetCharacters();
const characters = await getCharacters();

if (isLeft(characters)) {
  console.log(characters.left.message);
} else {
  console.log(characters.right);
}
