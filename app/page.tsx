'use client';
import { useEffect, useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import SearchBar from './components/SearchBar';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';
import Link from 'next/link';
import { Merchant } from './components/types';
import MerchantSearchResults from './components/Results';

const HomePage: React.FC = () => {
  const [results, setResults] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMerchants = async(query: string) => {
    setLoading(true);
    setError(null);
    try {
        const res = await fetch(`/api?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        });

        if (!res.ok) {
        throw new Error('Failed to fetch merchants');
        }

        const json = await res.json();
        setResults(json.data);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchMerchants(`page=1&pageSize=10`);
  }, []);

  const handleSearch = async (q: string) => {
    const query = `name=${q}`
    await fetchMerchants(query);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Search className="w-10 h-10 text-primary" strokeWidth={2.5} />
          <h1 className="text-3xl font-bold text-gray-800">Merchant Category Book</h1>
        </div>
        <Link 
          href="/mcc/create" 
          className="flex items-center space-x-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Submit Category</span>
        </Link>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingIndicator />
        </div>
      ) : (
        <MerchantSearchResults merchants={results} />
      )}
    </div>
  );
};

export default HomePage;