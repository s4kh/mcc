'use client';
import { useCallback, useState } from "react";
import { useReCaptcha } from "next-recaptcha-v3";
import MCCSelect, { MCCoption } from "@/app/components/MccSelect";
import Link from "next/link";
import { MoveLeft, ShieldX } from "lucide-react";
import { SingleValue } from "react-select";

export interface MCCForm  {
  merchantName: string;
  mcc: string;
  location:string;
  cardType: string;
  cardUsed: string;
  captcha?:string;
}

export default function MCCCreatePage() {
  const [mcc, setMcc] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [location, setLocation] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardUsed, setCardUsed] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [errors, setErrors] = useState<MCCForm |null>(null);
  const { executeRecaptcha } = useReCaptcha();

  const handleMCCChange = (option: SingleValue<MCCoption>) => {
    setMcc(option?.value || "");
  };

  const handleSubmit = useCallback(
    async(e: React.FormEvent<HTMLFormElement>) => {
      setFormMessage("");
      setErrors(null);
      e.preventDefault();
      const token = await executeRecaptcha("form_submit");
      const res = await fetch('/api/', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ mcc, merchantName, location, cardType, cardUsed, token }),          
      });
      if (res.status === 400) {
        const result = await res.json();
        console.error('Validation Errors:', result.errors);
        setErrors(result.errors); // Update state to display errors in the form
      } else if (res.ok) {
        const result = await res.json();
        setFormMessage(result.message)
      }
    }, 
    [executeRecaptcha, merchantName, mcc, location, cardType, cardUsed],
  );


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <div className="flex justify-between mb-4">
        <Link href={"/"}>
          <button 
            className="text-primary hover:bg-gray-100 py-2 px-4 rounded border border-primary"
          >
            <MoveLeft />
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">Submit a Merchant Category</h1>      
      
      {/* Note Section */}
      <div className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium"></span> We’re crowdsourcing this information. Please enter valid details based on your credit card statement. Thank you for your contribution!
        </div>
      </div>

      {/* Form for submitting MCC */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {formMessage && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-50 rounded-lg" role="alert">
            {formMessage}
          </div>
        )}
        {errors?.captcha && (
          <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-50 rounded-lg" role="alert">
            <ShieldX size={20} />            
            <span className="font-medium ml-2">{errors.captcha}</span>
          </div>
        )}
        {/* Merchant Name Field */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label htmlFor="merchantName" className="block text-sm font-medium text-gray-700">
              Merchant Name
            </label>
            <p className="text-gray-500 text-xs mt-1">Note that Walmart and Walmart Supercentres are considered different merchants.</p>
            <input
              type="text"
              id="merchantName"
              name="merchantName"
              value={merchantName}
              onChange={(e) => setMerchantName(e.target.value)}
              placeholder="e.g., Walmart"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-[41px]"
            />
            {errors?.merchantName && <p className="text-red-500 text-sm mt-1">{errors.merchantName}</p>}
          </div>

          {/* MCC Field */}
          <div className="col-span-1">
            <label htmlFor="mcc" className="block text-sm font-medium text-gray-700">
              Category Code
            </label>
            <p className="text-gray-500 text-xs mt-1">You can find this on your credit card statement.</p>
            <MCCSelect onChange={handleMCCChange}/>
            {errors?.mcc && <p className="text-red-500 text-sm mt-1">{errors.mcc}</p>}
            {/* <input
              type="text"
              id="mcc"
              name="mcc"
              value={mcc}
              onChange={(e) => setMcc(e.target.value)}
              placeholder="e.g., 5411"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            /> */}
          </div>
        </div>
        {/* Card Type Field */}
        <div className="grid grid-cols-3 gap-4">          

          {/* Card Used for the Purchase Field */}
          <div className="col-span-2">
            <label htmlFor="cardUsed" className="block text-sm font-medium text-gray-700">
              Card Product Name
            </label>
            <p className="text-gray-500 text-xs mt-1">Please enter the card product name as given by your bank (e.g., Amex Cobalt).</p>
            <input
              type="text"
              id="cardUsed"
              name="cardUsed"
              value={cardUsed}
              onChange={(e) => setCardUsed(e.target.value)}
              placeholder="e.g., Scotiabank Momentum Infinite Visa"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-[41px]"
            />
            {errors?.cardUsed && <p className="text-red-500 text-sm mt-1">{errors.cardUsed}</p>}
          </div> 
          <div className="col-span-1">
            <label htmlFor="cardType" className="block text-sm font-medium text-gray-700">
              Card Type
            </label>
            <p className="text-gray-500 text-xs mt-1">Card network or issuer.</p>
            <select
              id="cardType"
              name="cardType"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-[41px] bg-white"
            >
              <option value="" disabled>Select a card type</option>
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
              <option value="amex">American Express</option>
              <option value="discover">Discover</option>
              <option value="other">Other</option>
            </select>
            {errors?.cardType && <p className="text-red-500 text-sm mt-1">{errors.cardType}</p>}
          </div>
        </div>

        {/* Location Field (Optional) */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Merchant Location (Optional)
          </label>
          <p className="text-gray-500 text-xs mt-1">Where is this merchant located? Sometimes based on the location they are categorized differently.</p>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Toronto, ON"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

               
        <div className="flex justify-end items-center gap-4">         
          <button 
            type="submit" 
            className="bg-primary hover:bg-primary-light text-white py-2 px-4 rounded"
          >
            Submit
          </button>          
        </div>       
      </form>
    </div>
  );
}
