import { Router } from 'express';
import { pokemonSearchHandle } from './default';

const router = Router();

router.get('/pokemon/:pokemonName?', pokemonSearchHandle);

export default router;
