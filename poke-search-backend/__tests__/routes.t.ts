import request from 'supertest';
import express from 'express';
import router from '../src/routes/main';

const app = express();
app.use('/', router);

describe('Routes test', function () {
  test('handles correct result for /pokemon/:pokemonName', async () => {
    const res = await request(app).get('/pokemon/poketest');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual({
      description: 'A legendary Pokemon used to test Express apps.',
      is_legendary: true,
      name: 'poketest',
    });
  });

  test('handles no result for /pokemon/:pokemonName', async () => {
    const res = await request(app).get('/pokemon/iamnotapokemon');
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });

  test('handles empty request for /pokemon/:pokemonName', async () => {
    const res = await request(app).get('/pokemon/');
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
    expect(res.statusCode).toBe(400);
  });

  test('handles pokeapi parsing error for /pokemon/:pokemonName', async () => {
    const res = await request(app).get('/pokemon/iamabrokenpokemon');
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
    expect(res.statusCode).toBe(500);
  });

  test('handles pokeapi service unavailable for /pokemon/:pokemonName', async () => {
    const res = await request(app).get('/pokemon/iamunavailable');
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
    expect(res.statusCode).toBe(503);
  });
});
