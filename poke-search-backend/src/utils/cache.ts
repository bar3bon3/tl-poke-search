import apicache from 'apicache';
import { CACHE_DURATION } from '../helpers/constants';

export const cache = apicache.middleware(
  CACHE_DURATION, 
  (req, res) => res.statusCode === 200
);