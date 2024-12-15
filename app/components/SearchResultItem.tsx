import React, { useState } from 'react';
import { Category } from './types';

interface SearchResultItemProps {
    name: string;
    categories: Category[];
    // onVote: (cardType: string, voteValue: number) => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ name, categories }) => {
    const [votes, setVotes] = useState<{ [key: string]: number | null }>({});

    const handleVote = (cardType: string, voteValue: number) => {
        // Update local state to reflect the vote
        setVotes((prevVotes) => ({
        ...prevVotes,
        [cardType]: prevVotes[cardType] === voteValue ? null : voteValue, // Toggle vote or reset
        }));

        // Call the parent handler
        // onVote(cardType, votes[cardType] === voteValue ? 0 : voteValue); // Send 0 to "unvote"
    };
    return (
        <div className="bg-white rounded-md p-4 mb-4">
            <h2 className="text-xl font-bold text-gray-800">{name}</h2>
            <ul className="mt-2">
                {categories.map((category, index) => (
                    <li key={index} className="flex border-b items-center text-gray-700 mt-1">
                        <div className="flex items-center">
                            <span className="font-semibold text-black min-w-[100px]">{category.cardType}:</span>
                            <span className="ml-2 font-medium text-gray-600">
                                {category.cardType} (MCC: {category.mcc})
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleVote(category.cardType, 1)}
                                className={`px-2 py-1 rounded ${votes[category.cardType] === 1 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                            >
                                👍
                            </button>
                            {/* <span className="font-bold text-gray-800">{category.vote}</span> */}
                            <button
                                onClick={() => handleVote(category.cardType, -1)}
                                className={`px-2 py-1 rounded ${votes[category.cardType] === -1 ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
                            >
                                👎
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResultItem;
