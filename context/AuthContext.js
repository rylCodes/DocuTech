import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { server } from "@/config";
import { setCookie, getCookie, removeCookie } from "../utils/cookies.js";
import { Toast } from "@/utils/Toast.js";
import swal from "sweetalert";
import { delay } from "@/utils/delay.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [isRememberUser, setIsRememberUser] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const storedcurrentUser =
        localStorage.getItem("currentUser") ||
        sessionStorage.getItem("currentUser");

      const storedEmail =
        localStorage.getItem("email") || sessionStorage.getItem("email");

      if (storedToken) {
        setIsAuthenticated(true);
        setCookie("token", JSON.parse(storedToken), 365);
        setToken(JSON.parse(storedToken));
        setEmail(JSON.parse(storedEmail));
        setIsRememberUser(true);
        storedcurrentUser && setCurrentUser(JSON.parse(storedcurrentUser));
      }
    }

    return () => {
      removeCookie("token");
    };
  }, []);

  async function login(userData) {
    try {
      const response = await axios.post(`${server}/api/login`, userData);

      if (response.status !== 201) {
        console.error(response);
        alert("Unexpected error occured. Failed to login!");
        return;
      }

      const result = await response.data;
      console.log(result);

      if (typeof window !== "undefined") {
        if (isRememberUser) {
          localStorage.setItem("token", JSON.stringify(result.token));
          localStorage.setItem("currentUser", JSON.stringify(result.user.name));
          localStorage.setItem("userId", JSON.stringify(result.user.id));
          localStorage.setItem("email", JSON.stringify(result.user.email));
        } else {
          sessionStorage.setItem("token", JSON.stringify(result.token));
          sessionStorage.setItem("userId", JSON.stringify(result.user.id));
          sessionStorage.setItem("email", JSON.stringify(result.user.email));
          sessionStorage.setItem(
            "currentUser",
            JSON.stringify(result.user.name)
          );
        }
        setCookie("token", result.token, 365);
        setToken(result.token);
        setEmail(result.user.email);
      }

      setCurrentUser(result.user.name);
      setIsAuthenticated(true);
      router.push("/");

      Toast.fire({
        icon: "success",
        title: result.message,
      });
    } catch (error) {
      if (error.response) {
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "An error occured! Please try again later.",
        });
      }
      console.error("Failed to login!", error);
    }
  }

  async function signup(userFields) {
    try {
      const response = await axios.post(`${server}/api/register`, userFields);

      if (!response.status === 201) {
        console.error(response);
        Toast.fire({
          icon: "error",
          title: "Unexpected error occured. Failed to signup!",
        });
        return;
      }

      const result = await response.data;

      if (typeof window !== "undefined") {
        if (isRememberUser) {
          localStorage.setItem("token", JSON.stringify(result.token));
          localStorage.setItem("currentUser", JSON.stringify(result.user.name));
          localStorage.setItem("userId", JSON.stringify(result.user.id));
          localStorage.setItem("email", JSON.stringify(result.user.email));
        } else {
          sessionStorage.setItem("token", JSON.stringify(result.token));
          sessionStorage.setItem("userId", JSON.stringify(result.user.id));
          sessionStorage.setItem("email", JSON.stringify(result.user.email));
          sessionStorage.setItem(
            "currentUser",
            JSON.stringify(result.user.name)
          );
        }
        setCookie("token", result.token, 365);
        setToken(result.token);
        setEmail(result.user.email);
      }

      setCurrentUser(result.user.name);
      setIsAuthenticated(true);
      router.push("/");
      Toast.fire({
        icon: "success",
        title: result.message,
      });
    } catch (error) {
      if (error.response) {
        const errorMessages = error.response.data.errors;
        Toast.fire({
          icon: "error",
          title:
            (errorMessages.name && errorMessages.name[0]) ||
            (errorMessages.email && errorMessages.email[0]) ||
            (errorMessages.password && errorMessages.password[0]),
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "An error occured! Please try again later.",
        });
      }
      console.error("Failed to signup!", error);
    }
  }

  function logout() {
    swal({
      text: "Are you sure you want to log out?",
      buttons: ["Cancel", "Logout"],
      dangerMode: true,
    }).then(async (willLogout) => {
      if (willLogout) {
        await delay(100);
        if (typeof window !== "undefined") {
          if (isRememberUser) {
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("email");
            localStorage.removeItem("userId");
          } else {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("currentUser");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("userId");
          }
        }

        removeCookie("token");
        setIsAuthenticated(false);
        setToken(null);
        router.push("/");

        Toast.fire({
          icon: "success",
          title: "You've successfully logged out.",
        });
      } else {
        return;
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isRememberUser,
        currentUser,
        email,
        token,
        setIsRememberUser,
        setIsAuthenticated,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
