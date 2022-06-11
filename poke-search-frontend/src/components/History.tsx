import '../css/History.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type HistoryProps = {
  query?: string | any;
};

function History({ query }: HistoryProps) {
  const [history, setHistory] = useState<string[]>([]);
  useEffect(() => {
    if (query && query !== '') {
      if (history.includes(query)) {
        setHistory([
          query,
          ...history.filter((item) => item !== query),
        ]);
      } else {
        setHistory([query, ...history.slice(0, 4)]);
      }
    }
  }, [query]);
  return (
    <div className="history">
      {history.length > 0 && (
        <div className="history-wrapper">
          <h4>Recent search</h4>
          <nav>
            <ul data-testid="history-list">
              {history.map((term) => (
                <li key={term}>
                  <Link to={{ search: `?q=${term}` }}>{term}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default History;
