"use client";
import { useState } from "react";
import ListJob from "@/components/content/listJob";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPosition,
  selectExperience,
  selectEducation,
  selectMinSalary,
  selectMaxSalary,
  selectDate,
  setPosition,
  setExperience,
  setEducation,
  setMinSalary,
  setMaxSalary,
  setDate,
} from "@/Context/features/search/searchSlice";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const JobArea = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const dispatch = useDispatch();
  const positions = useSelector(selectPosition);
  const experiences = useSelector(selectExperience);
  const educations = useSelector(selectEducation);
  const date = useSelector(selectDate);
  const minSalary = useSelector(selectMinSalary);
  const maxSalary = useSelector(selectMaxSalary);
  const [day, setDay] = useState(searchParams.get("date") || "All");
  const [position, setPositions] = useState(
    searchParams.get("position")?.split(",") || []
  );
  const [education, setEducations] = useState(
    searchParams.get("education")?.split(",") || []
  );
  const [experience, setExperiences] = useState(
    searchParams.get("experience")?.split(",") || []
  );
  const [min, setMin] = useState(searchParams.get("minSalary") || 1);
  const [max, setMax] = useState(searchParams.get("maxSalary") || 200);

  const dateType = [
    { id: 1, label: "All" },
    { id: 2, label: "1 day" },
    { id: 3, label: "3 days" },
    { id: 4, label: "7 days" },
    { id: 5, label: "30 days" },
  ];
  const positionData = [
    { id: 1, label: "Frehser" },
    { id: 2, label: "Junior" },
    { id: 3, label: "Senior" },
    { id: 4, label: "Manager" },
    { id: 5, label: "Director" },
  ];
  const experienceData = [
    { id: 1, label: "Less than one year" },
    { id: 2, label: "One to three years" },
    { id: 3, label: "Three to five years" },
    { id: 4, label: "Five to Ten years" },
    { id: 5, label: "More than 10 years" },
  ];
  const educationData = [
    { id: 1, label: "High School" },
    { id: 2, label: "Associate Degree" },
    { id: 3, label: "Bachelor's Degree" },
    { id: 4, label: "Master's Degree" },
    { id: 5, label: "Doctorate Degree" },
  ];
  const handleSetMin = (e) => {
    const newMinSalary = Number(e.target.value);
    if (newMinSalary <= maxSalary) {
      setMin(newMinSalary);
    }
  };

  const handleSetMax = (e) => {
    const newMaxSalary = Number(e.target.value);
    if (newMaxSalary >= minSalary) {
      setMax(newMaxSalary);
    }
  };
  const applyFilter = () => {
    if (max === 200) {
      params.delete("maxSalary");
    }
    else {
      dispatch(setMaxSalary(max));
      params.set("maxSalary", max);
    } 

    if(min === 1){
      params.delete("minSalary");
    }
    else{
      dispatch(setMinSalary(min));
      params.set("minSalary", min);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const handlePositionChange = (event) => {
    const { value, checked } = event.target;
    const updatedPositions = checked
      ? [...positions, value]
      : positions.filter((item) => item !== value);

    dispatch(setPosition(updatedPositions));
    setPositions(updatedPositions);
    params.set("position", updatedPositions.join(","));
    if (updatedPositions.length === 0) {
      params.delete("position");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleExperienceChange = (event) => {
    const { value, checked } = event.target;
    const updatedExperiences = checked
      ? [...experiences, value]
      : experiences.filter((item) => item !== value);

    dispatch(setExperience(updatedExperiences));
    setExperiences(updatedExperiences);
    params.set("experience", updatedExperiences.join(","));
    if (updatedExperiences.length === 0) {
      params.delete("experience");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleEducationChange = (event) => {
    const { value, checked } = event.target;
    const updatedEducations = checked
      ? [...educations, value]
      : educations.filter((item) => item !== value);

    dispatch(setEducation(updatedEducations));
    setEducations(updatedEducations);
    params.set("education", updatedEducations.join(","));
    if (updatedEducations.length === 0) {
      params.delete("education");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    dispatch(setDate(value));
    setDay(value);
    params.set("date", value);
    if (value === "All") {
      params.delete("date");
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <section className="section-box mt-[100px] mb-5">
      <div className="max-w-[1450px] mx-auto sm:px-4">
        <div className="flex flex-wrap">
          <div class="lg:w-3/12 md:w-full sm:block hidden">
            <div className="sidebar-shadow none-shadow mb-5">
              <div className="mt-1 px-2">
                <div className="filter-block head-border mb-5">
                  <h5>
                    Advance Filter
                    <a href="/jobs" className="link-reset">
                      Reset
                    </a>
                  </h5>
                </div>
                <div className="filter-block mb-5 bottom-line pb-5">
                  <h5 className="mb-4">Salary Range</h5>
                  <div className="relative salary-range">
                    <input
                      type="range"
                      className="custom-range thumb-left relative "
                      min="1"
                      max="200"
                      step="1"
                      value={min}
                      onChange={handleSetMin}
                    />
                    <input
                      type="range"
                      className="custom-range range-0-2-16 thumb-right"
                      min="1"
                      max="200"
                      step="1"
                      value={max}
                      onChange={handleSetMax}
                    />
                    <div
                      className="track-0-2-17"
                      style={{
                        left: `${min / 2}%`,
                        width: `${max / 2 - min / 2}%`,
                      }}
                    ></div>
                    <div className="flex items-center justify-content ml-[120px]">
                      <Button variant="blue" size="sm" onClick={applyFilter}>
                        Apply
                      </Button>
                    </div>

                    <div class="flex items-center px-10 justify-around">
                      <div class="flex-grow text-center">
                        <p className="text-xs pb-2">MIN</p>
                        <div className="input-group">
                          <div className="form-control">{min}</div>
                          <span className="input-group-text">dollar</span>
                        </div>
                      </div>
                      <span className="mt-2 mr-3">-</span>
                      <div class="flex-grow text-center">
                        <p className="text-xs pb-2">MAX</p>
                        <div className="input-group">
                          <div className="form-control">{max}</div>
                          <span className="input-group-text">dollar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="filter-block mb-5">
                  <h5 className="medium-heading mb-2">Job Posted</h5>
                  <div className="mb-1 relative form-group">
                    <ul className="list-checkbox bottom-line">
                      {dateType.map((checkbox) => (
                        <li
                          key={checkbox.id}
                          className="flex flex-row-reverse items-center justify-end"
                        >
                          <label
                            className="cb-container text-small basis-5"
                            htmlFor={checkbox.label}
                          >
                            {checkbox.label}
                          </label>
                          <input
                            className="basis-6"
                            type="checkbox"
                            value={checkbox.label}
                            checked={day === checkbox.label}
                            onChange={handleDateChange}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="filter-block mb-5">
                  <h5 className="medium-heading mb-2">Position</h5>
                  <div className="mb-1 relative form-group">
                    <ul className="list-checkbox bottom-line">
                      {positionData.map((checkbox) => (
                        <li
                          key={checkbox.id}
                          className="flex flex-row-reverse items-center justify-end"
                        >
                          <label
                            className="cb-container text-small basis-5"
                            htmlFor={checkbox.label}
                          >
                            {checkbox.label}
                          </label>
                          <input
                            className="basis-6"
                            type="checkbox"
                            value={checkbox.label}
                            checked={position.includes(checkbox.label)}
                            onChange={handlePositionChange}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="filter-block mb-5">
                  <h5 className="medium-heading mb-2">Experience</h5>
                  <div className="mb-1 relative form-group">
                    <ul className="list-checkbox bottom-line">
                      {experienceData.map((checkbox) => (
                        <li
                          key={checkbox.id}
                          className="flex flex-row-reverse items-center justify-end"
                        >
                          <label
                            className="cb-container text-small "
                            htmlFor={checkbox.label}
                          >
                            {checkbox.label}
                          </label>
                          <input
                            className="basis-5"
                            type="checkbox"
                            value={checkbox.label}
                            checked={experience.includes(checkbox.label)}
                            onChange={handleExperienceChange}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="filter-block mb-5">
                  <h5 className="medium-heading mb-2">Education</h5>
                  <div className="mb-1 relative form-group">
                    <ul className="list-checkbox">
                      {educationData.map((checkbox) => (
                        <li
                          key={checkbox.id}
                          className="flex flex-row-reverse items-center justify-end"
                        >
                          <label
                            className="cb-container text-small"
                            htmlFor={checkbox.label}
                          >
                            {checkbox.label}
                          </label>
                          <input
                            className="basis-5"
                            type="checkbox"
                            value={checkbox.label}
                            checked={education.includes(checkbox.label)}
                            onChange={handleEducationChange}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ListJob />
        </div>
      </div>
    </section>
  );
};

export default JobArea;
