import { rest } from 'msw';

import { API_BASE_URL } from '../../src/helpers/constants';

// Mocking API response for test execution
const handlers = [
  rest.get(`${API_BASE_URL}/iamnotapokemon`, (req, res, ctx) =>
    res(ctx.status(404))
  ),
  rest.get(`${API_BASE_URL}/ibrokeit`, (req, res, ctx) => 
    res(ctx.status(500))
    ),
  rest.get(`${API_BASE_URL}/iamunavailable`, (req, res, ctx) =>
    res(ctx.status(503))
  ),
  rest.get(`${API_BASE_URL}/iamabrokenpokemon`, (req, res, ctx) => {
    const mockApiResponse = {
      name: 'poketest',
      is_legend: true, // key should be is_legendary
      flavor_text_entries: null, // value should be a list of FlavorText
    };
    return res(
      ctx.status(200), 
      ctx.json(mockApiResponse)
    );
  }),
  rest.get(`${API_BASE_URL}/poketest`, (req, res, ctx) => {
    const mockApiResponse = {
      name: 'poketest',
      is_legendary: true,
      flavor_text_entries: [
        {
          flavor_text: 'A legendary Pokemon used to test Express apps.',
          language: {
            name: 'en',
            url: 'https://pokeapi.co/api/v2/language/9/',
          },
          version: {
            name: 'red',
            url: 'https://pokeapi.co/api/v2/version/1/',
          },
        },
      ],
    };
    return res(
      ctx.status(200), 
      ctx.json(mockApiResponse)
    );
  }),
];

export default handlers;
