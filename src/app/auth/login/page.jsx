"use client";
import "@/styles/global.css";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loginA, getUserInfo } from "@/Context/features/auth/authApiSlice";
import TokenService from "@/utils/Token.service";
import Image from "next/image";
import MyButton from "@/components/myButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [icon, setIcon] = useState(true);
  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { push } = useRouter();

  const handleChangeIcon = () => {
    if (icon === true) {
      setIcon(false);
      setType("text");
    } else {
      setIcon(true);
      setType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginA(email, pwd);
      const userData = await response.json();
      console.log(userData);
      const userJwt = TokenService.getUser(userData.access_token);
      const userProfile = await getUserInfo(userData.access_token);
      if (userData) {
        TokenService.updateLocalAccessToken(userData);
        TokenService.updateUser(userJwt.sub, userJwt.role, userProfile.name);
        if (userJwt.role === "employer") {
          push("/business");
        } else if (userJwt.role === "admin") {
          push("/admin");
        } else {
          push("/Home");
        }
      }
    } catch (err) {
      console.log(err);
      setEmail("");
      setPwd("");
      if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Wrong email or password");
      }
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  return (
    <div className="flex flex-grow">
      <div className="min-h-screen pointer-events-none bg-blue-700 md:w-auth-small xl:w-auth-blue hidden md:flex md:flex-col px-10 xl:px-20 justify-center text-center gap-5 py-10">
        <p className="text-white font-medium"> Explore the world of jobs</p>
        <Image
          src="/images/login.png"
          width={350}
          height={300}
          alt="image login"
        />
      </div>

      <section className="login flex items-center flex-col flex-grow min-h-screen relative lg:px-0 bg-gray-50">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full px-10 pt-20 ">
          <div className="flex justify-between items-center gap-x-3">
            <Image src="/images/mylogo.png" width={60} height={80} alt="logo" />
            <a
              className="text-blue-700/75 text-xl font-bold hover:text-sky-600"
              href="/"
            >
              Job Platform
            </a>
          </div>
          <p className="text-gray-600 hidden md:block md:mt-3">
            Do not have an account?
            <a
              className="text-blue-500 hover:text-blue-700"
              href="/auth/register"
            >
              {" "}
              Sign up
            </a>
          </p>
        </div>

        <div className="w-full max-w-md justify-center flex flex-col">
          <h1 className=" text-zinc-950 text-2xl font-bold mb-2 text-center pt-10 pb-2">
            Login to Job Platform
          </h1>
          <p className="text-gray-400 text-center">
            Connect with thousands of Employers and Jobseekers
          </p>
          <MyButton />
          <div className="flex justify-center items-center relative mb-4">
            <div className="h-one absolute bg-gradient-to-r from-transparent via-gray-400 to-transparent w-full border"></div>
            <p className="text-center bg-gray-50 z-20 px-4">Or Login With</p>
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
          </div>
          {errMsg && <p className="text-red-500">{errMsg}</p>}
          <Button variant="blue" className="mt-4" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Login;
