"use client";
import { useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { MdLanguage } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneSelection from "@/components/content/phoneSelection";
import DropdownInput from "@/components/content/dropdownInput";
import Flag from "react-country-flag";
import phoneList from "@/utils/phoneDatabase";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MyTextArea from "@/components/myTextArea";
import MyModel from "@/components/myModel";
import WorkingExperience from "@/components/content/workingExperience";
import SkillResume from "@/components/content/skillResume";

export default function Create() {
  const avatarRef = useRef(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("+1");
  const [flag, setFlag] = useState("US");
  const [gender, setGender] = useState("male");
  const [country, setCountry] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [linkedln, setLinkedl] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [experiences, setExperiences] = useState([
    {
      company: "",
      title: "",
      startTime: null,
      endTime: null,
      responsibility: "",
    },
  ]);
  console.log(experiences);

  const statusList = [
    { name: "Open to Opportunities" },
    { name: "Not Currently Seeking" },
    { name: "Employed - Not Open to Offers" },
  ];

  const handleSetPhoneCountry = (countryCode, countryFlag) => {
    setShow(false);
    setPhoneCountry(countryCode);
    setFlag(countryFlag);
  };
  return (
    <section className="section-box mt-[10px] mb-5">
      <div className="max-w-[1800px] mx-auto">
        <div className="border-b pt-3 border-black"></div>
        <div className="flex flex-wrap">
          <div className="sidebar-left is-fixed w-1/3">
            <div className="area-title ml-[90px]">
              <h3 className="text-blue-600 font-bold mb-4">Main Information</h3>
              <ul className="list-title">
                <li>
                  <div className="panel">
                    <FaUser />
                    <p className="text pl-5">Personal Information</p>
                  </div>
                </li>
                <li>
                  <div className="panel">
                    <FaEdit />
                    <p className="text pl-5">Introduce Yourself</p>
                  </div>
                </li>
                <li>
                  <div className="panel">
                    <FaStar />
                    <p className="text pl-5">Skills And Knowledge</p>
                  </div>
                </li>
                <li>
                  <div className="panel">
                    <FaSuitcase />
                    <p className="text pl-5">Working Experience</p>
                  </div>
                </li>
                <li>
                  <div className="panel">
                    <PiStudentFill />
                    <p className="text pl-5">Education</p>
                  </div>
                </li>
                <li>
                  <div className="panel">
                    <MdLanguage />
                    <p className="text pl-5">Languages</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-2/3 make-cv-content is-scrolling">
            <div className="block py-3 px-5">
              <div className="form">
                <div className="personal-detail mt-5">
                  <h3 className="title-resume">Personal Details</h3>
                  <div className="section-form">
                    <div className="flex flex-wrap flex-col ml-10">
                      <div className="flex items-center mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label className="ant-form-item-required">
                            Full Name
                          </Label>
                        </div>
                        <Input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="border-gray-700"
                          placeholder="Enter your full name..."
                        />
                      </div>
                      <div className="flex items-center mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label className="ant-form-item-required">
                            Title
                          </Label>
                        </div>
                        <Input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          className="border-gray-700"
                          placeholder="Enter your title..."
                        />
                      </div>
                      <div className="flex items-center mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label className="ant-form-item-required">
                            Email
                          </Label>
                        </div>
                        <Input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="border-gray-700"
                          placeholder="Enter your email..."
                        />
                      </div>
                      <div className="flex items-center mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label className="ant-form-item-required">
                            Country
                          </Label>
                        </div>
                        <Input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                          className="border-gray-700"
                          placeholder="Enter your country..."
                        />
                      </div>
                      <div className="flex items-center mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label className="ant-form-item-required">
                            Linkedln
                          </Label>
                        </div>
                        <Input
                          type="text"
                          value={linkedln}
                          onChange={(e) => setLinkedl(e.target.value)}
                          required
                          className="border-gray-700"
                          placeholder="https://lk.id/username"
                        />
                      </div>
                      <div className="flex items-center mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label className="ant-form-item-required">
                            Avatar
                          </Label>
                        </div>
                        <Input
                          type="file"
                          value={avatarUrl}
                          onChange={(e) => setAvatarUrl(e.target.value)}
                          ref={avatarRef}
                          required
                          className="border-gray-700"
                          placeholder="Upload your avatar..."
                        />
                      </div>
                      <div className="flex items-center mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label className="ant-form-item-required">
                            Phone Number
                          </Label>
                        </div>
                        <div className="relative">
                          <div className="h-input bg-white rounded-lg border border-gray-100 px-4 flex items-center gap-3">
                            <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer h-full">
                              <Flag
                                countryCode={flag}
                                svg
                                onClick={(e) => setShow(true)}
                              />
                              <span className="text-gray-300">|</span>
                              <span className="text-gray-800">
                                {phoneCountry}
                              </span>
                            </div>
                            <Input
                              type="text"
                              className="border-gray-700"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="000000000"
                              maxLength={9}
                            />
                          </div>
                          {show && (
                            <PhoneSelection
                              phoneList={phoneList}
                              onCountrySelect={handleSetPhoneCountry}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label className="ant-form-item-required">
                            Gender
                          </Label>
                        </div>
                        <div className="flex">
                          <button
                            className={`rounded p-2 mr-2 ${
                              gender === "male"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => setGender("male")}
                          >
                            Male
                          </button>
                          <button
                            className={`rounded p-2 mr-2 ${
                              gender === "female"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => setGender("female")}
                          >
                            Female
                          </button>
                          <button
                            className={`rounded p-2 mr-2 ${
                              gender === "na"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => setGender("na")}
                          >
                            N/A
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label className="ant-form-item-required">
                            Date Of Birth
                          </Label>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Select Date"
                            value={dateOfBirth}
                            slotProps={{
                              textField: {
                                helperText: "MM/DD/YYYY",
                              },
                            }}
                            onChange={(e) => setDateOfBirth(e)}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="flex items-center mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label className="ant-form-item-required">
                            Employment Status
                          </Label>
                        </div>
                        <DropdownInput
                          MyLabel=""
                          DataList={statusList}
                          onDataSelect={(e) => setStatus(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="personal-intro mt-5">
                  <div className="flex items-center justify-between max-w-[850px] ">
                    <h3 className="title-resume">Introduce Yourself</h3>
                    <MyModel />
                  </div>
                  <div className="section-form">
                    <div className="flex flex-wrap flex-col ml-10">
                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label className="ant-form-item-required pt-5">
                            Description
                          </Label>
                        </div>
                        <MyTextArea
                          onTextChange={(value) => setDescription(value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
               <WorkingExperience onChangeData={(experiences) => setExperiences(experiences)}/>
               <SkillResume />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
