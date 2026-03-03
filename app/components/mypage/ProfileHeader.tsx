"use client";

import { motion } from "motion/react";
import { User, Mail, Settings, LogOut } from "lucide-react";
import Link from "next/link";

interface ProfileHeaderProps {
  nickname: string;
  email: string;
  bio: string;
}

/** 마이페이지 프로필 헤더 */
export function ProfileHeader({ nickname, email, bio }: ProfileHeaderProps) {
  return (
    <div className="mb-8 rounded-lg border border-white/10 bg-white/5 p-8">
      <div className="flex items-start gap-8">
        {/* Avatar */}
        <div className="shrink-0">
          <motion.div
            className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#E4FF30] to-[#b8cc26]"
            whileHover={{ scale: 1.05 }}
          >
            <User className="h-16 w-16 text-black" />
          </motion.div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="mb-2 text-4xl font-bold text-white">{nickname}</h1>
          <p className="mb-4 flex items-center gap-2 text-white/50">
            <Mail className="h-4 w-4" />
            {email}
          </p>
          <p className="mb-6 text-white/70">{bio}</p>

          <div className="flex gap-3">
            <Link href="/edit-profile">
              <motion.button
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#E4FF30] px-6 py-2 font-bold text-black transition-all hover:bg-[#d4ef20]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="h-4 w-4" />
                내정보 수정
              </motion.button>
            </Link>

            <motion.button
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-2 text-white transition-all hover:bg-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
