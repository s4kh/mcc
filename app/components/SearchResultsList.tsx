import React from 'react';
import SearchResultItem from './SearchResultItem';
import { Merchant } from './types';

interface SearchResultsListProps {
    results: Merchant[];
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
    return (
        <div className="mt-4">
            {results.length > 0 ? (
                results.map((result) => (
                    <SearchResultItem key={result.id} name={result.name} categories={result.categories} />
                ))
            ) : (
                <p className="text-neutral-dark">No results found. Please try a different search.</p>
            )}
        </div>
    );
};

export default SearchResultsList;
