"use client";
import { useState, useRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MyTextArea from "@/components/myTextArea";
import { Button } from "@/components/ui/button";
import MyDialog from "@/components/myDialog";

export default function WorkingExperience({ onChangeData }) {
  const [experiences, setExperiences] = useState([
    {
      company: "",
      title: "",
      startTime: null,
      endTime: null,
      responsibility: "",
    },
  ]);
  const handleChange = (index, field, value) => {
    setExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index][field] = value;
      return updatedExperiences;
    });

    // Call the onChange callback to pass the updated experiences data
    onChangeData(experiences);
  };

  const handleAddExperience = () => {
    setExperiences((prevExperiences) => [
      ...prevExperiences,
      {
        company: "",
        title: "",
        startTime: "",
        endTime: "",
        responsibility: "",
      },
    ]);
    onChangeData(experiences);
  };

  const handleRemoveExperience = (index) => {
    setExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences].slice(index, 1);
      return updatedExperiences;
    });
    onChangeData(experiences);
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
                    handleConfirm={handleRemoveExperience}
                  ></MyDialog>
                </div>
              </>
            )}
            <div className="flex items-center mb-6 max-w-[550px]">
              <div className="ant-form-item-label">
                <Label className="ant-form-item-required pt-5">
                  Company Name
                </Label>
              </div>
              <Input
                type="text"
                value={experience.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                className="border-gray-700"
              />
            </div>

            <div className="flex items-center mb-6 max-w-[550px]">
              <div className="ant-form-item-label">
                <Label className="ant-form-item-required pt-5">
                  Your Position
                </Label>
              </div>
              <Input
                type="text"
                value={experience.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="border-gray-700"
              />
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={experience.startTime}
                    onChange={(value) =>
                      handleChange(index, "startTime", value.$d)
                    }
                  />
                </LocalizationProvider>
              </div>
              <div className="flex items-center mb-6 max-w-[550px]">
                <div
                  className="ant-form-item-label"
                  style={{ paddingBottom: "5px", paddingLeft: "20px" }}
                >
                  <Label className="ant-form-item-required">End time</Label>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={experience.endTime}
                    onChange={(value) =>
                      handleChange(index, "endTime", value.$d)
                    }
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="flex mb-6 max-w-[550px]">
              <div className="ant-form-item-label">
                <Label className="ant-form-item-required pt-5">
                  Your Responsibilities
                </Label>
              </div>
              <MyTextArea
                onTextChange={(value) =>
                  handleChange(index, "responsibility", value)
                }
              />
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
