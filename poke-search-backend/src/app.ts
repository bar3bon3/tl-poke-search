import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/main';
import { PORT } from './helpers/constants';

const app: Express = express();

app.use('/', router);
app.use(cors());

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
