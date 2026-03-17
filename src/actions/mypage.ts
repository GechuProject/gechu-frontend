"use server";

import axios from "axios";

// Node.js 환경에서 동작하는 Server Action
const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// token을 인자로 전달받아 인증 요청 수행
export async function verifyPasswordAction(
  password: string,
  token: string
): Promise<boolean> {
  try {
    const { status } = await axios.post(
      `${apiBaseURL}/api/v1/users/me/verify-password/`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return status === 200;
  } catch (error) {
    console.error("Password verification error in Server Action:", error);
    return false;
  }
}
