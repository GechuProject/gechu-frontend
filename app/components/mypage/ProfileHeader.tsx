"use client";

import { motion } from "motion/react";
import { User, Mail, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/src/api/auth";
import { useAuth } from "@/src/contexts/AuthContext";
import styles from "./ProfileHeader.module.scss";

interface ProfileHeaderProps {
  nickname: string;
  email: string;
  bio: string;
  profileImgUrl?: string | null;
  isAdultVerified?: boolean;
}

export function ProfileHeader({
  nickname,
  email,
  bio,
  profileImgUrl,
  isAdultVerified = false,
}: ProfileHeaderProps) {
  const router = useRouter();
  const { clearAuth } = useAuth();
  const [imgError, setImgError] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // API 실패해도 로컬 로그아웃 진행
    } finally {
      clearAuth();
      router.push("/");
    }
  };

  const handleAdultVerification = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    // 백엔드의 성인인증 시작 엔드포인트로 이동
    window.location.href = `${baseUrl.replace(
      /\/$/,
      ""
    )}/api/v1/users/me/adult-verifications/initiate/`;
  };

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.avatar}>
          <motion.div
            className={styles.avatarCircle}
            whileHover={{ scale: 1.05 }}
          >
            {profileImgUrl && !imgError ? (
              <Image
                src={profileImgUrl}
                alt={nickname}
                fill
                style={{ objectFit: "cover", borderRadius: "50%" }}
                sizes="(max-width: 768px) 80px, 128px"
                onError={() => setImgError(true)}
              />
            ) : (
              <User style={{ width: "4rem", height: "4rem", color: "#000" }} />
            )}
          </motion.div>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.nicknameWrapper}>
            <h1 className={styles.nickname}>{nickname}</h1>
            <div className={styles.adultVerification}>
              {isAdultVerified ? (
                <span className={styles.verifiedBadge}>성인인증 완료</span>
              ) : (
                <>
                  <span className={styles.unverifiedBadge}>성인인증 미완</span>
                  <button
                    className={styles.verifyBtn}
                    onClick={handleAdultVerification}
                  >
                    성인인증 하기
                  </button>
                </>
              )}
            </div>
          </div>
          <p className={styles.email}>
            <Mail style={{ width: "1rem", height: "1rem" }} />
            {email}
          </p>
          <p className={styles.bio}>{bio}</p>

          <div className={styles.actions}>
            <Link href="/edit-profile">
              <motion.button
                className={styles.editBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings style={{ width: "1rem", height: "1rem" }} />
                내정보 수정
              </motion.button>
            </Link>

            <motion.button
              className={styles.logoutBtn}
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut style={{ width: "1rem", height: "1rem" }} />
              로그아웃
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
