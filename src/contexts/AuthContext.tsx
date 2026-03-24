"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthMeResponse } from "@/src/api/auth";
import { fetchAuthMe } from "@/src/api/auth";
import { fetchUserProfile, type UserProfile } from "@/src/api/mypage";
import { AUTH_INVALID_EVENT } from "@/src/lib/authEvents";
import { clearCsrfTokenMemory } from "@/src/lib/api";

type AuthContextValue = {
  /** GET /api/v1/auth/me/ 응답 */
  authUser: AuthMeResponse | null;
  /** GET /api/v1/users/me/ — UI용 상세 프로필 */
  profile: UserProfile | null;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  refreshAuth: () => Promise<void>;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthMeResponse | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    setIsAuthLoading(true);
    try {
      const me = await fetchAuthMe();
      if (!me) {
        setAuthUser(null);
        setProfile(null);
        return;
      }
      setAuthUser(me);
      const p = await fetchUserProfile();
      setProfile(p);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  useEffect(() => {
    const onInvalid = () => {
      setAuthUser(null);
      setProfile(null);
      setIsAuthLoading(false);
    };
    window.addEventListener(AUTH_INVALID_EVENT, onInvalid);
    return () => window.removeEventListener(AUTH_INVALID_EVENT, onInvalid);
  }, []);

  const clearAuth = useCallback(() => {
    clearCsrfTokenMemory();
    setAuthUser(null);
    setProfile(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      authUser,
      profile,
      isLoggedIn: !!authUser,
      isAuthLoading,
      refreshAuth,
      clearAuth,
    }),
    [authUser, profile, isAuthLoading, refreshAuth, clearAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth는 AuthProvider 안에서만 사용할 수 있습니다.");
  }
  return ctx;
}
