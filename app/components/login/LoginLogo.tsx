"use client";

import { motion } from "motion/react";
import { Gamepad2 } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";

export function LoginLogo() {
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
      <h1 className="mb-2 text-4xl font-bold text-white">Gechu</h1>
      <p className="text-white/50">당신의 취향에 맞는 게임을 찾아드립니다</p>
    </div>
  );
}
