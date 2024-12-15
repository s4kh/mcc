import { Category } from "./types";

const cardTypeLogos: Record<string, () => JSX.Element> = {
  amex: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path fill="#1976D2" d="M22 10c0-1.1-.9-2-2-2h-17c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h17c1.1 0 2-.9 2-2v-4z"/>
      <path fill="white" d="M4.25 9.25h2.125l.5-1h-2.625V7h3.25l.875-1.75h1.25L7.125 7h1.75v1.25h-1.875l-.5 1h2.375v1h-2.625l-1.125 2.25h-1.25l1.125-2.25h-1.25v-1z"/>
      <path fill="white" d="M15.5 16l-2-2.5h-1.5v-1h1.5l2-2.5h1.5v1h-1l-1.5 1.5 1.5 1.5h1v1h-1.5z"/>
      <path fill="white" d="M19 16l-2-2.5h-1.5v-1h1.5l2-2.5h1.5v1h-1l-1.5 1.5 1.5 1.5h1v1h-1.5z"/>
    </svg>
  ),
  visa: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path fill="#1565C0" d="M22 10c0-1.1-.9-2-2-2h-17c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h17c1.1 0 2-.9 2-2v-4z"/>
      <path fill="white" d="M11.301 13.377l-1.005-4.868h-1.571l1.593 6.286h1.879l2.283-6.286h-1.571l-1.005 4.868zm3.817-4.868l-1.472 6.286h1.486l1.472-6.286h-1.486zm3.562 5.263c-.412-.158-.674-.263-.674-.525.038-.21.254-.368.525-.368h.096l.636.105c.21.038.381.105.525.21l.27-1.041a3.299 3.299 0 00-.952-.158h-.105c-1.041 0-1.774.547-1.812 1.343 0 .458.344.77.983 1.006.525.21.674.315.674.51-.038.21-.254.368-.525.368h-.105l-.636-.105c-.21-.038-.381-.105-.525-.21l-.27 1.041c.316.158.674.21.983.21h.105c1.12 0 1.812-.547 1.852-1.343 0-.495-.344-.77-.983-1.044zm-10.418-4.868l-1.566 6.286h1.486l1.566-6.286h-1.486z"/>
    </svg>
  ),
  mastercard: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path fill="#FF5722" d="M22 10c0-1.1-.9-2-2-2h-17c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h17c1.1 0 2-.9 2-2v-4z"/>
      <circle cx="9.5" cy="12" r="5" fill="#FF5722"/>
      <circle cx="14.5" cy="12" r="5" fill="#F44336"/>
      <path fill="#FFC107" d="M12 9.5c-1.15.75-1.9 2.05-1.9 3.5s.75 2.75 1.9 3.5c1.15-.75 1.9-2.05 1.9-3.5S13.15 10.25 12 9.5z"/>
    </svg>
  ),
  other: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path fill="#6B7280" d="M22 10c0-1.1-.9-2-2-2h-17c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h17c1.1 0 2-.9 2-2v-4z"/>
      <path fill="white" d="M11.5 14a1 1 0 100-2 1 1 0 000 2z"/>
      <path fill="white" d="M12 7c-1.657 0-3 1.343-3 3a.5.5 0 001 0c0-1.103.897-2 2-2s2 .897 2 2c0 .784-.441 1.021-1.025 1.5C11.362 10.98 10.5 11.608 10.5 13a.5.5 0 001 0c0-.784.441-1.021 1.025-1.5C13.138 10.52 14 9.892 14 9c0-1.657-1.343-3-3-3z"/>
    </svg>
  )
};

const cardTypeLabels: Record<string, string> = {
  amex: 'Amex',
  visa: 'Visa',
  mastercard: 'Mastercard'
};

const CategoryBadge: React.FC<Category> = ({ cardType, cardName, mcc }) => {
  const LogoComponent = cardTypeLogos[cardType];

  return (
    <div className="bg-gray-100 rounded-lg p-2 space-y-1">
      <div className="flex items-center space-x-2">
        {/* {LogoComponent ? <LogoComponent /> : (
          <div className={`w-5 h-5 rounded-full ${
            cardType === 'amex' ? 'bg-amex' :
            cardType === 'visa' ? 'bg-visa' :
            cardType === 'mastercard' ? 'bg-mc' :
            'bg-other'
          }`} />
        )} */}
        <span className="font-bold text-sm text-gray-800">
          {cardTypeLabels[cardType] || cardType} - {mcc}
        </span>
      </div>
      <div className="text-xs text-gray-600">
        {/* <strong>Category:</strong> {mcc} */}
        {cardName && (
          <div className="text-gray-500 mt-1">
            {cardName}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBadge;