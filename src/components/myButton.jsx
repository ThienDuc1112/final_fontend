'use client'
import React, {useState } from "react";
import Image from "next/image";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { loginByGoogle, getUserInfo } from "@/Context/features/auth/authApiSlice";
import TokenService from "@/utils/Token.service";
import { useRouter } from "next/navigation";

const MyButton = ({ name}) => {
  const { push } = useRouter();

const handleLogin = async (token) => {
  try {
    const response = await loginByGoogle(token);
    const userData =await response.json();
    const userJwt = TokenService.getUser(userData.access_token);
    const userProfile = await getUserInfo(userData.access_token);
    if (userData) {
      TokenService.updateLocalAccessToken(userData);
      TokenService.updateUser(userJwt.sub, userJwt.role, userProfile.name);
      if (userJwt.role === "employer") {
        push("/business");
      } else {
        push("/Home");
      }
    } else {
      window.alert("This email is used to create account")
    }
  } catch (err) {
    // window.alert("This email is used to create account")
    console.log(err);
  }
}

  return (
    <div className="btn-social mt-6 mb-5">
     
      <GoogleOAuthProvider clientId = "25722280879-r97hgd7ff9n76u59n7rrimh39ctmrutj.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
           handleLogin(credentialResponse.credential);
        }}
        onError={() => {console.log("errrrrr")}}
        theme="filled_blue"
        className="min-w-full"
        size="large"
      />
      </GoogleOAuthProvider>
    </div>
  );
};

export default MyButton;
