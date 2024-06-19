import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FaGithub,
  FaUser,
  FaLock,
  FaRegCircle,
  FaRegCheckCircle,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const { login, isRememberUser, setIsRememberUser } = useAuth();

  const router = useRouter();

  function toggleRememberMe(e) {
    setIsRememberUser((prevState) => !prevState);
  }

  function onEmailInputChange(e) {
    setEmail(e.target.value);

    if (e.target.value.trim() === "") {
      setIsEmailEmpty(true);
    } else {
      setIsEmailEmpty(false);
    }
  }

  function onPasswordInputChange(e) {
    setPassword(e.target.value);

    if (e.target.value.trim() === "") {
      setIsPasswordEmpty(true);
    } else {
      setIsPasswordEmpty(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setIsRememberUser((prevState) => !prevState);
    }
  }

  async function onLogin(e) {
    e.preventDefault();

    if (email.trim() === "") {
      setIsEmailEmpty(true);
      return;
    } else if (password.trim() === "") {
      setIsPasswordEmpty(true);
      return;
    }

    const loginForm = {
      email,
      password,
    };

    login(loginForm, isRememberUser);
  }

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex w-full h-full gap-6 items-center min-h-svh xl:gap-12">
        <div className="hidden w-1/2 lg:block">
          <img className="w-full h-auto" src="/programming-amico.svg" />
        </div>
        <div className="flex-1 max-w-lg mx-auto lg:max-w-full">
          <form
            onSubmit={onLogin}
            className="flex flex-col gap-8 w-full mx-auto px-8 py-8 bg-teal-500 shadow-lg rounded-lg"
          >
            <h3 className="text-2xl text-center p-4 text-gray-50">
              Login to{" "}
              <Link className="font-extrabold" href={"/"}>
                Docu<span className="text-teal-900">Tech</span>
              </Link>
            </h3>
            <div className="flex flex-col w-full gap-6">
              <div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 w-full rounded-md">
                  <FaUser className="text-gray-400" />
                  <input
                    className="flex-1 bg-inherit focus:outline-none"
                    type="email"
                    id="email"
                    name="email"
                    onChange={onEmailInputChange}
                    placeholder="Email address"
                  />
                </div>
                {isEmailEmpty && (
                  <small className="text-red-600">* Email is required!</small>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 w-full rounded-md">
                  <FaLock className="text-gray-400" />
                  <input
                    className="flex-1 bg-inherit focus:outline-none"
                    type="password"
                    id="password"
                    name="password"
                    onChange={onPasswordInputChange}
                    placeholder="Password"
                  />
                </div>
                {isPasswordEmpty && (
                  <small className="text-red-600">
                    * Password is required!
                  </small>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between w-full text-sm">
              <div className="flex items-center gap-1">
                <span
                  className="cursor-pointer"
                  id="remember-me"
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  onClick={toggleRememberMe}
                >
                  {isRememberUser ? <FaRegCheckCircle /> : <FaRegCircle />}
                </span>
                <span className="cursor-default" onClick={toggleRememberMe}>
                  Remember me
                </span>
              </div>
              <Link href={"/forgot-password"}>Forgot password?</Link>
            </div>

            <button
              className="flex gap-1 items-center justify-center px-4 py-2 bg-teal-900 text-gray-50 rounded-md w-full hover:opacity-75 transition-all duration-300"
              type="submit"
            >
              <span>Login</span>
            </button>

            <div className="flex gap-2 items-center">
              <hr className="flex-1 border-teal-900" />
              <span>or continue with</span>
              <hr className="flex-1 border-teal-900" />
            </div>

            <div className="flex items-end w-full gap-2">
              <button
                className="flex items-center justify-center gap-1 px-4 py-2 bg-gray-900 text-gray-50 rounded-md w-full hover:opacity-75 transition-all duration-300"
                type="button"
              >
                <FaGithub className="text-lg" /> <span>GitHub</span>
              </button>
              <button
                className="flex items-center justify-center gap-1 px-4 py-2 bg-gray-50 text-gray-500 rounded-md w-full hover:opacity-75 transition-all duration-300"
                type="button"
              >
                <FcGoogle className="text-lg" /> <span>Google</span>
              </button>
            </div>

            <div className="mx-auto text-teal-900">
              <p>
                New here?{" "}
                <Link
                  href={"/signup"}
                  className="text-gray-50 hover:opacity-75 transition-all duration-300"
                >
                  Signup now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
