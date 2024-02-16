import React from "react";
import Image from "next/image";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

const MyButton = ({ name}) => {
  return (
    <div className="btn-social mt-6 mb-5">
      <Image src="/images/google.jpg" width={40} height={40} alt="google" />
      <span className="hidden md:block">{name} with google</span>
      <GoogleOAuthProvider clientId = "25722280879-r97hgd7ff9n76u59n7rrimh39ctmrutj.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {console.log("errrrrr")}}
      />
      </GoogleOAuthProvider>
    </div>
  );
};

export default MyButton;
