import '../css/App.scss';

import React from 'react';
import {
  Navigate, Route, Routes, useSearchParams,
} from 'react-router-dom';

import History from './History';
import Result from './Result';
import Searchbar from './Searchbar';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ? searchParams.get('q')?.toString() : '';

  const onFormSubmit = (term: string) => {
    if (term && term !== '') {
      setSearchParams({ q: term });
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <div className="app">
            <div className="row h-small-20 h-50">
              <div className="app-main">
                <Searchbar onSubmit={onFormSubmit} query={query} />
              </div>
            </div>
            <div className="row h-small-80 h-50">
              <div className="app-result">
                <Result query={query} />
              </div>
              <div className="app-sidebar">
                <History query={query} />
              </div>
            </div>
          </div>
        )}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
