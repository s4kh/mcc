// Import React and React Select
import React from 'react';
import Select, { SingleValue } from 'react-select';
// Predefined MCC Data (as an example)
// Predefined MCC Data based on Stripe Issuing Categories
export const mccOptions = [
  { value: '5411', label: 'Grocery Stores - 5411' },
  { value: '5541', label: 'Service Stations - 5541' },
  { value: '5542', label: 'Automated Fuel - 5542' },
  { value: '5812', label: 'Restaurants - 5812' },
  { value: '5813', label: 'Bars/Clubs - 5813' },
  { value: '5814', label: 'Fast Food - 5814' },
  { value: '5912', label: 'Drug Stores - 5912' },
  { value: '5999', label: 'Specialty Retail - 5999' },
  { value: '5942', label: 'Book Stores - 5942' },
  { value: '5977', label: 'Cosmetics - 5977' },
  { value: '5300', label: 'Wholesale Clubs - 5300' },
  { value: '4111', label: 'Commuter Transport - 4111' },
  { value: '4814', label: 'Telecommunication - 4814' },
  { value: '5732', label: 'Electronics - 5732' },
  { value: '7011', label: 'Hotels/Motels - 7011' },
  { value: '4722', label: 'Travel Agencies - 4722' },
  { value: '5816', label: 'Digital Goods - 5816' },
  { value: '7372', label: 'Computer Services - 7372' },
  { value: '7623', label: 'Appliance Repair - 7623' },
  { value: '8398', label: 'Charitable Services - 8398' },
  { value: '9399', label: 'Government Services - 9399' },
  { value: '4784', label: 'Tolls/Bridge Fees - 4784' },
  { value: '4900', label: 'Utilities - 4900' },
  { value: '7299', label: 'Personal Services - 7299' },
  { value: '8699', label: 'Memberships - 8699' },
  { value: '7996', label: 'Amusement Parks - 7996' },
  { value: '8211', label: 'Elementary Schools - 8211' },
  { value: '8244', label: 'Business Schools - 8244' },
  { value: '8249', label: 'Vocational Schools - 8249' },
  { value: '9211', label: 'Court Costs - 9211' },
  { value: '9223', label: 'Bail Bonds - 9223' },
  { value: '9311', label: 'Tax Payments - 9311' },
  { value: '9402', label: 'Postal Services - 9402' },
]

  export interface MCCoption {
    value: string;
    label: string;
  }
  
// MCC Select Component
const MCCSelect: React.FC<{ onChange: (option: SingleValue<MCCoption>) => void }> = ({ onChange }) => {
  return (
      <Select
        id="mcc"
        name="mcc"
        options={mccOptions}
        onChange={onChange}
        placeholder="Select or search MCC..."
        className="mt-1"        
        classNamePrefix="react-select"
        styles={{control: (base) => ({...base, height: '41px'})}}
      />
  );
};

export default MCCSelect;
