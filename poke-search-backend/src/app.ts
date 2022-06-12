import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/main';
import { PORT } from './helpers/constants';
import { cache } from './utils/cache';

const app: Express = express();

app.use(cache);
app.use(cors());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
