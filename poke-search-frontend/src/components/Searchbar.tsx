import '../css/Searchbar.scss';

import React, { useEffect, useState } from 'react';

import PG from '../helpers/PokemonGenerator';

type SearchbarProps = {
  onSubmit: (term: string) => void;
  query?: string | any;
  loading?: boolean;
};

function Searchbar({ onSubmit, loading = false, query = '' }: SearchbarProps) {
  const [term, setTerm] = useState(query);
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(term);
  };

  const randomSearch = () => {
    const randomPokemon = PG.random();
    onSubmit(randomPokemon);
  };

  useEffect(() => {
    setTerm(query);
  }, [query]);

  return (
    <div className="searchbar">
      <form
        className={`searchbar-form ${loading ? 'loading' : ''}`}
        onSubmit={onFormSubmit}
      >
        <input
          data-testid="searchbar-input"
          className="searchbar-input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          name="search"
          type="search"
          placeholder={PG.random()}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <span className="searchbar-info">
          Type a Pokemon name and hit enter to search
          {' '}
          <br />
          {' '}
          or
          {' '}
          <button type="button" onClick={randomSearch}>randomize</button>
        </span>
      </form>
    </div>
  );
}

export default Searchbar;
