/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as path from 'path';
import { getPersonByName } from './app/section01_option/01_option';
import { divide } from './app/section02_either/02_either';
import { getCharacters } from './app/section03_task/02_taskEither';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Option
app.get('/people/:name', getPersonByName);

//  Either
app.get('/divide/:n1/:n2', divide);

// TaskEither
app.get('/characters', getCharacters);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
