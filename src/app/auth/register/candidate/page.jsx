"use client";
import "@/styles/global.css";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MyButton from "@/components/MyButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const Candidate = () => {
  const [icon, setIcon] = useState(true);
  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
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
  const { push } = useRouter();

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    if (isValid) {
      // Submit the form or perform further actions
      console.log("Form submitted");
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);
  const handleUserNameInput = (e) => setUserName(e.target.value);
  const handleFullNameInput = (e) => setFullName(e.target.value);
  const handlePhoneInput = (e) => setPhone(e.target.value);
  const handlePwdInput2 = (e) => setPwd2(e.target.value);

  return (
    <div className="flex flex-grow">
      <div className="min-h-screen pointer-events-none bg-blue-700 hidden md:flex md:flex-col px-10 xl:px-20 justify-center text-center gap-5 py-10">
        <div className="flex justify-center items-center gap-x-3 cursor-pointer">
          <Image src="/images/logonobg.png" width={80} height={80} alt="logo" />
          <a
            className="text-white text-xl font-bold hover:text-sky-600"
            href="/"
          >
            Job Platform
          </a>
        </div>
        <Image
          src="/images/registercandidate.png"
          width={300}
          height={300}
          alt="image login"
        />
      </div>

      <section className="login flex items-center flex-col flex-grow min-h-screen relative lg:px-0 bg-gray-50">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full px-10 pt-2 md:justify-end ">
          <p className="text-gray-600 hidden md:block md:mt-3">
            Already have an account?
            <a className="text-blue-500 hover:text-blue-700" href="/auth/login">
              {" "}
              Sign in
            </a>
          </p>
        </div>

        <div className="w-full max-w-md justify-center flex flex-col">
          <h1 className=" text-zinc-950 text-2xl font-bold mb-2 text-center pt-10 pb-2">
            Sign up to Job Platform
          </h1>
          <p className="text-gray-400 text-center">
            Create your account and find your dream jobs
          </p>
          <MyButton name="Sign up" />
          <div className="flex justify-center items-center relative mb-4">
            <div className="h-one absolute bg-gradient-to-r from-transparent via-gray-400 to-transparent w-full border"></div>
            <p className="text-center bg-gray-50 z-20 px-4">Or Sign Up With</p>
          </div>
          <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
            <Label htmlFor="username">User Name:</Label>
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
            <Label htmlFor="fullname">Full Name:</Label>
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
            <Label htmlFor="email">Email:</Label>
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
            <Label htmlFor="phone">Phone Number:</Label>
            <Input
              type="phoneNumber"
              id="phone"
              value={phone}
              onChange={handlePhoneInput}
              required
            />
            {phoneError && <p className="text-red-500">{phoneError}</p>}
          </div>

          <div className="mb-4 grid w-full max-w-dm items-center gap-1.5 relative">
            <Label htmlFor="password">Password:</Label>
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
            <Label htmlFor="repassword">Re-Password:</Label>
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
          <Button variant="blue" className="mt-1 mb-5" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Candidate;
