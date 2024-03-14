"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [jwtToken, setJwtToken] = useState('');


  return (
    <div>
      <h1>Generated JWT Token:</h1>
      <pre>{jwtToken}</pre>
    </div>
  );
}
