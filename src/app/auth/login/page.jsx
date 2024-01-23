"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/Context/features/auth/authSlice";
import {loginA} from "@/Context/features/auth/authApiSlice";
import TokenService from '@/utils/Token.service';

const Login = () => {
  const userRef = useRef(null);
  const errRef = useRef(null);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginA(user,pwd);
      const userData = await response.json();
      console.log(userData);
      setUser("");
      setPwd("");
      if (userData) {
        dispatch(setCredentials({ ...userData}))
        TokenService.updateLocalAccessToken(userData);
        push("/content");
      }else{
        console.log("not");
      }
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response");
        console.log(err);
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <section className="login">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1>Employee Login</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              value={user}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
        </section>
      )}
    </div>
  );
};

export default Login;
