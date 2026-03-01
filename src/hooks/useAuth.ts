"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "USER" | "HOST" | "ADMIN";
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const { data } = api.user.me.useQuery();

  useEffect(() => {
    if (data) {
      // map DB object to frontend User
      const mappedUser: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl ?? undefined, // ✅ convert null -> undefined
        role: data.role,
      };
      setUser(mappedUser);
    }
  }, [data]);

  const logout = () => {
    window.location.href = "/api/auth/signout";
    setUser(null);
  };

  return { user, logout };
}
