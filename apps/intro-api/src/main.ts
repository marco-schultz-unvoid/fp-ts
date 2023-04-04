/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { isLeft } from 'fp-ts/lib/Either';
import * as path from 'path';
import { makeGetCharacters } from './app/makeGetCharacters';
import { getPersonByName } from './app/section01_option/01_option';
import { divide } from './app/section02_either/02_either';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Option
app.get('/people/:name', getPersonByName);

//  Either
app.get('/divide/:n1/:n2', divide);

// TaskEither
app.get('/characters', async (req, res) => {
  const getCharacters = makeGetCharacters();
  const characters = await getCharacters();

  if (isLeft(characters)) {
    return res
      .status(500)
      .json({ error: { message: characters.left.message } });
  } else {
    return res.status(200).json(characters.right);
  }
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
