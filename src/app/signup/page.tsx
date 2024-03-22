"use client";
import { useRouter } from "next/navigation";
import { Button } from "../components/Button";
import InputBox from "../components/InputBox";
import Link from "next/link";
import React, { useRef } from "react";

type FormInputs = {
  email: string;
  password: string;
};

const SignupPage = () => {

  const router = useRouter();
  const register = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_API}` + "/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: data.current.email,
        password: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      // alert(res.statusText);
      return;
    }
    const response = await res.json();
    // alert("User Registered!");
    // console.log({ response });
    router.push("/?noti=true");
  };
  const data = useRef<FormInputs>({
    email: "",
    password: "",
  });
  return (
    <div className="m-2 border rounded overflow-hidden shadow w-1/2 mx-auto">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
        Sign up
      </div>
      <div className="p-2 flex flex-col gap-6">
        <InputBox
          name="email"
          labelText="Email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <InputBox
          name="password"
          labelText="password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <Button onClick={register}>Submit</Button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;