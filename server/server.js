require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const mongoConfig = require('./config/mongo');
const CorsModule = require('./config/cors');

const Jobs = require('./db/jobs');

const userRouter = require('./routes/user');
const pokemonRouter = require('./routes/pokemon');
const authRouter = require('./routes/auth');

const PORT = process.env.PORT;
const API = '/api/v1';

const app = express();

mongoConfig.connectDB().catch((err) => console.log('Error: ', err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => CorsModule.cors(req, res, next));
app.use(helmet());

app.use(`${API}/users`, userRouter);
app.use(`${API}/pokemon`, pokemonRouter);
app.use(`${API}/login`, authRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
  const ids = [...Array(150).keys()];
  ids.shift();
  Jobs.resetDB();
  Jobs.createAnalyzer();
  ids.reduce(
      (prevPromise, nextId) =>
        prevPromise.then(() => {
          console.log('pokemon id.....', nextId);
          return Jobs.lazilySavePokemon(nextId);
        }),
      Promise.resolve()
  );
});
