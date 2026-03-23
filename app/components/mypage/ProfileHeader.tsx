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
}

export function ProfileHeader({
  nickname,
  email,
  bio,
  profileImgUrl,
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
          <h1 className={styles.nickname}>{nickname}</h1>
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
