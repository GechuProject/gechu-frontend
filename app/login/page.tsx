"use client";

import { useState } from "react";
import { AuthBackground } from "@/app/components/common/AuthBackground";
import { LoginLogo } from "@/app/components/login/LoginLogo";
import { LoginForm } from "@/app/components/login/LoginForm";
import styles from "./page.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgPattern}>
        <AuthBackground />
      </div>

      <div className={styles.inner}>
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
