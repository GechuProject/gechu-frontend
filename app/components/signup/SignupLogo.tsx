"use client";

import { motion } from "motion/react";
import { Gamepad2 } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";

export function SignupLogo() {
  return (
    <div className="mb-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-6 inline-block"
      >
        <Icon3D>
          <Gamepad2 className="h-20 w-20 text-[#E4FF30]" />
        </Icon3D>
      </motion.div>
      <h1 className="mb-2 text-4xl font-bold text-white">Gechu 가입하기</h1>
      <p className="text-white/50">취향에 맞는 게임을 추천받아 보세요</p>
    </div>
  );
}
