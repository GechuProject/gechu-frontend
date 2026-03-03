"use client";

import { useState } from "react";
import { AuthBackground } from "@/app/components/common/AuthBackground";
import { SignupLogo } from "@/app/components/signup/SignupLogo";
import { SignupForm } from "@/app/components/signup/SignupForm";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 pt-40">
      <AuthBackground />

      <div className="relative w-full max-w-md">
        <SignupLogo />
        <SignupForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
