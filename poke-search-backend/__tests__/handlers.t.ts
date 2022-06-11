import { pokemonSearchHandle } from '../src/routes/default';

describe('Handlers test', function () {
  test("responds to 'pokemonName' param", async () => {
    const req = { params: { pokemonName: 'poketest' } };

    const res = {
      text: '',
      status: null,
      send: function (val) {
        this.text = val;
      },
      sendStatus: function (val) {
        this.status = val;
      },
    };

    await pokemonSearchHandle(req, res);

    expect(res.text).toEqual({
      description: 'A legendary Pokemon used to test Express apps.',
      is_legendary: true,
      name: 'poketest',
    });
  });
});
