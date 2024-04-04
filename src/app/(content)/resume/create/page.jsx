"use client";
import { useState, useRef, useEffect } from "react";
import { FaUser, FaEdit, FaSuitcase, FaStar } from "react-icons/fa";
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
import EducationResume from "@/components/content/educationResume";
import LanguageResume from "@/components/content/languageResume";
import { createResume } from "@/app/api/resume/api";
import { Button } from "@/components/ui/button";
import { SuccessNotify } from "@/components/content/successNotification";
import { useRouter } from "next/navigation";
import TokenService from "@/utils/Token.service";
import { getCareer } from "@/app/api/provider/api";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedSkillList,
  setSelectedSkillList,
  selectSelectedLanguageList,
  setSelectedLanguageList,
  selectExperiences,
  setExperiences,
  selectEducations,
  setEducations,
} from "@/Context/features/resume/resumeSlice";
import dayjs from "dayjs";

export default function Create() {
  const dispatch = useDispatch();
  const selectedSkillList = useSelector(selectSelectedSkillList);
  const selectedLanguageList = useSelector(selectSelectedLanguageList);
  const experiences = useSelector(selectExperiences);
  const educations = useSelector(selectEducations);
  const { userId, role } = TokenService.getUserProfile();
  const router = useRouter();
  const avatarRef = useRef(null);
  const [avatarPath, setAvatarPath] = useState("");
  const formRefs = useRef({});
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [active, setActive] = useState("form1");
  const [formData, setFormData] = useState({
    id: null,
    fullName: "",
    email: "",
    phone: "",
    phoneCountry: "+1",
    flag: "US",
    gender: "male",
    country: "",
    avatarUrl: "",
    dateOfBirth: null,
    status: "",
    description: "",
    linkedln: "",
    title: "",
    careerId: null,
  });
  const [careers, setCareers] = useState(null);
  const [show, setShow] = useState(false);
  const [validExperience, setValidExperience] = useState(false);
  let validSkill = false;
  let validEducation = false;
  let validLanguage = false;

  const [additonalSkill, setAdditionalSkill] = useState("");
  const [fullNameError, setFullNameError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [avatarUrlError, setAvatarUrlError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [careerError, setCareerError] = useState(false);
  const statusList = [
    { name: "Open to Opportunities" },
    { name: "Not Currently Seeking" },
    { name: "Employed - Not Open to Offers" },
  ];

  const handleSetPhoneCountry = (countryCode, countryFlag) => {
    setShow(false);
    setFormData({
      ...formData,
      phoneCountry: countryCode,
      flag: countryFlag,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCareerInfo = await getCareer();
        setCareers(allCareerInfo.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const forms = document.querySelectorAll(".formColor");
      forms.forEach((form) => {
        const rect = form.getBoundingClientRect();

        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setActive(form.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToForm = (formId) => {
    const formRef = formRefs.current[formId];
    if (formRef) {
      formRef.scrollIntoView({ behavior: "smooth" });
    }
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleShowNoti = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const validateData = () => {
    let isValid = true;
    setValidate((prevState) => !prevState);

    if (
      validExperience === false ||
      validEducation === false ||
      validLanguage === false ||
      validSkill === false
    ) {
      isValid = false;
    }

    if (formData.fullName.trim() === "") {
      setFullNameError(true);
      isValid = false;
    } else {
      setFullNameError(false);
    }

    if (formData.title.trim() === "") {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (formData.email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      setEmailError("Email is not valid");
      isValid = false;
    }

    if (formData.phone.trim() === "") {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }

    if (formData.country.trim() === "") {
      setCountryError(true);
      isValid = false;
    } else {
      setCountryError(false);
    }
    if (formData.avatarUrl.trim() === "") {
      setAvatarUrlError(true);
      isValid = false;
    } else {
      setAvatarUrlError(false);
    }

    if (formData.dateOfBirth === null) {
      setDateOfBirthError(true);
      isValid = false;
    } else {
      setDateOfBirthError(false);
    }

    if (formData.status.trim() === "") {
      setStatusError(true);
      isValid = false;
    } else {
      setStatusError(false);
    }

    if (formData.careerId === null) {
      setCareerError(true);
      isValid = false;
    } else {
      setCareerError(false);
    }

    return isValid;
  };
  const updatedEducations = educations.map((education) => {
    return {
      ...education,
      description: education.description.replace(/\n/g, ""),
    };
  });

  const updatedExperiences = experiences.map((experience) => {
    return {
      ...experience,
      responsibility: experience.responsibility.replace(/\n/g, ""),
    };
  });

  const sendImage = async () => {
    try {
      const avatarFile = avatarRef.current.files[0];

      const response = await fetch(
        `/api/images/upload?filename=${avatarFile.name}`,
        {
          method: "POST",
          body: avatarFile,
        }
      );

      const data = await response.json();
      const nameAvatar = data.url.split("/").pop();
      setAvatarPath(nameAvatar);
    } catch (error) {
      console.log(error);
    }
  };

  const sendData = async () => {
    const resumeData = {
      resume: {
        userId: userId,
        careerId: formData.careerId,
        fullName: formData.fullName,
        phoneNumber: formData.phoneCountry + "-" + formData.phone,
        email: formData.email,
        linkedln: formData.linkedln,
        gender: formData.gender,
        country: formData.country,
        dateOfBirth: formData.dateOfBirth,
        statusOfEmployment: formData.status,
        avatarUrl: avatarPath,
        description: formData.description.replace(/\n/g, ""),
        title: formData.title,
        AdditionalSkills: "Java Spring, Ms SQL",
      },
      educations: updatedEducations,
      experiences: updatedExperiences,
      skillOfResumes: selectedSkillList,
      languageOfResumes: selectedLanguageList,
    };
    try {
      const response = await createResume(resumeData);
      console.log(response);
      if (!response.data.success && response.data.success !== undefined) {
        handleShowNoti();
        console.log(response.data.success);
      }
      if (response.data.length > 0) {
        const success = response.data.every((item) => item.success);
        if (success) {
          console.log("succ");
          router.push(`/resumeDetail/${response.data[0].id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (avatarPath !== "") {
      sendData();
    }
  }, [avatarPath]);

  const handleTrans = () => {
    const isValid = validateData();
    if (isValid) {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await sendImage();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-box mt-[10px] relative">
      <div className="max-w-[1800px] mx-auto">
        <div className="border-b pt-3 border-black"></div>
        <div className="flex flex-wrap bg relative">
          <div className="sidebar-left is-fixed w-1/3">
            {showToast && (
              <div className="animate-slide-up is-fixed absolute z-10 top-[1px] left-0 p-7">
                <SuccessNotify
                  message="Please ensure all data is correct"
                  variant="destructive"
                />
              </div>
            )}
            <div className="area-title ml-[90px]">
              <h3 className="text-blue-600 font-bold mb-4">Main Information</h3>
              <ul className="list-title">
                <li
                  className={`list-title-item ${
                    active === "form1" && "active"
                  }`}
                >
                  <div
                    className="panel"
                    onClick={() => {
                      setActive("form1");
                      scrollToForm("form1");
                    }}
                  >
                    <FaUser />
                    <p className="text pl-5">Personal Details</p>
                  </div>
                </li>
                <li
                  className={`list-title-item ${
                    active === "form2" && "active"
                  }`}
                >
                  <div
                    className="panel"
                    onClick={() => {
                      setActive("form2");
                      scrollToForm("form2");
                    }}
                  >
                    <FaEdit />
                    <p className="text pl-5">Introduce Yourself</p>
                  </div>
                </li>
                <li
                  className={`list-title-item ${
                    active === "form3" && "active"
                  }`}
                >
                  <div
                    className="panel"
                    onClick={() => {
                      setActive("form3");
                      scrollToForm("form3");
                    }}
                  >
                    <FaSuitcase />
                    <p className="text pl-5">Working Experience</p>
                  </div>
                </li>
                <li
                  className={`list-title-item ${
                    active === "form4" && "active"
                  }`}
                >
                  <div
                    className="panel"
                    onClick={() => {
                      setActive("form4");
                      scrollToForm("form4");
                    }}
                  >
                    <FaStar />
                    <p className="text pl-5">Skills and Knowledge</p>
                  </div>
                </li>
                <li
                  className={`list-title-item ${
                    active === "form5" && "active"
                  }`}
                >
                  <div
                    className="panel"
                    onClick={() => {
                      setActive("form5");
                      scrollToForm("form5");
                    }}
                  >
                    <PiStudentFill />
                    <p className="text pl-5">Education</p>
                  </div>
                </li>
                <li
                  className={`list-title-item ${
                    active === "form6" && "active"
                  }`}
                >
                  <div
                    className="panel"
                    onClick={() => {
                      setActive("form6");
                      scrollToForm("form6");
                    }}
                  >
                    <MdLanguage />
                    <p className="text pl-5">Languages</p>
                  </div>
                </li>
              </ul>
              <div className="flex justify-center">
                {isLoading ? (
                  <div className="flex justify-center items-center flex-grow">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <Button variant="blue" size="xl" onClick={handleTrans}>
                    Save CV
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="w-2/3 make-cv-content is-scrolling">
            <div className="block py-3 px-5">
              <div className="form">
                <div
                  id="form1"
                  ref={(ref) => (formRefs.current["form1"] = ref)}
                  className="personal-detail mt-5 formColor"
                >
                  <h3 className="title-resume">Personal Details</h3>
                  <div className="section-form">
                    <div className="flex flex-wrap flex-col ml-10">
                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label pt-3">
                          <Label className="ant-form-item-required">
                            Full Name
                          </Label>
                        </div>
                        <div className="w-full">
                          <Input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                fullName: e.target.value,
                              })
                            }
                            required
                            className="border-gray-700"
                            placeholder="Enter your full name..."
                          />
                          {fullNameError && (
                            <span className=" text-red-500 text-sm">
                              FullName is required
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label pt-3">
                          <Label className="ant-form-item-required">
                            Title
                          </Label>
                        </div>
                        <div className="w-full">
                          <Input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                title: e.target.value,
                              })
                            }
                            required
                            className="border-gray-700"
                            placeholder="Enter your title..."
                          />
                          {titleError && (
                            <span className=" text-red-500 text-sm">
                              Title is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label pt-3">
                          <Label className="ant-form-item-required">
                            Email
                          </Label>
                        </div>
                        <div className="w-full">
                          <Input
                            type="text"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            required
                            className="border-gray-700"
                            placeholder="Enter your email..."
                          />
                          {emailError && (
                            <span className=" text-red-500 text-sm">
                              {emailError}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label pt-3">
                          <Label className="ant-form-item-required">
                            Address
                          </Label>
                        </div>
                        <div className="w-full">
                          <Input
                            type="text"
                            value={formData.country}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                country: e.target.value,
                              })
                            }
                            required
                            className="border-gray-700"
                            placeholder="Enter your country..."
                          />
                          {countryError && (
                            <span className=" text-red-500 text-sm">
                              Country is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label pt-3">
                          <Label>Linkedln</Label>
                        </div>
                        <Input
                          type="text"
                          value={formData.linkedln}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              linkedln: e.target.value,
                            })
                          }
                          required
                          className="border-gray-700"
                          placeholder="https://lk.id/username"
                        />
                      </div>
                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label pt-3">
                          <Label className="ant-form-item-required">
                            Avatar
                          </Label>
                        </div>
                        <div className="w-full">
                          <Input
                            type="file"
                            value={formData.avatarUrl}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                avatarUrl: e.target.value,
                              })
                            }
                            ref={avatarRef}
                            required
                            className="border-gray-700"
                            placeholder="Upload your avatar..."
                          />
                          {avatarUrlError && (
                            <span className=" text-red-500 text-sm">
                              Avatar is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label pt-3">
                          <Label className="ant-form-item-required">
                            Phone Number
                          </Label>
                        </div>
                        <div className="relative">
                          <div className="h-input bg-white rounded-lg border border-gray-100 px-4 flex items-center gap-3">
                            <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer h-full">
                              <Flag
                                countryCode={formData.flag}
                                svg
                                onClick={(e) => setShow(true)}
                              />
                              <span className="text-gray-300">|</span>
                              <span className="text-gray-800">
                                {formData.phoneCountry}
                              </span>
                            </div>
                            <Input
                              type="text"
                              className="border-gray-700"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
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
                          {phoneError && (
                            <span className=" text-red-500 text-sm">
                              Phone number is required
                            </span>
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
                              formData.gender === "male"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => setGender("male")}
                          >
                            Male
                          </button>
                          <button
                            className={`rounded p-2 mr-2 ${
                              formData.gender === "female"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => setGender("female")}
                          >
                            Female
                          </button>
                          <button
                            className={`rounded p-2 mr-2 ${
                              formData.gender === "na"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => setGender("na")}
                          >
                            N/A
                          </button>
                        </div>
                      </div>
                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label mt-5">
                          <Label className="ant-form-item-required">
                            Date Of Birth
                          </Label>
                        </div>
                        <div className="w-full flex flex-col  ">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Select Date"
                              value={formData.dateOfBirth}
                              slotProps={{
                                textField: {
                                  helperText: "MM/DD/YYYY",
                                },
                              }}
                              onChange={(e) =>
                                setFormData({ ...formData, dateOfBirth: e.$d })
                              }
                            />
                          </LocalizationProvider>
                          {dateOfBirthError && (
                            <span className=" text-red-500 text-sm">
                              Date of birth is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label mt-3">
                          <Label className="ant-form-item-required">
                            Employment Status
                          </Label>
                        </div>
                        <div className="w-full">
                          <DropdownInput
                            MyLabel=""
                            DataList={statusList}
                            onDataSelect={(e) =>
                              setFormData({ ...formData, status: e })
                            }
                            selectedOption={formData.status}
                          />
                          {statusError && (
                            <span className=" text-red-500 text-sm">
                              Status is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label mt-3">
                          <Label className="ant-form-item-required">
                            Your Career
                          </Label>
                        </div>
                        <div className="w-full">
                          <DropdownInput
                            MyLabel=""
                            DataList={careers}
                            onDataSelect={(value, id) =>
                              setFormData({ ...formData, careerId: id })
                            }
                          />
                          {careerError && (
                            <span className=" text-red-500 text-sm">
                              Career is required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="form2"
                  ref={(ref) => (formRefs.current["form2"] = ref)}
                  className="personal-intro mt-5 formColor"
                >
                  <div className="flex items-center justify-between max-w-[850px] ">
                    <h3 className="title-resume">Introduce Yourself</h3>
                    <MyModel />
                  </div>
                  <div className="section-form">
                    <div className="flex flex-wrap flex-col ml-10">
                      <div className="flex mb-6 max-w-[550px]">
                        <div className="ant-form-item-label">
                          <Label>Description</Label>
                        </div>
                        <MyTextArea
                          onTextChange={(value) =>
                            setFormData({ ...formData, description: value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="form3"
                  ref={(ref) => (formRefs.current["form3"] = ref)}
                  className="formColor"
                >
                  <WorkingExperience
                    setCheck={validate}
                    isValid={(data) => setValidExperience(data)}
                  />
                </div>
                <div
                  id="form4"
                  ref={(ref) => (formRefs.current["form4"] = ref)}
                  className="formColor"
                >
                  <SkillResume
                    setAddSkill={(addSkill) => setAdditionalSkill(addSkill)}
                    setCheck={validate}
                    isValid={(data) => (validSkill = data)}
                  />
                </div>
                <div
                  id="form5"
                  ref={(ref) => (formRefs.current["form5"] = ref)}
                  className="formColor"
                >
                  <EducationResume
                    setCheck={validate}
                    isValid={(data) => {
                      validEducation = data;
                    }}
                  />
                </div>
                <div
                  id="form6"
                  ref={(ref) => (formRefs.current["form6"] = ref)}
                  className="formColor"
                >
                  <LanguageResume
                    setCheck={validate}
                    isValid={(data) => (validLanguage = data)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
