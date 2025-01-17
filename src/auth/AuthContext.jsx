import { createContext, useLayoutEffect, useState, useEffect } from "react";
import { useContext } from "react";
import { decrypt, deserializeUser } from "@/components/tools/Cryptography";
import { api } from "@/api/api";

const AuthContext = createContext();
const useAuth = () => {
  const auth = useContext(AuthContext);

  if (auth === undefined) throw new Error("Auth is not defined");

  return auth;
};

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const aToken = localStorage.getItem(
      import.meta.env.VITE_BASE_LOCAL_STORAGE_ACCESS_KEY
    );
    const rToken = localStorage.getItem(
      import.meta.env.VITE_BASE_LOCAL_STORAGE_REFRESH_KEY
    );
    const retrivedUser = localStorage.getItem(
      import.meta.env.VITE_BASE_LOCAL_STORAGE_USER_KEY
    );

    setAccessToken(aToken ? decrypt(aToken) : "");
    setRefreshToken(rToken ? decrypt(rToken) : "");
    setUser(retrivedUser ? deserializeUser(retrivedUser) : undefined);
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && accessToken
          ? `Bearer ${accessToken}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      return api.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status === 403 &&
          error.response.data.code === "token_not_valid"
        ) {
          try {
            const response = await api.get("/api/user/token/refresh/");
          } catch {
            setAccessToken(null);
          }
        }
      }
    );
  });

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setAccessToken: setAccessToken,
        setRefreshToken: setRefreshToken,
        setUser: setUser,
        accessToken: accessToken,
        refreshToken: refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
