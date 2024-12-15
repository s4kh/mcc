// Import React and React Select
import React from 'react';
import Select from 'react-select';
// Predefined MCC Data (as an example)
// Predefined MCC Data based on Stripe Issuing Categories
export const mccOptions = [
    { value: '5411', label: 'Grocery Stores, Supermarkets - 5411' },
    { value: '5541', label: 'Service Stations (with or without ancillary services) - 5541' },
    { value: '5542', label: 'Automated Fuel Dispensers - 5542' },
    { value: '5812', label: 'Eating Places and Restaurants - 5812' },
    { value: '5813', label: 'Bars, Cocktail Lounges, Discotheques, Nightclubs, Taverns - 5813' },
    { value: '5814', label: 'Fast Food Restaurants - 5814' },
    { value: '5912', label: 'Drug Stores, Pharmacies - 5912' },
    { value: '5999', label: 'Miscellaneous and Specialty Retail Stores - 5999' },
    { value: '5942', label: 'Book Stores - 5942' },
    { value: '5977', label: 'Cosmetic Stores - 5977' },
    { value: '5300', label: 'Wholesale Clubs - 5300' },
    { value: '4111', label: 'Local/Suburban Commuter Passenger Transportation - 4111' },
    { value: '4814', label: 'Telecommunication Services - 4814' },
    { value: '5732', label: 'Electronics Stores - 5732' },
    { value: '7011', label: 'Hotels, Motels, and Resorts - 7011' },
    { value: '4722', label: 'Travel Agencies - 4722' },
    { value: '5816', label: 'Digital Goods (Music, Movies, Software, etc.) - 5816' },
    { value: '7372', label: 'Computer Programming, Data Processing, and Integrated Systems Design - 7372' },
    { value: '7623', label: 'Electrical and Small Appliance Repair Shops - 7623' },
    { value: '8398', label: 'Charitable and Social Service Organizations - 8398' },
    { value: '9399', label: 'Government Services - 9399' },
    { value: '4784', label: 'Tolls and Bridge Fees - 4784' },
    { value: '4900', label: 'Utilities - 4900' },
    { value: '7299', label: 'Miscellaneous Personal Services - 7299' },
    { value: '8699', label: 'Membership Organizations - 8699' },
    { value: '7996', label: 'Amusement Parks, Carnivals, Circuses, Fairs - 7996' },
    { value: '8211', label: 'Elementary and Secondary Schools - 8211' },
    { value: '8244', label: 'Business and Secretarial Schools - 8244' },
    { value: '8249', label: 'Vocational and Trade Schools - 8249' },
    { value: '9211', label: 'Court Costs, Including Alimony and Child Support - 9211' },
    { value: '9223', label: 'Bail and Bond Payments - 9223' },
    { value: '9311', label: 'Tax Payments - 9311' },
    { value: '9402', label: 'Postal Services - 9402' },
    // Add more MCC codes as needed from the Stripe Issuing MCC Categories
  ];

  export interface MCCoption {
    value: string;
    label: string;
  }
  
// MCC Select Component
const MCCSelect: React.FC<{ onChange: (option: MCCoption) => void }> = ({ onChange }) => {
  return (
      <Select
        id="mcc"
        name="mcc"
        options={mccOptions}
        onChange={onChange}
        placeholder="Select or search MCC..."
        className="mt-1"
        classNamePrefix="react-select"
      />
  );
};

export default MCCSelect;
