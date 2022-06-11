class PokemonGenerator {
  private pokemonName = [
    'bulbasaur',
    'ivysaur',
    'suicune',
    'blastoise',
    'caterpie',
    'nidoqueen',
    'nidorino',
    'nidoking',
    'eelektrik',
    'elgyem',
    'ho-oh',
    'articuno',
    'entei',
    'chandelure',
    'vullaby',
    'mandibuzz',
    'heatmor',
    'flaaffy',
    'lugia',
    'beartic',
    'magnezone',
    'pawniard',
    'pichu',
    'magmortar',
    'regieleki',
    'zapdos',
    'weedle',
    'blissey',
    'moltres',
    'ferroseed',
    'magikarp',
    'serperior',
    'cinccino',
    'staryu',
    'mewtwo',
    'raikou',
  ];

  private randomPokemon = '';

  random(): string {
    const pokemon = this.pokemonName[
      Math.floor(Math.random() * this.pokemonName.length)
    ];
    if (pokemon !== this.randomPokemon) {
      this.randomPokemon = pokemon;
      return this.randomPokemon;
    }
    return this.random();
  }

  toRegexp(): string {
    return `${this.pokemonName.join('|')}`;
  }
}

export default new PokemonGenerator();
