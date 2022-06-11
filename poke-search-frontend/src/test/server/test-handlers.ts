import { rest } from 'msw';

import { API_BASE_URL } from '../../helpers/constants';

// Mocking API response for test execution
const handlers = [
  rest.get(`${API_BASE_URL}/pokemon/iamnotapokemon`, (req, res, ctx) => res(ctx.status(404))),
  rest.get(`${API_BASE_URL}/pokemon/ibrokeit`, (req, res, ctx) => res(ctx.status(500))),
  rest.get(`${API_BASE_URL}/pokemon/*`, (req, res, ctx) => {
    const mockApiResponse = {
      name: 'poketest',
      is_legendary: true,
      description: 'A legendary Pokemon used to test React apps.',
    };
    return res(ctx.status(200), ctx.json(mockApiResponse));
  }),
];

export default handlers;
