"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SuccessNotify } from "@/components/content/successNotification";
import DropdownInput from "@/components/content/dropdownInput";
import DropdownInputLanguage from "../../../addJob/dropdownLanguage";
import MyTextArea from "@/components/myTextArea";
import DefaultLayout from "@/components/business/Layouts/DefaultLayout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateJobMutation } from "@/Context/features/job/jobApiSlice";
import {
  getCareer,
  getCareerLevel,
  getEducationLevel,
  getExperienceLevel,
  getJobType,
  getLanguages,
} from "@/app/api/provider/api";
import { getJobDetail } from "@/app/api/job/api";
import TokenService from "@/utils/Token.service";
export default function Edit({ params }) {
  const [updateJob, { isLoading, error, success, isError }] =
  useUpdateJobMutation();
  const businessId = TokenService.getBusinessId();
  const [id, setId] = useState(null);
  const [careerId, setCareerId] = useState(null);
  const [title, setTitle] = useState("");
  const [numberRecruitment, setNumberRecruitment] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [educationLevelMin, setEducationLevelMin] = useState("");
  const [yearExpMin, setYearExpMin] = useState("");
  const [genderRequirement, setGenderRequirement] = useState("");
  const [languageRequirementId, setLanguageRequirementId] = useState(null);
  const [address, setAddress] = useState(null);
  const [jobType, setJobType] = useState("");
  const [careerLevel, setCareerLevel] = useState("");
  const [salaryMin, setSalaryMin] = useState(null);
  const [salaryMax, setSalaryMax] = useState(null);
  const [description, setDescription] = useState("");
  const [welfare, setWelfare] = useState("");
  const [requirement, setRequirement] = useState("");
  const [requiredSkills, setRequiredSkills] = useState(null);
  const [responsibilities, setResponsibilities] = useState("");
  const [status, setStatus] = useState("");

  const [careerIdError, setCareerIdError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [numberRecruitmentError, setNumberRecruitmentError] = useState("");
  const [expirationDateError, setExpirationDateError] = useState("");
  const [educationLevelMinError, setEducationLevelMinError] = useState("");
  const [yearExpMinError, setYearExpMinError] = useState("");
  const [genderRequirementError, setGenderRequirementError] = useState("");
  const [languageRequirementIdError, setLanguageRequirementIdError] =
    useState("");
  const [jobTypeError, setJobTypeError] = useState("");
  const [careerLevelError, setCareerLevelError] = useState("");
  const [salaryMinError, setSalaryMinError] = useState("");
  const [salaryMaxError, setSalaryMaxError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [welfareError, setWelfareError] = useState("");
  const [requirementError, setRequirementError] = useState("");
  const [responsibilitiesError, setResponsibilitiesError] = useState("");
  const [statusError, setStatusError] = useState("");

  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [careerLevelData, setCareerLevelData] = useState([]);
  const [educationLevelData, setEducationLevelData] = useState([]);
  const [experienceYearData, setExperienceYearData] = useState([]);
  const [jobTypeData, setJobTypeData] = useState([]);
  const [careerData, setCareerData] = useState([]);
  const [languageData, setLanguageData] = useState([]);

  const [careerName, setCareerName] = useState('');
  const [language, setLanguage] = useState({ languageName: '', level: '' });

  const genderData = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "N/A" },
  ];

  const statusData = [
    { id: 1, name: "Urgent" },
    { id: 2, name: "Open" },
    { id: 3, name: "Closed" },
  ];
  function findIdByName(dataList, name) {
    const foundItem = dataList.find(item => item.name === name);
    return foundItem ? foundItem.id : null;
  }
  function findIdLanguage(dataList, name, level) {
    const foundedItem = dataList.find(item => item.languageName === name && item.level === level);
    return foundedItem ? foundedItem.id : null;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          allCareerInfo,
          careerLevelInfo,
          educationLevelInfo,
          experienceYearInfo,
          jobTypeInfo,
          languageInfo,
          jobDatas,
        ] = await Promise.all([
          getCareer(),
          getCareerLevel(),
          getEducationLevel(),
          getExperienceLevel(),
          getJobType(),
          getLanguages(),
          getJobDetail(params.id),
        ]);
        setCareerLevelData(careerLevelInfo.data);
        setEducationLevelData(educationLevelInfo.data);
        setExperienceYearData(experienceYearInfo.data);
        setJobTypeData(jobTypeInfo.data);
        setCareerData(allCareerInfo.data);
        setLanguageData(languageInfo.data);

        setId(jobDatas.data.id);
        setStatus(jobDatas.data.status);
        setCareerName(jobDatas.data.careerName);
        setCareerId(findIdByName(allCareerInfo.data, jobDatas.data.careerName));
        setLanguage({ languageName: jobDatas.data.languageRequirementName, level: jobDatas.data.languageRequirementLevel });
        setLanguageRequirementId(findIdLanguage(languageInfo.data, jobDatas.data.languageRequirementName, jobDatas.data.languageRequirementLevel)); 
        setTitle(jobDatas.data.title);
        setCareerLevelData(jobDatas.data.careerLevel);
        setNumberRecruitment(jobDatas.data.numberRecruitment);
        setExpirationDate(dayjs(jobDatas.data.expirationDate));
        setEducationLevelMin(jobDatas.data.educationLevelMin);
        setYearExpMin(jobDatas.data.yearExpMin);
        setGenderRequirement(jobDatas.data.genderRequirement);
        setAddress(jobDatas.data.address);
        setJobType(jobDatas.data.jobType);
        setCareerLevel(jobDatas.data.careerLevel);
        setSalaryMin(jobDatas.data.salaryMin);
        setSalaryMax(jobDatas.data.salaryMax);
        setDescription(jobDatas.data.description);
        setRequiredSkills(jobDatas.data.requiredSkills);
        setResponsibilities(jobDatas.data.responsibilities);
        setRequirement(jobDatas.data.requirement);
        setWelfare(jobDatas.data.welfare);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  const checkValidData = () => {
    setCareerIdError("");
    setTitleError("");
    setNumberRecruitmentError("");
    setExpirationDateError("");
    setEducationLevelMinError("");
    setYearExpMinError("");
    setGenderRequirementError("");
    setLanguageRequirementIdError("");
    setJobTypeError("");
    setCareerLevelError("");
    setSalaryMinError("");
    setSalaryMaxError("");
    setDescriptionError("");
    setWelfareError("");
    setRequirementError("");
    setResponsibilitiesError("");
    setStatusError("");

    let isValid = true;

    // Perform validations for each field

    if (careerId === null) {
      setCareerIdError("Career ID is required");
      isValid = false;
    }

    if (title.trim() === "") {
      setTitleError("Title is required");
      isValid = false;
    }

    if (numberRecruitment === null) {
      setNumberRecruitmentError("Number of Recruitment is required");
      isValid = false;
    } else if (numberRecruitment <= 0 || numberRecruitment > 999) {
      setNumberRecruitmentError(
        "Number of Recruitment must be greater than 0 and lower than 1000"
      );
      isValid = false;
    }

    if (expirationDate === null) {
      setExpirationDateError("Expiration Date is required");
      isValid = false;
    } else {
      const today = new Date();
      if (expirationDate < today) {
        setExpirationDateError("Expiration Date cannot be in the past");
        isValid = false;
      }
    }

    if (educationLevelMin.trim() === "") {
      setEducationLevelMinError("Minimum Education Level is required");
      isValid = false;
    }

    if (yearExpMin.trim() === "") {
      setYearExpMinError("Minimum Years of Experience is required");
      isValid = false;
    }

    if (genderRequirement.trim() === "") {
      setGenderRequirementError("Gender Requirement is required");
      isValid = false;
    }

    if (languageRequirementId === null) {
      setLanguageRequirementIdError("Language Requirement is required");
      isValid = false;
    }

    if (jobType.trim() === "") {
      setJobTypeError("Job Type is required");
      isValid = false;
    }

    if (careerLevel.trim() === "") {
      setCareerLevelError("Career Level is required");
      isValid = false;
    }

    if (salaryMin === null) {
      setSalaryMinError("Minimum Salary is required");
      isValid = false;
    } else if (salaryMin <= 0) {
      setSalaryMinError("Minimum Salary must be greater than 0");
      isValid = false;
    } else if (!isNumeric(salaryMin)) {
      setSalaryMinError("Minimum Salary must be a number");
      isValid = false;
    }

    if (salaryMax === null) {
      setSalaryMaxError("Maximum Salary is required");
      isValid = false;
    } else if (!isNumeric(salaryMax)) {
      setSalaryMaxError("Maximum Salary must be a number");
      isValid = false;
    } else if (salaryMax <= 0) {
      setSalaryMaxError("Maximum Salary must be greater than 0");
      isValid = false;
    } else if (salaryMax <= salaryMin) {
      setSalaryMaxError("Maximum Salary must be greater than Minimum Salary");
      isValid = false;
    }

    if (description.trim() === "") {
      setDescriptionError("Description is required");
      isValid = false;
    }

    if (welfare.trim() === "") {
      setWelfareError("Welfare is required");
      isValid = false;
    }

    if (requirement.trim() === "") {
      setRequirementError("Requirement is required");
      isValid = false;
    }

    if (responsibilities.trim() === "") {
      setResponsibilitiesError("Responsibilities is required");
      isValid = false;
    }

    if (status.trim() === "") {
      setStatusError("Status is required");
      isValid = false;
    }

    return isValid;
  };

  const notify = (success, notifyMess) => {
    const toastOptions = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    if (success) {
      toast.success(notifyMess, toastOptions);
    } else {
      toast.error(notifyMess, toastOptions);
    }
  };

  const handleSubmit = async () => {
    let isValid = checkValidData();
    if (isValid) {
      const jobData = {
        id: id,
        careerId: careerId,
        businessId: businessId,
        title: title,
        numberRecruitment: numberRecruitment,
        expirationDate: expirationDate,
        educationLevelMin: educationLevelMin,
        yearExpMin: yearExpMin,
        genderRequirement: genderRequirement,
        languageRequirementId: languageRequirementId,
        address: address,
        jobType: jobType,
        careerLevel: careerLevel,
        salaryMin: salaryMin,
        salaryMax: salaryMax,
        description: description,
        welfare: welfare,
        requirement: requirement,
        requiredSkills: requiredSkills,
        responsibilities: responsibilities,
        status: status,
      };
      const response = await updateJob(jobData);
      if (response.data.success) {
       notify(true, "update the job successfully")
      }
    }
  };
  return (
    <DefaultLayout>
      {loading || isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[300px] ml-[600px] mb-[500px]">
        <div className="spinner"></div>
      </div>
      ) : (
        <div className="relative max-w-[1600px] mt-10 mx-10">
          <div className="mx-5">
            <h2>Edit Job</h2>
            <p className="text-base font-normal">
              {" "}
              Edit the job to find suitable candidates
            </p>
            <div className="mt-10 py-6 px-5 bg-white border rounded-sm shadow-md xl:min-w-[1300px]">
              <h3>Enter Information</h3>
              <div className="mt-3 flex items-center w-full">
                <div className="flex flex-col mb-1 min-w-[950px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required"> Job title</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      maxLength={100}
                      className="border-gray-700 bg-blue-100/25"
                    />
                    {titleError && (
                      <span className=" text-red-500 text-sm">
                        {titleError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="mt-3 flex items-center gap-[50px] w-full">
                <div className="flex flex-col min-w-[400px]">
                  <DropdownInput
                    MyLabel="Type of Career"
                    DataList={careerData}
                    onDataSelect={(name, id) => setCareerId(id)}
                    required={true}
                    selectedOption={careerName}
                  />
                  {careerIdError && (
                    <span className=" text-red-500 text-sm">
                      {careerIdError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-[400px]">
                  <DropdownInput
                    MyLabel="Type of Job"
                    DataList={jobTypeData}
                    onDataSelect={(name, id) => setJobType(name)}
                    required={true}
                    selectedOption={jobType}
                  />
                  {jobTypeError && (
                    <span className=" text-red-500 text-sm">
                      {jobTypeError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-[400px]">
                  <DropdownInput
                    MyLabel="Level of Education"
                    DataList={educationLevelData}
                    onDataSelect={(name, id) => setEducationLevelMin(name)}
                    required={true}
                    selectedOption={educationLevelMin}
                  />
                  {educationLevelMinError && (
                    <span className=" text-red-500 text-sm">
                      {educationLevelMinError}
                    </span>
                  )}
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="mt-3 flex items-center gap-[50px] w-full">
                <div className="flex flex-col min-w-[400px]">
                  <DropdownInput
                    MyLabel="Years of Experience"
                    DataList={experienceYearData}
                    onDataSelect={(name, id) => setYearExpMin(name)}
                    required={true}
                    selectedOption={yearExpMin}
                  />
                  {yearExpMinError && (
                    <span className=" text-red-500 text-sm">
                      {yearExpMinError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-[400px]">
                  <DropdownInput
                    MyLabel="Level of Career"
                    DataList={careerLevelData}
                    onDataSelect={(name, id) => setCareerLevel(name)}
                    required={true}
                    selectedOption={careerLevel}
                  />
                  {careerLevelError && (
                    <span className=" text-red-500 text-sm">
                      {careerLevelError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-[400px]">
                  <DropdownInput
                    MyLabel="Gender Requirement"
                    DataList={genderData}
                    onDataSelect={(name, id) => setGenderRequirement(name)}
                    required={true}
                    selectedOption={genderRequirement}
                  />
                  {genderRequirementError && (
                    <span className=" text-red-500 text-sm">
                      {genderRequirementError}
                    </span>
                  )}
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="mt-3 flex items-center gap-[50px] w-full">
                <div className="flex flex-col mb-6 min-w-[400px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">
                      Min Salary {"(dollar/hour)"}
                    </Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      maxLength={5}
                      className="border-gray-700 bg-blue-100/25"
                    />
                    {salaryMinError && (
                      <span className=" text-red-500 text-sm">
                        {salaryMinError}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col mb-6 min-w-[400px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">
                      Max Salary {"(dollar/hour)"}
                    </Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      maxLength={5}
                      className="border-gray-700 bg-blue-100/25"
                    />
                    {salaryMaxError && (
                      <span className=" text-red-500 text-sm">
                        {salaryMaxError}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col mb-6 min-w-[400px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">
                      Number of Recruitment
                    </Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={numberRecruitment}
                      onChange={(e) => setNumberRecruitment(e.target.value)}
                      maxLength={5}
                      className="border-gray-700 bg-blue-100/25"
                    />
                    {numberRecruitmentError && (
                      <span className=" text-red-500 text-sm">
                        {numberRecruitmentError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="mt-3 flex items-center gap-[50px] w-full">
                <div className="min-w-[400px]">
                  <DropdownInputLanguage
                    MyLabel="Language Requirement"
                    DataList={languageData}
                    onDataSelect={(name, id) => setLanguageRequirementId(id)}
                    required={true}
                    selectedOption={language}
                  />
                  {languageRequirementIdError && (
                    <span className=" text-red-500 text-sm">
                      {languageRequirementIdError}
                    </span>
                  )}
                </div>

                <div className="flex flex-col mb-4 min-w-[400px]">
                  <div className="ant-form-item-label mt-5">
                    <Label className="ant-form-item-required">
                      Expiration Date
                    </Label>
                  </div>
                  <div className="w-full flex flex-col  ">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Select Date"
                        value={expirationDate}
                        slotProps={{
                          textField: {
                            helperText: "MM/DD/YYYY",
                          },
                        }}
                        onChange={(e) => setExpirationDate(dayjs(e.$d))}
                      />
                    </LocalizationProvider>
                    {expirationDateError && (
                      <span className=" text-red-500 text-sm">
                        {expirationDateError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col min-w-[400px]">
                  <DropdownInput
                    MyLabel="Job Status"
                    DataList={statusData}
                    onDataSelect={(name, id) => setStatus(name)}
                    required={true}
                    selectedOption={status}
                  />
                  {statusError && (
                    <span className=" text-red-500 text-sm">{statusError}</span>
                  )}
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="flex items-center w-full gap-[50px]">
                <div className="flex flex-col mb-1 min-w-[700px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className=""> Required Skills</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={requiredSkills}
                      placeHolder="e.g. C#, Asp.net, Javascript, NestJs"
                      onChange={(e) => setRequiredSkills(e.target.value)}
                      maxLength={100}
                      className="border-gray-700 bg-blue-100/25"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-1 min-w-[400px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="">Work Address</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      maxLength={60}
                      className="border-gray-700 bg-blue-100/25"
                    />
                  </div>
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="mt-1 flex items-center gap-[50px] w-full">
                <div className="flex flex-col mb-2">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">
                      Job Description
                    </Label>
                  </div>
                  <div className="w-full">
                    <textarea
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border-gray-600 rounded-lg border min-w-[600px] min-h-[200px] p-3"
                    />
                  </div>
                  {descriptionError && (
                    <span className=" text-red-500 text-sm">
                      {descriptionError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-2">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">
                      Responsibilities
                    </Label>
                  </div>
                  <MyTextArea
                    onTextChange={(value) => setResponsibilities(value)}
                    text={responsibilities}
                  />
                  {responsibilitiesError && (
                    <span className=" text-red-500 text-sm">
                      {responsibilitiesError}
                    </span>
                  )}
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="mt-1 flex items-center gap-[50px] w-full">
                <div className="flex flex-col mb-2">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">
                      Job Requirements
                    </Label>
                  </div>
                  <MyTextArea onTextChange={(value) => setRequirement(value)} 
                  text={requirement}
                  />
                  {requirementError && (
                    <span className=" text-red-500 text-sm">
                      {requirementError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-2">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">Welfares</Label>
                  </div>
                  <MyTextArea onTextChange={(value) => setWelfare(value)} 
                  text={welfare}
                  />
                  {welfareError && (
                    <span className=" text-red-500 text-sm">
                      {welfareError}
                    </span>
                  )}
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="mt-3 flex justify-end items-center gap-[50px] w-full">
                <Button size="xl" variant="blue" onClick={handleSubmit}>
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSuccess && (
        <div
          className="animate-slide-up fixed z-30 top-20 right-0 p-7"
          style={{ position: "fixed" }}
        >
          <SuccessNotify
            message="You Updated the job successfully"
            variant="success"
            icon="success"
          />
        </div>
      )}
        <ToastContainer />
    </DefaultLayout>
  );
}
