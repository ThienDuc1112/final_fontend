import React from "react";
import Image from 'next/image'
const MyButton = ({name}) => {
    const handleGoogleLogin = () => {

    }
    return (
        <button onClick={handleGoogleLogin}
        className="btn-social mt-6 mb-5"
        >
        <Image src="/images/google.jpg" width={40} height={40} alt="google" />
        <span className="hidden md:block">{name} with google</span>
        </button>
    )
} 

export default MyButton;