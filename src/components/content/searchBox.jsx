"use client";
import { useState } from "react";
import { TbSearch } from "react-icons/tb";
import { Button } from "@/components/ui/button";

const industries = [
  { id: 0, name: "All Industries" },
  { id: 1, name: "Design & Creative" },
  { id: 2, name: "Development" },
  { id: 3, name: "Marketing & Branding" },
];

const types = [
  { id: 0, name: "Job Type" },
  { id: 1, name: "Full-Time" },
  { id: 2, name: "Part-Time" },
  { id: 3, name: "Freelance" },
];

const SearchBox = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const [keyword, setKeyword] = useState("");

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
    console.log(selectedIndustry);
  };
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    console.log(selectedType);
  };
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="form-find mt-10 animate__animated animate__fadeIn">
      <form action="" className="flex w-full">
        <div className="box-industry">
          <select
            className="form-input mr-10 input-industry text-gray-500"
            value={selectedIndustry}
            onChange={handleIndustryChange}
          >
            {industries.map((industry) => (
              <option
                key={industry.id}
                value={industry.id}
                style={{
                  color: "gray",
                }}
              >
                {industry.name}
              </option>
            ))}
          </select>
        </div>
        <div className="box-industry">
          <select
            className="form-input mr-10 select-active input-type text-gray-500"
            value={selectedType}
            onChange={handleTypeChange}
          >
            {types.map((type) => (
              <option
                key={type.id}
                value={type.id}
                style={{
                  color: "gray",
                }}
              >
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative flex items-center w-full ml-3">
          <TbSearch
            className="text-gray-400"
            style={{
              width: "24px",
              height: "24px",
              position: "absolute",
            }}
          />
          <input
            type="text"
            placeholder="Your keywords..."
            value={keyword}
            onChange={handleKeywordChange}
            className="form-input input-keysearch mr-5 text-gray-500 text-sm"
          />
        </div>
        <Button size="lg" variant="blue">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBox;
