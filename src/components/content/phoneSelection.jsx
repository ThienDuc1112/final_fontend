import React,{useState} from "react";
import Flag from "react-country-flag";
import { GoSearch } from "react-icons/go";

const PhoneSelection = ({ phoneList, onCountrySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredPhoneList = phoneList.filter((c) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="absolute bg-white w-full mt-2 border border-gray-100 rounded-lg z-30">
      <div className="flex items-center px-4 border-b border-gray-100 gap-3">
      <GoSearch className="text-gray-400" />
        <input
          onChange={handleChangeSearchTerm}
          value={searchTerm}
          type="text"
          className="outline-none h-10 w-full text-sm"
          placeholder="Search for country"
        />
      </div>
      <div className="max-h-64 overflow-auto">
        {filteredPhoneList.map((country, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-3 gap-2 text-sm cursor-pointer hover:bg-gray-50"
            onClick={() => onCountrySelect(country.dial_code,country.code)}
          >
            <Flag countryCode={country.code} svg /> {country.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhoneSelection;