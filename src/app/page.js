'use client';
import SignIn from "@/components/SignIn/SignIn";
import MainBlock from "@/components/MainBlock/MainBlock";
import { useState } from "react";

export default function Home() {
  const [signIn, setSignIn] = useState(false);

  return (
    <>
      { signIn ? <MainBlock/> : <SignIn signIn={signIn} setSignIn={setSignIn}/> }  
    </>
  )
}
