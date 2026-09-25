import type { AppClient } from "~~/shared/types/models";

export const useAuth = () => {
  const userCookie = useCookie<AppClient | null>("auth_user", {
    default: () => null,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  const user = useState<AppClient | null>("auth_user", () => userCookie.value);

  const isAuthenticated = computed(() => Boolean(user.value));

  const setUser = (newUser: AppClient | null) => {
    user.value = newUser;
    userCookie.value = newUser;
  };

  const clearUser = () => {
    user.value = null;
    userCookie.value = null;
  };

  const signOut = async () => {
    try {
      await $fetch("/api/auth/sign-out", { method: "POST" });
    } catch (error) {
      console.error(error);
    } finally {
      clearUser();
      const localePath = useLocalePath();
      await navigateTo(localePath("/auth/sign-in"));
    }
  };

  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
    signOut,
  };
};
