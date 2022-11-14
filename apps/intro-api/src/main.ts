/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { isLeft } from 'fp-ts/lib/Either';
import * as path from 'path';
import { divide } from './app/divide';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/divide/:n1/:n2', (req, res) => {
  const n1 = Number(req.params['n1']);
  const n2 = Number(req.params['n2']);

  const result = divide(n1, n2);

  if (isLeft(result)) {
    res.status(500).json({ error: result.left });
  } else {
    res.status(200).send({ result: result.right });
  }
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
