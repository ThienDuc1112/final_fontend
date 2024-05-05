"use client";
import "@/styles/global.css";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import Flag from "react-country-flag";
import phoneList from "@/utils/phoneDatabase";
import DropdownInput from "@/components/content/dropdownInput";
import DMInput from "@/components/content/dropdownManyInput";
import PhoneSelection from "@/components/content/phoneSelection";
import { registerEmployer as registerEmployerApi } from "@/app/api/auth/api";
import { getBusinessSize, getCareer } from "@/app/api/provider/api";
import { createBusiness } from "@/app/api/business/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Candidate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [icon, setIcon] = useState(true);
  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("+1");
  const [flag, setFlag] = useState("US");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [icon2, setIcon2] = useState(true);
  const [type2, setType2] = useState("password");
  const [emailError, setEmailError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwd2Error, setPwd2Error] = useState("");
  const [show, setShow] = useState(false);
  const [section, setSection] = useState(1);
  //   company Information
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [foundedYear, setFoundedYear] = useState(null);
  const [foundedYearError, setFoundedYearError] = useState("");
  const [businessSize, setBusinessSize] = useState("");
  const [businessSizeError, setBusinessSizeError] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [taxCodeError, setTaxCodeError] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [licenseFont, setLicenseFont] = useState("");
  const [licenseFontData, setLicenseFontData] = useState("");
  const [licenseBackData, setLicenseBackData] = useState("");
  const [licenseFontError, setLicenseFontError] = useState("");
  const [licenseBack, setLicenseBack] = useState("");
  const [licenseBackError, setLicenseBackError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [areas, setAreas] = useState([]);
  const [areaError, setAreaError] = useState("");
  const lfRef = useRef(null);
  const lbRef = useRef(null);
  const { push } = useRouter();
  const [businessSizeData, setBusinessSizeData] = useState([]);
  const [careerData, setCareerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBusinessSize();
        setBusinessSizeData(data.data);
        const careerData = await getCareer();
        setCareerData(careerData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{9}$/;
    return phoneRegex.test(phoneNumber);
  }

  const handleChangeIcon = () => {
    if (icon === true) {
      setIcon(false);
      setType("text");
    } else {
      setIcon(true);
      setType("password");
    }
  };
  const handleChangeIcon2 = () => {
    if (icon2 === true) {
      setIcon2(false);
      setType2("text");
    } else {
      setIcon2(true);
      setType2("password");
    }
  };
  const handleChangeShow = () => {
    setShow(true);
  };

  const handleSetPhoneCountry = (countryCode, countryFlag) => {
    setShow(false);
    setPhoneCountry(countryCode);
    setFlag(countryFlag);
  };

  const checkValidData1 = () => {
    setEmailError("");
    setUserNameError("");
    setFullNameError("");
    setPhoneError("");
    setPwdError("");
    setPwd2Error("");
    let isValid = true;

    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Email is not valid");
      isValid = false;
    }

    if (fullName.trim() === "") {
      setFullNameError("Full Name is required");
      isValid = false;
    }

    if (phone.trim() === "") {
      setPhoneError("Phone Number is required");
      isValid = false;
    } else if (!isValidPhoneNumber(phone)) {
      setPhoneError("Phone Number is not valid");
      isValid = false;
    }

    if (pwd.trim() === "") {
      setPwdError("Password is required");
      isValid = false;
    }

    if (pwd2.trim() === "") {
      setPwd2Error("Re-Password is required");
      isValid = false;
    }

    if (pwd !== pwd2) {
      setPwd2Error("Re-Password is not match with password");
      isValid = false;
    }

    if (isValid) {
      console.log("Form submitted");
    }
    return isValid;
  };

  const checkValidData2 = () => {
    setCompanyNameError("");
    setFoundedYearError("");
    setBusinessSizeError("");
    setTaxCodeError("");
    setCompanyEmailError("");
    setPhoneNumberError("");
    setLicenseFontError("");
    setLicenseBackError("");
    setAddressError("");

    let isValid = true;

    if (companyName.trim() === "") {
      setCompanyNameError("Company Name is required");
      isValid = false;
    }

    if (foundedYear <= 1800 || foundedYear > new Date().getFullYear()) {
      setFoundedYearError("Invalid Founded Year");
      isValid = false;
    }

    if (businessSize.trim() === "") {
      setBusinessSizeError("Business Size is required");
      isValid = false;
    }

    if (taxCode.trim() === "") {
      setTaxCodeError("Tax Code is required");
      isValid = false;
    }

    if (companyEmail.trim() === "") {
      setCompanyEmailError("Company Email is required");
      isValid = false;
    } else if (!isValidEmail(companyEmail)) {
      setCompanyEmailError("Company Email is not valid");
      isValid = false;
    }

    if (phoneNumber.trim() === "") {
      setPhoneNumberError("Phone Number is required");
      isValid = false;
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneNumberError("Phone Number is not valid");
      isValid = false;
    }

    if (licenseFont.trim() === "") {
      setLicenseFontError("License Front is required");
      isValid = false;
    }

    if (licenseBack.trim() === "") {
      setLicenseBackError("License Back is required");
      isValid = false;
    }

    if (address.trim() === "") {
      setAddressError("Address is required");
      isValid = false;
    }

    return isValid;
  };
  const handleNext = () => {
    if (section === 1) {
      let flag = checkValidData1();
      if (flag) {
        setSection(2);
      }
    } else {
      let flag = checkValidData2();
      if (flag) {
        handleSubmit();
      }
    }
  };
  const renderMethod = () => {
    if (section === 1) {
      return <>{personalDetail()}</>;
    } else if (section === 2) {
      return <>{companyDetail()}</>;
    }
  };
  const notify = (success, notifyMess) => {
    const toastOptions = {
      position: "top-right",
      autoClose: 13000,
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

  const register = async () => {
    const userData = {
      email: email.trim(),
      fullName: fullName.trim(),
      phoneNumber: `${phoneCountry}-${phone}`,
      password: pwd,
    };
    try {
      const response = await registerEmployerApi(userData);
      console.log(response.data);
      if (response.data.statusCode === 0) {
        setSection(1);
        setEmailError(response.data.message);
      } else {
        const userId = response.data.message;
        const businessData = {
          FullName: companyName,
          FoundedYear: foundedYear,
          BusinessSize: businessSize,
          TaxCode: taxCode,
          Email: companyEmail,
          PhoneNumber: `${phoneCountry}-${phoneNumber}`,
          LicenseFont: licenseFontData,
          LicenseBack: licenseBackData,
          Address: address,
          UserId: userId,
          AreaDTOs: areas,
        };

        const businessResponse = await createBusiness(businessData);
        console.log(businessResponse.data[0]);
        if (businessResponse.data[0].success === true) {
          notify(true, "You created an account successfully");
        } else {
          notify(false, "Please check your login information again");
        }
      }
    } catch {
      console.log(error);
    }
  };
  useEffect(() => {
    if (licenseBackData !== "") {
      register();
    }
  }, [licenseBackData]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await sendImage();
    } catch (error) {
      console.log(error);
      console.error(error);
    } finally {
      setIsLoading(false);
      setLicenseBack(null);
      setLicenseFont(null);
    }
  };

  const sendImage = async () => {
    try {
      const lfFile = lfRef.current.files[0];
      const lbFile = lbRef.current.files[0];

      const response = await fetch(
        `/api/images/upload?filename=${lfFile.name}`,
        {
          method: "POST",
          body: lfFile,
        }
      );
      const responseb = await fetch(
        `/api/images/upload?filename=${lbFile.name}`,
        {
          method: "POST",
          body: lbFile,
        }
      );

      const licenseFont = await response.json();
      const licenseBack = await responseb.json();
      const lcf = licenseFont.url.split("/").pop();
      const lcb = licenseBack.url.split("/").pop();
      setLicenseFontData(lcf);
      setLicenseBackData(lcb);
    } catch {
      console.log(error);
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);
  const handleUserNameInput = (e) => setUserName(e.target.value);
  const handleFullNameInput = (e) => setFullName(e.target.value);
  const handlePhoneInput = (e) => setPhone(e.target.value);
  const handlePwdInput2 = (e) => setPwd2(e.target.value);
  //company
  const handleCompanyNameInput = (event) => {
    setCompanyName(event.target.value);
  };

  const handleFoundedYearInput = (event) => {
    setFoundedYear(event.target.value);
  };

  const handleBusinessSizeInput = (name) => {
    setBusinessSize(name);
  };

  const handleTaxCodeInput = (event) => {
    setTaxCode(event.target.value);
  };

  const handleCompanyEmailInput = (event) => {
    setCompanyEmail(event.target.value);
  };

  const handleCompanyPhoneInput = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleLicenseFontInput = (event) => {
    setLicenseFont(event.target.value);
  };

  const handleLicenseBackInput = (event) => {
    setLicenseBack(event.target.value);
  };

  const handleAddressInput = (event) => {
    setAddress(event.target.value);
  };
  const handleSelectArea = (dataList) => {
    setAreas([])
    dataList.forEach((element) => {
      const area = { careerId: element.id, businessName: 0 };
      setAreas((prevAreas) => [...prevAreas, area]);
    });
  };
 console.log(areas)

  const personalDetail = () => {
    return (
      <>
        <h1 className=" text-zinc-950 text-2xl font-bold mb-2 text-center pt-10 pb-2">
          Personal Detail
        </h1>
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5 pt-5">
          <Label htmlFor="username" className="text-gray-600">
            User Name:
          </Label>
          <Input
            type="text"
            id="userName"
            value={userName}
            onChange={handleUserNameInput}
            required
          />
          {userNameError && <p className="text-red-500">{userNameError}</p>}
        </div>
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
          <Label htmlFor="fullname" className="text-gray-600">
            Full Name:
          </Label>
          <Input
            type="text"
            id="fullname"
            value={fullName}
            onChange={handleFullNameInput}
            required
          />
          {fullNameError && <p className="text-red-500">{fullNameError}</p>}
        </div>
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
          <Label htmlFor="email" className="text-gray-600">
            Email:
          </Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={handleUserInput}
            required
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
          <Label htmlFor="phone" className="text-gray-600">
            Phone Number:
          </Label>
          <div className="relative">
            <div className="h-input bg-white rounded-lg border border-gray-100 px-4 flex items-center gap-3">
              <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer h-full">
                <Flag countryCode={flag} svg onClick={handleChangeShow} />
                <span className="text-gray-300">|</span>
                <span className="text-gray-800">{phoneCountry}</span>
              </div>
              <Input
                type="phoneNumber"
                id="phone"
                value={phone}
                onChange={handlePhoneInput}
                placeholder="000000000"
                maxLength={10}
              />
            </div>
            {phoneError && <p className="text-red-500">{phoneError}</p>}
            {show && (
              <PhoneSelection
                phoneList={phoneList}
                onCountrySelect={handleSetPhoneCountry}
              />
            )}
          </div>
        </div>

        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5 relative">
          <Label htmlFor="password" className="text-gray-600">
            Password:
          </Label>
          <Input
            type={type}
            id="password"
            onChange={handlePwdInput}
            value={pwd}
            required
          />
          <Button
            variant="secondary"
            onClick={handleChangeIcon}
            className="absolute top-5 right-0 rounded-lg p-2 flex cursor-pointer border-2 border-blue-100 hover:border-blue-500 bg-white"
          >
            {icon ? <IoEyeOutline /> : <FaRegEyeSlash />}
          </Button>
          {pwdError && <p className="text-red-500">{pwdError}</p>}
        </div>

        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5 relative">
          <Label htmlFor="repassword" className="text-gray-600">
            Re-Password:
          </Label>
          <Input
            type={type2}
            id="repassword"
            onChange={handlePwdInput2}
            value={pwd2}
            required
          />
          <Button
            variant="secondary"
            onClick={handleChangeIcon2}
            className="absolute top-5 right-0 rounded-lg p-2 flex cursor-pointer border-2 border-blue-100 hover:border-blue-500 bg-white"
          >
            {icon2 ? <IoEyeOutline /> : <FaRegEyeSlash />}
          </Button>
          {pwd2Error && <p className="text-red-500">{pwd2Error}</p>}
        </div>
      </>
    );
  };

  const companyDetail = () => {
    return (
      <>
        <h1 className="text-gray-900 font-medium pb-12 text-3xl text-center">
          Company Details
        </h1>
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
          <Label htmlFor="companyname" className="text-gray-600">
            Full Name:
          </Label>
          <Input
            type="text"
            id="companyname"
            value={companyName}
            onChange={handleCompanyNameInput}
            maxLength={200}
          />
          {companyNameError && (
            <p className="text-red-500">{companyNameError}</p>
          )}
        </div>
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
          <Label htmlFor="foundedyear" className="text-gray-600">
            Founded Year:
          </Label>
          <Input
            type="text"
            id="foundedyear"
            value={foundedYear}
            onChange={handleFoundedYearInput}
            maxLength={4}
          />
          {foundedYearError && (
            <p className="text-red-500">{foundedYearError}</p>
          )}
        </div>
        <DropdownInput
          MyLabel="Business Size"
          DataList={businessSizeData}
          onDataSelect={handleBusinessSizeInput}
        />
        {businessSizeError && (
          <p className="text-red-500">{businessSizeError}</p>
        )}
        <DMInput
          MyLabel="Areas"
          DataList={careerData}
          onDataSelect={handleSelectArea}
        />
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
          <Label htmlFor="taxcode" className="text-gray-600">
            Tax Code:
          </Label>
          <Input
            type="text"
            id="taxcode"
            value={taxCode}
            onChange={handleTaxCodeInput}
            maxLength={60}
          />
          {taxCodeError && <p className="text-red-500">{taxCodeError}</p>}
        </div>
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
          <Label htmlFor="address" className="text-gray-600">
            Adress:
          </Label>
          <Input
            type="text"
            id="adress"
            value={address}
            onChange={handleAddressInput}
            required
            maxLength={200}
          />
          {addressError && <p className="text-red-500">{addressError}</p>}
        </div>
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
          <Label htmlFor="companyemail" className="text-gray-600">
            Email:
          </Label>
          <Input
            type="text"
            id="companyemail"
            value={companyEmail}
            onChange={handleCompanyEmailInput}
            required
            maxLength={100}
          />
          {companyEmailError && (
            <p className="text-red-500">{companyEmailError}</p>
          )}
        </div>
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
          <Label htmlFor="companyphone" className="text-gray-600">
            Phone Number:
          </Label>
          <div className="relative">
            <div className="h-input bg-white rounded-lg border border-gray-100 px-4 flex items-center gap-3">
              <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer h-full">
                <Flag countryCode={flag} svg onClick={handleChangeShow} />
                <span className="text-gray-300">|</span>
                <span className="text-gray-800">{phoneCountry}</span>
              </div>
              <Input
                type="phoneNumber"
                id="companyphone"
                value={phoneNumber}
                onChange={handleCompanyPhoneInput}
                placeholder="000000000"
                maxLength={9}
              />
            </div>
            {phoneNumberError && (
              <p className="text-red-500">{phoneNumberError}</p>
            )}
            {show && (
              <PhoneSelection
                phoneList={phoneList}
                onCountrySelect={handleSetPhoneCountry}
              />
            )}
          </div>
        </div>
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
          <Label htmlFor="lisencef" className="text-gray-600">
            Lisence Font:
          </Label>
          <Input
            type="file"
            id="lisencef"
            onChange={handleLicenseFontInput}
            ref={lfRef}
          />
          {licenseFontError && (
            <p className="text-red-500">{licenseFontError}</p>
          )}
        </div>
        <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
          <Label htmlFor="lisenceb" className="text-gray-600">
            Lisence Back:
          </Label>
          <Input
            type="file"
            id="lisenceb"
            onChange={handleLicenseBackInput}
            ref={lbRef}
          />
          {licenseBackError && (
            <p className="text-red-500">{licenseBackError}</p>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-grow relative">
      <div className=" min-h-screen bg-blue-700 hidden md:flex md:flex-col px-10 xl:px-20 justify-center text-center gap-5 py-10">
        <a href="/" className="block px-16 pt-12 cursor-pointer mb-16">
          <div className="flex justify-center items-center gap-x-3">
            <Image
              src="/images/logonobg.png"
              width={60}
              height={80}
              alt="logo"
            />
            <p className="text-white text-xl font-bold hover:text-sky-600">
              Job Platform
            </p>
          </div>
        </a>

        <div className="px-8">
          <h1 className="font-medium text-white text-3xl">
            Have your account now
          </h1>
          <p className="text-blue-50 mt-1">Register as an employer</p>
          <div className="flex flex-col gap-9 my-20 relative">
            <div
              className={`flex gap-5 items-center  ${
                section === 1 ? "border-white text-white" : "text-white"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-full border-2 flex items-center justify-center bg-blue-700 relative z-20  ${
                  section === 1 ? "border-white" : "border-gray-300"
                }`}
              >
                <div className="rounded-full h-7 w-7 justify-center flex items-center bg-blue-700">
                  1
                </div>
              </div>
              <p
                className={`${section === 1 ? "text-white" : "text-gray-300"}`}
              >
                Personal Details
              </p>
            </div>
            <div
              className={`flex gap-5 items-center  ${
                section === 2 ? "border-white text-white" : "text-white"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-full border-2 flex items-center justify-center bg-blue-700 relative z-20  ${
                  section === 2 ? "border-white" : "border-gray-300"
                }`}
              >
                <div className="rounded-full h-7 w-7 justify-center flex items-center bg-blue-700">
                  2
                </div>
              </div>
              <p
                className={`${section === 2 ? "text-white" : "text-gray-300"}`}
              >
                Company Details
              </p>
            </div>
            <div className="absolute bg-white w-0.5 h-full left-5">
              <div className="bg-white transition-all duration-200"></div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center flex-grow">
          <div className="spinner"></div>
        </div>
      ) : (
        <section className=" login flex items-center flex-col flex-grow min-h-screen relative lg:px-0 bg-gray-50">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full md:px-10 md:pt-5 md:justify-between ">
            <p className="text-gray-500 hover:text-gray-950 md:flex items-center gap-2 mb-3 hidden md:mt-3 text-base">
              <IoMdArrowBack />
              <a href="/auth/register">Back</a>
            </p>

            <p className="text-gray-600 hidden md:block md:mt-3 text-lg hover:text-gray-950">
              Already have an account?
              <a
                className="text-blue-500 hover:text-blue-700 px-1"
                href="/auth/login"
              >
                Sign in
              </a>
            </p>
          </div>

          <div className="w-full max-w-md justify-center flex flex-col flex-grow">
            {renderMethod()}
            <Button variant="blue" className="mt-1 mb-5" onClick={handleNext}>
              {section === 2 ? "Submit" : "Next"}
            </Button>
          </div>
        </section>
      )}
      <ToastContainer />
    </div>
  );
};

export default Candidate;
