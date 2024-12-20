import { MapPin } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { Merchant } from "./types";
// import { ChevronRight, MapPin, CreditCard } from 'lucide-react';

const MerchantCard: React.FC<Merchant> = ({ name, location, categories }) => {
  return (
    <div className="p-4 bg-white shadow-md">      
      <h2 className="text-lg font-bold text-gray-800 truncate" title={name}>
        {name}
      </h2>
        
      <div className="flex items-center text-gray-500">
        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="text-sm truncate">{location}</span>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {categories.map((category, index) => (
          <CategoryBadge key={index} {...category} />
        ))}
      </div>      
    </div>
  );
};
  
export default MerchantCard;