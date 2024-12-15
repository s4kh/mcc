'use client'; // Required for using state in components

import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex mb-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a merchant..."
                required
                className="border border-gray-300 rounded-l-md p-2 w-full"
            />
            <button type="submit" className="bg-primary text-white hover:bg-darkGreen rounded-r-md p-2">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
