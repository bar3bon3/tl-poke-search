import axios from 'axios';
import type { Pokemon } from '../helpers/types';
import { API_BASE_URL } from '../helpers/constants';

export const pokemonSearchHandle = async (req, res) => {
  const pokemonName = req.params.pokemonName;
  const url = `${API_BASE_URL}/${pokemonName}`;

  if (pokemonName && pokemonName !== '') {
    await axios
      .get(url)
      .then(function (response) {
        const enDescription = response.data.flavor_text_entries.filter(
          (item) => item.language.name === 'en'
        );

        const pokemon: Pokemon = {
          name: response.data.name,
          is_legendary: response.data.is_legendary,
          description: enDescription[0].flavor_text.replace(/\f/gm, ' '), // removes '\f' escape chars, if any
        };
        // handle success
        res.send(pokemon);
      })
      .catch(function (error) {
        // pipe error status from Axios response or fallback to 500 for parsing erros
        const status = error.response?.status ? error.response.status : 500;
        // handle error
        res.sendStatus(status);
      });
  } else {
    // handle client error
    res.sendStatus(400);
  }
};
