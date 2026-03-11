"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthBackground } from "@/app/components/common/AuthBackground";
import { LoginLogo } from "@/app/components/login/LoginLogo";
import { LoginForm } from "@/app/components/login/LoginForm";
import { login, ACCESS_TOKEN_KEY } from "@/src/api/auth";
import { AxiosError } from "axios";
import styles from "./page.module.scss";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { access_token } = await login(email, password);
      if (typeof window !== "undefined") {
        localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
      }
      router.push("/");
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ??
        "로그인에 실패했습니다. 다시 시도해 주세요.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
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
          error={error}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
