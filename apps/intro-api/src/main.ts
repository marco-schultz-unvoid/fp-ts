/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { isLeft } from 'fp-ts/lib/Either';
import * as path from 'path';
import { divide } from './app/divide';
import { makeGetCharacters } from './app/makeGetCharacters';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/divide/:n1/:n2', (req, res) => {
  const n1 = Number(req.params['n1']);
  const n2 = Number(req.params['n2']);

  const result = divide(n1, n2);

  if (isLeft(result)) {
    return res.status(500).json({ error: result.left });
  } else {
    return res.status(200).send({ result: result.right });
  }
});

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
