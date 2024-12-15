import { MapPin } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { Merchant } from "./types";
// import { ChevronRight, MapPin, CreditCard } from 'lucide-react';

const MerchantCard: React.FC<Merchant> = ({ 
    name, 
    location, 
    categories 
  }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <h2 className="text-lg font-bold text-gray-800 mb-2">{name}</h2>
            <div className="flex items-center text-gray-500 mb-3">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{location}</span>
            </div>
            
            {/* Categories */}
            <div className="flex flex-row gap-2">
              {categories.map((category, index) => (
                <CategoryBadge key={index} {...category} />
              ))}
            </div>
          </div>
          
          {/* Details Arrow */}
          <button className="text-gray-400 hover:text-gray-600">
            {/* <ChevronRight className="w-6 h-6" /> */}
          </button>
        </div>
      </div>
    );
  };
  
export default MerchantCard;