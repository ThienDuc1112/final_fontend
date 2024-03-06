"use client";
import { useState, useEffect, useCallback } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MyTextArea from "@/components/myTextArea";
import { Button } from "@/components/ui/button";
import MyDialog from "@/components/myDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  selectExperiences,
  setExperiences,
} from "@/Context/features/resume/resumeSlice";

export default function WorkingExperience({ setCheck, isValid }) {
  const dispatch = useDispatch();
  const experiences = useSelector(selectExperiences);

  const validateExperience = (experience) => {
    const { company, title, startDate, endDate, responsibility } = experience;
  
    const companyError = company === "" || company === null;
    const titleError = title === "" || title === null;
    const startTimeError = startDate === null;
    const endTimeError = endDate === null;
    const responsibilityError = !responsibility;
  
    return {
      ...experience,
      companyError,
      titleError,
      startTimeError,
      endTimeError,
      responsibilityError,
    };
  };

  const checkValid = () => {
    return experiences.every((experience) => {
      return (
        experience.companyError === false &&
        experience.titleError === false &&
        experience.startTimeError === false &&
        experience.endTimeError === false &&
        experience.responsibilityError === false
      );
    });
  };

  const handleCheckChange = useCallback(() => {
    const validatedExperiences = experiences.map((experience) => validateExperience(experience));
    const hasDifference = validatedExperiences.some((exp, index) => 
      exp.companyError !== experiences[index].companyError ||
      exp.titleError !== experiences[index].titleError ||
      exp.startTimeError !== experiences[index].startTimeError ||
      exp.endTimeError !== experiences[index].endTimeError ||
      exp.responsibilityError !== experiences[index].responsibilityError
    );
  
    if (hasDifference) {
      dispatch(setExperiences(validatedExperiences));
    }
  }, [dispatch, experiences]);
  

  useEffect(() => {
    handleCheckChange();
    const data = checkValid();
    isValid(data);
  }, [setCheck, isValid]);

  const handleChange = (index, field, value) => {
    const updatedExperiences = experiences.map((exp, idx) => 
    idx === index ? { ...exp, [field]: value } : exp
  );
  dispatch(setExperiences(updatedExperiences));
  };

  const handleAddExperience = () => {
    const newExperience = {
      company: "",
      title: "",
      startDate: null,
      endDate: null, 
      responsibility: "",
      companyError: false,
      titleError: false,
      startTimeError: false,
      endTimeError: false,
      responsibilityError: false,
    };
    const updatedExperiences = [...experiences, newExperience];
    dispatch(setExperiences(updatedExperiences));
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = experiences.filter((_, idx) => idx !== index);
  dispatch(setExperiences(updatedExperiences));
  };

  return (
    <div className="personal-intro mt-5">
      <h3 className="title-resume">Working Experience</h3>
      <div className="section-form" style={{ paddingLeft: "0px" }}>
        {experiences.map((experience, index) => (
          <div key={index} className="flex flex-wrap flex-col ml-10">
            {index >= 1 && (
              <>
                <div className="border border-gray-400 mb-5"></div>
                <div className="flex justify-end px-5">
                  <MyDialog
                    color="destructive"
                    name="Delete"
                    handleConfirm={() => handleRemoveExperience(index)}
                  ></MyDialog>
                </div>
              </>
            )}
            <div className="flex mb-6 max-w-[550px]">
              <div className="ant-form-item-label pt-3">
                <Label className="ant-form-item-required pt-5">
                  Company Name
                </Label>
              </div>
              <div className="w-full">
                <Input
                  type="text"
                  value={experience.company}
                  onChange={(e) =>
                    handleChange(index, "company", e.target.value)
                  }
                  className="border-gray-700"
                />
                {experience.companyError && (
                  <span className="text-red-500 text-sm">
                    company is required
                  </span>
                )}
              </div>
            </div>

            <div className="flex mb-6 max-w-[550px]">
              <div className="ant-form-item-label pt-3">
                <Label className="ant-form-item-required pt-5">
                  Your Position
                </Label>
              </div>
              <div className="w-full">
                <Input
                  type="text"
                  value={experience.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="border-gray-700"
                />
                {experience.titleError && (
                  <span className="text-red-500 text-sm">
                    title is required
                  </span>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="flex mb-6 max-w-[550px]">
                <div className="ant-form-item-label pt-3">
                  <Label className="ant-form-item-required pt-5">
                    Start Date
                  </Label>
                </div>
                <div className="flex flex-col">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={experience.startDate}
                      onChange={(value) =>
                        handleChange(index, "startDate", value.$d)
                      }
                    />
                  </LocalizationProvider>
                  {experience.startTimeError && (
                    <span className="text-red-500 text-sm">
                      Start Date is required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex mb-6 max-w-[550px]">
                <div
                  className="ant-form-item-label pt-3"
                  style={{ paddingBottom: "5px", paddingLeft: "20px" }}
                >
                  <Label className="ant-form-item-required">End Date</Label>
                </div>
                <div className="flex flex-col">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={experience.endDate}
                      onChange={(value) =>
                        handleChange(index, "endDate", value.$d)
                      }
                    />
                  </LocalizationProvider>
                  {experience.endTimeError && (
                    <span className="text-red-500 text-sm">
                      End Date is required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex mb-6 max-w-[550px]">
              <div className="ant-form-item-label pt-[100px]">
                <Label className="ant-form-item-required pt-5">
                  Your Responsibility
                </Label>
              </div>
              <div className="flex flex-col">
                <MyTextArea
                  onTextChange={(value) =>
                    handleChange(index, "responsibility", value)
                  }
                />
                {experience.responsibilityError && (
                  <span className="text-red-500 text-sm">
                    Responsibility is required
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <div className="px-5">
            <Button variant="blue" onClick={handleAddExperience}>
              Add new experience
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
