"use client";
import { useState, useEffect } from "react";
import { TbSearch } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setJobType,
  setCareer,
  selectQuery,
  selectJobType,
  selectCareer,
} from "@/Context/features/search/searchSlice";
import { getCareer, getJobType } from "@/app/api/provider/api";

// const industries = [
//   { id: 0, name: "All Industries" },
//   { id: 1, name: "Design & Creative" },
//   { id: 2, name: "Development" },
//   { id: 3, name: "Marketing & Branding" },
// ];

// const types = [
//   { id: 0, name: "Job Type" },
//   { id: 1, name: "Full-Time" },
//   { id: 2, name: "Part-Time" },
//   { id: 3, name: "Freelance" },
// ];

const SearchBox = () => {
  const [industries, setIndustries] = useState([]);
  const [types, setTypes] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const dispatch = useDispatch();
  const [type, setType] = useState(searchParams.get("jobType") || "Job Type");
  const [caree, setCaree] = useState(
    searchParams.get("career") || "All Industries"
  );
  const keyword = useSelector(selectQuery);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const industryData = await getCareer();
        const jobTypeData = await getJobType();
        const firstIndustry = {id: 0, name:"All Industries"}
        const firstJobType = {id: 0, name:"Job Type"}
        setIndustries([firstIndustry,...industryData.data]);
        setTypes([firstJobType,...jobTypeData.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    params.set("page", "1");
    if (keyword) {
      params.set("query", keyword);
      dispatch(setQuery(keyword));
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleIndustryChange = (event) => {
    const selectedIndustry = event.target.value;
    dispatch(setCareer(selectedIndustry));
    setCaree(selectedIndustry);
    if (selectedIndustry === 0 || selectedIndustry === "0") {
      params.delete("career");
    } else {
      params.set("career", selectedIndustry);
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    dispatch(setJobType(selectedType));
    setType(selectedType);
    if (selectedType !== "Job Type") {
      params.set("jobType", selectedType);
      params.set("page", "1");
    } else {
      params.delete("jobType");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="form-find mt-10 animate__animated animate__fadeIn">
      <form onSubmit={handleSearch} className="flex w-full">
        <div className="box-industry">
          <select
            className="form-input mr-10 input-industry text-gray-500"
            value={caree}
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
            value={type}
            onChange={handleTypeChange}
          >
            {types.map((type) => (
              <option
                key={type.id}
                value={type.name}
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
            onChange={(e) => dispatch(setQuery(e.target.value))}
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
