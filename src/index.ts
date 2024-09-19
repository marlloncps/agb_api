import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import MySQLRepository from './infra/MySQLRepository';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(router)

MySQLRepository.connect();

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`API Rodando na porta: ${port}`);
});