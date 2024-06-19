import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import axios from "axios";
import { server } from "@/config";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function signup() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  const { signup } = useAuth();

  const router = useRouter();

  const userFields = {
    name: name,
    email: email,
    password: password,
    password_confirmation: passwordConfirmation,
  };

  async function onSignUp(e) {
    e.preventDefault();

    signup(userFields);
  }

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex w-full h-full gap-6 items-center min-h-svh xl:gap-12">
        <div className="flex-1 max-w-lg mx-auto lg:max-w-full">
          <form
            onSubmit={onSignUp}
            className="flex flex-col gap-4 w-full mx-auto px-8 py-8 bg-teal-500 shadow-lg rounded-md"
          >
            <h3 className="text-2xl text-center p-4 text-gray-50">
              Signup to{" "}
              <Link className="font-extrabold" href={"/"}>
                Docu<span className="text-teal-900">Tech</span>
              </Link>
            </h3>
            <div className="flex flex-col w-full gap-2">
              <label className="text-gray-50" htmlFor="name">
                Name:
              </label>
              <input
                className="px-4 py-2 focus:outline-none rounded-md"
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="text-gray-50" htmlFor="email">
                Email:
              </label>
              <input
                className="px-4 py-2 focus:outline-none rounded-md"
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter valid email..."
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="text-gray-50" htmlFor="password">
                Password:
              </label>
              <input
                className="px-4 py-2 focus:outline-none rounded-md"
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="text-gray-50" htmlFor="password_confirmation">
                Confirm password:
              </label>
              <input
                className="px-4 py-2 focus:outline-none rounded-md"
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Confirm password..."
              />
            </div>

            <button
              className="flex gap-1 items-center justify-center px-4 py-2 bg-teal-900 text-gray-50 rounded-md mt-14 w-full hover:opacity-75 transition-all duration-300"
              type="submit"
            >
              <span>Signup</span>
            </button>

            <div className="mx-auto mt-6 text-teal-900">
              <p>
                Already have an account?{" "}
                <Link
                  href={"/login"}
                  className="text-gray-50 hover:opacity-75 transition-all duration-300"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="hidden w-1/2 lg:block">
          <img className="w-full h-auto" src="/login-pana.svg" />
        </div>
      </div>
    </div>
  );
}
