import { useState, useEffect, useCallback } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MyTextArea from "@/components/myTextArea";
import { Button } from "@/components/ui/button";
import MyDialog from "@/components/myDialog";
import DropdownInput from "@/components/content/dropdownInput";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEducations,
  setEducations,
} from "@/Context/features/resume/resumeSlice";

export default function Education({ setCheck, isValid }) {
  const educations = useSelector(selectEducations);
  const dispatch = useDispatch();
  const educationData = [
    { id: 1, name: "High School" },
    { id: 2, name: "Associate Degree" },
    { id: 3, name: "Bachelor's Degree" },
    { id: 4, name: "Master's Degree" },
    { id: 5, name: "Doctorate Degree" },
  ];

  const validateEducation = (education) => {
    const { universityName, degree, major, startDate, endDate, description } =
      education;

    const universityError = universityName === "" || universityName === null;
    const degreeError = degree === "" || degree === null;
    const majorError = major === "" || major === null;
    const startDateError = startDate === null;
    const endDateError = endDate === null;
    const descriptionError = description === "" || description === null;

    return {
      ...education,
      universityError,
      degreeError,
      majorError,
      startDateError,
      endDateError,
      descriptionError,
    };
  };

  const checkValid = () => {
    return educations.every((education) => {
      return (
        education.universityError === false &&
        education.degreeError === false &&
        education.majorError === false &&
        education.startDateError === false &&
        education.endDateError === false
      );
    });
  };

  const handleEducationCheckChange = useCallback(() => {
    const updatedEducations = educations.map((education) =>
      validateEducation(education)
    );
    const hasDifference = updatedEducations.some(
      (edu, index) =>
        edu.universityError !== educations[index].universityError ||
        edu.degreeError !== educations[index].degreeError ||
        edu.majorError !== educations[index].majorError ||
        edu.startDateError !== educations[index].startDateError ||
        edu.endDateError !== educations[index].endDateError ||
        edu.descriptionError !== educations[index].descriptionError
    );

    if (hasDifference) {
      dispatch(setEducations(updatedEducations));
    }
  }, [educations]);

  useEffect(() => {
    handleEducationCheckChange();
    const data = checkValid();
    isValid(data);
  }, [setCheck, isValid]);

  const handleChange = (index, field, value) => {
    const updatedEducations = educations.map((education, idx) =>
      idx === index ? { ...education, [field]: value } : education
    );
    dispatch(setEducations(updatedEducations));
  };

  const handleAddEducation = () => {
    const newEducation = {
      resumeId: 0,
      universityName: "",
      degree: "",
      major: "",
      startDate: null,
      endDate: null,
      description: "",
      universityError: false,
      degreeError: false,
      majorError: false,
      startDateError: false,
      endDateError: false,
    };
    const updatedEducations = [...educations, newEducation];
    dispatch(setEducations(updatedEducations));
  };

  const handleRemoveEducation = (index) => {
    const updatedEducations = educations.filter((_, idx) => idx !== index);
    dispatch(setEducations(updatedEducations));
  };

  return (
    <div className="personal-intro mt-5">
      <h3 className="title-resume">Education</h3>
      <div className="section-form" style={{ paddingLeft: "0px" }}>
        {educations.map((education, index) => (
          <div key={index} className="flex flex-wrap flex-col ml-10">
            {index >= 1 && (
              <>
                <div className="border border-gray-400 mb-5"></div>
                <div className="flex justify-end px-5">
                  <MyDialog
                    color="destructive"
                    name="Delete"
                    handleConfirm={() => handleRemoveEducation(index)}
                  />
                </div>
              </>
            )}
            <div className="flex mb-6 max-w-[550px]">
              <div className="ant-form-item-label pt-3">
                <Label className="ant-form-item-required pt-5">
                  University Name
                </Label>
              </div>
              <div className="w-full">
                <Input
                  type="text"
                  value={education.universityName}
                  onChange={(e) =>
                    handleChange(index, "universityName", e.target.value)
                  }
                  className="border-gray-700"
                />
                {education.universityError && (
                  <span className="text-red-500 text-sm">
                    University name is required
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center mb-6 max-w-[550px]">
              <div className="ant-form-item-label">
                <Label className="ant-form-item-required pt-5">Degree</Label>
              </div>
              <div className=" w-full flex flex-col">
                <DropdownInput
                  DataList={educationData}
                  onDataSelect={(value) => handleChange(index, "degree", value)}
                />
                {education.degreeError && (
                  <span className="text-red-500 text-sm">
                    Degree is required
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center mb-6 max-w-[550px]">
              <div className="ant-form-item-label">
                <Label className="ant-form-item-required pt-5">Major</Label>
              </div>
              <div className="w-full">
                <Input
                  type="text"
                  value={education.major}
                  onChange={(e) => handleChange(index, "major", e.target.value)}
                  className="border-gray-700"
                />
                {education.majorError && (
                  <span className="text-red-500 text-sm">
                    Major is required
                  </span>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="flex items-center mb-6 max-w-[550px]">
                <div
                  className="ant-form-item-label"
                  style={{ paddingBottom: "5px" }}
                >
                  <Label className="ant-form-item-required pt-5">
                    Start time
                  </Label>
                </div>
                <div className="w-full flex flex-col">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={education.startDate}
                      onChange={(value) =>
                        handleChange(index, "startDate", value.$d)
                      }
                    />
                  </LocalizationProvider>
                  {education.startDateError && (
                    <span className="text-red-500 text-sm">
                      Start date is required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center mb-6 max-w-[550px]">
                <div
                  className="ant-form-item-label"
                  style={{ paddingBottom: "5px", paddingLeft: "30px" }}
                >
                  <Label className="ant-form-item-required">End time</Label>
                </div>
                <div className="w-full flex flex-col">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={education.endDate}
                      onChange={(value) =>
                        handleChange(index, "endDate", value.$d)
                      }
                    />
                  </LocalizationProvider>
                  {education.endDateError && (
                    <span className="text-red-500 text-sm">
                      End date is required
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex mb-6 max-w-[550px]">
              <div className="ant-form-item-label pt-[80px]">
                <Label className=" pt-5">Description</Label>
              </div>
              <MyTextArea
                onTextChange={(value) =>
                  handleChange(index, "description", value)
                }
              />
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <div className="px-5">
            <Button variant="blue" onClick={handleAddEducation}>
              Add new education
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
