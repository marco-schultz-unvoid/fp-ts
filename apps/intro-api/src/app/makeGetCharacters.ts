import axios, { AxiosResponse } from 'axios';
import { left, right } from 'fp-ts/lib/Either';
import { TaskEither } from 'fp-ts/lib/TaskEither';

// Usage: Http requests, DB access
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

export const makeGetCharacters =
  (): TaskEither<Error, Character[]> => async () => {
    try {
      const response: AxiosResponse<Character[]> = await axios.get(
        'https://swapi.dev/api/people'
      );
      return right(response.data);
    } catch (err) {
      console.log(err);
      return left(new Error('SWAPI request failed!'));
    }
  };
