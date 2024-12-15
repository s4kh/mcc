import { CreditCard } from "lucide-react";
import MerchantCard from "./MerchantCard";
import { Merchant } from "./types";

interface Props{
    merchants:Merchant[];
}

const MerchantSearchResults: React.FC<Props> = ({merchants}) => {
  
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          <span className="ml-3 text-sm text-gray-500">
            {merchants.length} merchants found
          </span>
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {merchants.map(merchant => (
            <MerchantCard key={merchant.id} {...merchant} />
          ))}
        </div>
        
        {merchants.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <CreditCard className="mx-auto w-16 h-16 mb-4 text-gray-300" />
            <p>No merchants found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    );
  };
  
  export default MerchantSearchResults;