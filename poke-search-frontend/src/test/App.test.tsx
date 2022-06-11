import {
  fireEvent, render, screen, waitFor, within,
} from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import App from '../components/App';
import PG from '../helpers/PokemonGenerator';

describe('App test', () => {
  it('shows base ui', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const searchBar = screen.getByTestId('searchbar-input');
    expect(searchBar).toHaveAttribute('placeholder', expect.stringMatching(PG.toRegexp()));
  });

  it('shows random Pokemon on \'randomize\' click', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const searchBar = screen.getByTestId('searchbar-input');
    const randomizeLink = screen.getByText('randomize');

    fireEvent.click(randomizeLink);

    await waitFor(() => {
      expect(searchBar).toHaveAttribute('value', expect.stringMatching(PG.toRegexp()));
    });
  });

  it('retrieve Pokemon info on form submit', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const searchBar = screen.getByTestId('searchbar-input');

    fireEvent.change(searchBar, { target: { value: 'poketest' } });
    fireEvent.submit(searchBar);

    await waitFor(() => {
      expect(searchBar).toHaveAttribute('value', 'poketest');
      expect(screen.getByText('(legendary!)')).toBeInTheDocument();
      expect(screen.getByText('A legendary Pokemon used to test React apps.')).toBeInTheDocument();
    });
  });

  it('retrieve Pokemon info if query param is in the url', async () => {
    render(
      <MemoryRouter initialEntries={['/?q=poketest']}>
        <App />
      </MemoryRouter>,
    );

    const searchBar = screen.getByTestId('searchbar-input');

    await waitFor(() => {
      expect(searchBar).toHaveAttribute('value', 'poketest');
      expect(screen.getByText('(legendary!)')).toBeInTheDocument();
      expect(screen.getByText('A legendary Pokemon used to test React apps.')).toBeInTheDocument();
    });
  });

  it('populate search history', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const searchBar = screen.getByTestId('searchbar-input');

    fireEvent.change(searchBar, { target: { value: 'poketest' } });
    fireEvent.submit(searchBar);

    fireEvent.change(searchBar, { target: { value: 'staryu' } });
    fireEvent.submit(searchBar);

    fireEvent.change(searchBar, { target: { value: 'elgyem' } });
    fireEvent.submit(searchBar);

    await waitFor(() => {
      const historyList = screen.getByTestId('history-list');
      const { getAllByRole } = within(historyList);
      const items = getAllByRole('listitem');
      const historyStack = items.map((item) => item.textContent);

      expect(screen.getByText('Recent search')).toBeInTheDocument();
      expect(historyStack).toEqual([
        'elgyem',
        'staryu',
        'poketest',
      ]);
    });
  });

  it('shows only last 5 history elements', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const searchBar = screen.getByTestId('searchbar-input');

    fireEvent.change(searchBar, { target: { value: 'poketest' } });
    fireEvent.submit(searchBar);

    fireEvent.change(searchBar, { target: { value: 'staryu' } });
    fireEvent.submit(searchBar);

    fireEvent.change(searchBar, { target: { value: 'elgyem' } });
    fireEvent.submit(searchBar);

    fireEvent.change(searchBar, { target: { value: 'ferroseed' } });
    fireEvent.submit(searchBar);

    fireEvent.change(searchBar, { target: { value: 'blissey' } });
    fireEvent.submit(searchBar);

    fireEvent.change(searchBar, { target: { value: 'vullaby' } });
    fireEvent.submit(searchBar);

    await waitFor(() => {
      const historyList = screen.getByTestId('history-list');
      const { getAllByRole } = within(historyList);
      const items = getAllByRole('listitem');
      const historyStack = items.map((item) => item.textContent);

      expect(screen.getByText('Recent search')).toBeInTheDocument();
      expect(historyStack).toEqual([
        'vullaby',
        'blissey',
        'ferroseed',
        'elgyem',
        'staryu',
      ]);
    });
  });

  it('perform search on history element click', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const searchBar = screen.getByTestId('searchbar-input');

    fireEvent.change(searchBar, { target: { value: 'staryu' } });
    fireEvent.submit(searchBar);

    fireEvent.change(searchBar, { target: { value: 'blissey' } });
    fireEvent.submit(searchBar);

    fireEvent.change(searchBar, { target: { value: 'vullaby' } });
    fireEvent.submit(searchBar);

    await waitFor(() => {
      const historyList = screen.getByTestId('history-list');
      const { getAllByRole } = within(historyList);
      const items = getAllByRole('listitem');

      fireEvent.click(items[0]);

      expect(searchBar).toHaveAttribute('value', 'vullaby');
    });
  });

  it('shows feedback on no result', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const searchBar = screen.getByTestId('searchbar-input');

    fireEvent.change(searchBar, { target: { value: 'iamnotapokemon' } });
    fireEvent.submit(searchBar);

    await waitFor(() => {
      const resultInfo = screen.getByTestId('result-info');
      expect(resultInfo).toHaveTextContent('Your search - iamnotapokemon - did not match any known Pokemon.');
    });
  });

  it('shows feedback on service not available', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const searchBar = screen.getByTestId('searchbar-input');

    fireEvent.change(searchBar, { target: { value: 'ibrokeit' } });
    fireEvent.submit(searchBar);

    await waitFor(() => {
      const resultInfo = screen.getByTestId('result-info');
      expect(resultInfo).toHaveTextContent('Service temporarily unavailable, please try again later.');
    });
  });
});
