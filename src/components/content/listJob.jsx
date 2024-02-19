"use client";
import { useState } from "react";

const ListJob = () => {
  const [minSalary, setMinSalary] = useState(1);
  const [maxSalary, setMaxSalary] = useState(200);
  const [checkedPositions, setCheckedPositions] = useState([]);
  const [checkedExperiences, setCheckedExperiences] = useState([]);
  const [checkedEducations, setCheckedEducations] = useState([]);

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
      setMinSalary(newMinSalary);
    }
  };

  const handleSetMax = (e) => {
    const newMaxSalary = Number(e.target.value);
    if (newMaxSalary >= minSalary) {
      setMaxSalary(newMaxSalary);
    }
  };

  const handlePositionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedPositions([...checkedPositions, value]);
    } else {
      setCheckedPositions(checkedPositions.filter((item) => item !== value));
    }
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
                      value={minSalary}
                      onChange={handleSetMin}
                    />
                    <input
                      type="range"
                      className="custom-range range-0-2-16 thumb-right"
                      min="1"
                      max="200"
                      step="1"
                      value={maxSalary}
                      onChange={handleSetMax}
                    />
                    <div
                      className="track-0-2-17"
                      style={{
                        left: `${minSalary / 2}%`,
                        width: `${maxSalary / 2 - minSalary / 2}%`,
                      }}
                    ></div>

                    <div class="flex items-center px-10 justify-around">
                      <div class="flex-grow text-center">
                        <p className="text-xs pb-2">MIN</p>
                        <div className="input-group">
                          <div className="form-control">{minSalary}</div>
                          <span className="input-group-text">dollar</span>
                        </div>
                      </div>
                      <span className="mt-2 mr-3">-</span>
                      <div class="flex-grow text-center">
                        <p className="text-xs pb-2">MAX</p>
                        <div className="input-group">
                          <div className="form-control">{maxSalary}</div>
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
                            checked={checkedPositions.includes(checkbox.label)}
                            onChange={handlePositionChange}
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
                            checked={checkedPositions.includes(checkbox.label)}
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
                            checked={checkedPositions.includes(checkbox.label)}
                            onChange={handlePositionChange}
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
                            checked={checkedPositions.includes(checkbox.label)}
                            onChange={handlePositionChange}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListJob;
