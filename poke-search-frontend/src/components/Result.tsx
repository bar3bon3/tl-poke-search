import '../css/Result.scss';

import React, { useEffect, useState } from 'react';

import pokemon from '../api/pokemon';

type ResultProps = {
  query?: string | any;
};

type Pokemon = {
  name: string;
  description: string;
  is_legendary: boolean;
};

function Result({ query = '' }: ResultProps) {
  const [result, setResult] = useState<Pokemon | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const doSearch = async () => {
    const normalizedQuery = query.toLowerCase().trim();
    setIsloading(true);
    try {
      const { data }: { data: Pokemon } = await pokemon.get(
        `/${normalizedQuery}`,
      );
      setResult(data);
      setIsloading(false);
      setIsError(false);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setNotFound(true);
      } else {
        setIsError(true);
      }
      setResult(null);
      setIsloading(false);
    }
  };

  const renderResult = () => {
    if (isLoading) {
      return <div className="loader" />;
    }
    if (isError) {
      return (
        <div data-testid="result-info" className="result-info">
          Service temporarily unavailable, please try again later.
        </div>
      );
    }
    if (notFound) {
      return (
        <div data-testid="result-info" className="result-info">
          Your search
          {' '}
          {query && (
          <strong>
            -
            {' '}
            {query}
            {' '}
            -
          </strong>
          )}
          {' '}
          did not match any
          known Pokemon.
        </div>
      );
    }
    return (
      <>
        <div className="result-heading">
          <h1 className={result?.is_legendary ? 'animated-text-clip' : ''}>
            {result?.name}
          </h1>
          {result?.is_legendary && (
            <div className="result-label">(legendary!)</div>
          )}
        </div>
        <p className="result-description">{result?.description}</p>
      </>
    );
  };

  useEffect(() => {
    if (query !== '') {
      setNotFound(false);
      doSearch();
    }
  }, [query]);

  return <div className="result">{renderResult()}</div>;
}

export default Result;
