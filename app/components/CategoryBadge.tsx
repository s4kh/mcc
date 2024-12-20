import { mccOptions } from "./MccSelect";
import { Category } from "./types";

const cardTypeLabels: Record<string, string> = {
  amex: 'Amex',
  visa: 'Visa',
  mastercard: 'Mastercard',
  other:'Other',
  discover: 'Discover',
};

const getMccLabel = (mcc: string) => {
  const mccItem = mccOptions.find(option => option.value === mcc);
  return mccItem ? mccItem.label : `Unknown MCC - ${mcc}`;
};

// Get the first word of MCC label
const getShortMccLabel = (mcc: string) => {
  const label = getMccLabel(mcc);
  return label.split(' ')[0]; // Extract the first word
};

const CategoryBadge: React.FC<Category> = ({ cardType, cardName, mcc }) => {
  const mccLabel = getMccLabel(mcc); // Shortened MCC Label
  const cardTypeLabel = cardTypeLabels[cardType] || cardType; // Card Type Label

  return (
    <div className="px-3 bg-gray-100 py-2 text-sm border-l-4">
      {/* MCC Label with Card Type */}
      <div className="font-semibold cursor-pointer text-gray-900 truncate" title={mccLabel}>
        {cardTypeLabel} - {getShortMccLabel(mcc)} 
      </div>

      {/* Card Name with Tooltip */}
      <span
        title={cardName} // Tooltip for Full Card Name
        className="truncate cursor-pointer text-gray-700 w-full"
      >
        {cardName}
      </span>
    </div>
  );
};

export default CategoryBadge;