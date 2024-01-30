import Link from "next/link";
import React from "react";
export default function Home() {
  return (
    <>
      <h1 className="text-5xl text-red-600 font-semibold">You are here !!</h1>
      <Link href="/auth/login">Login here</Link>
      
    </>
  );
}
