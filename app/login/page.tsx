"use client";

import { useState } from "react";
import { AuthBackground } from "@/app/components/common/AuthBackground";
import { LoginLogo } from "@/app/components/login/LoginLogo";
import { LoginForm } from "@/app/components/login/LoginForm";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 pt-40">
      <AuthBackground />

      <div className="relative w-full max-w-md">
        <LoginLogo />
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
