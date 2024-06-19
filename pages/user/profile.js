import Meta from "@/components/Meta";
import { server } from "@/config";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "@/utils/Toast";
import swal from "sweetalert";
import { setCookie, getCookie, removeCookie } from "../../utils/cookies.js";

export default function profile() {
  const { token } = useAuth();
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
  });

  const [originalUserProfile, setOriginalUserProfile] = useState({
    name: "",
    email: "",
  });

  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEpmty] = useState(false);

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function toggleProfileform() {
    setIsProfileUpdating((prevState) => !prevState);
  }

  async function verifyPassword() {
    swal("Enter your current password:", {
      buttons: ["Cancel", "Proceed"],
      content: {
        element: "input",
        attributes: {
          placeholder: "Type your password",
          type: "password",
        },
      },
    }).then(async (value) => {
      if (!value || value.trim() === "") {
        return;
      }

      const userData = {
        email: userProfile.email,
        password: value,
      };

      try {
        const response = await axios.post(`${server}/api/login`, userData);

        if (response.status === 201) {
          setIsPasswordUpdating(true);
        } else {
          console.error(response);
          Toast.fire({
            icon: "error",
            title: "An error occured. Failed to verify password!",
          });
          setIsPasswordUpdating(false);
          return;
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data.message !== "Too Many Attempts.") {
            Toast.fire({
              icon: "error",
              title: "Failed to verify password!",
            });
          } else {
            Toast.fire({
              icon: "error",
              title: error.response.data.message,
            });
          }
        } else {
          Toast.fire({
            icon: "error",
            title: "An error occured! Please try again later.",
          });
        }
        console.error("Failed to verify password!", error);
      }
    });
  }

  function onNameChange(e) {
    setUserProfile((prevData) => ({ ...prevData, name: e.target.value }));
  }

  function onEmailChange(e) {
    setUserProfile((prevData) => ({ ...prevData, email: e.target.value }));
  }

  function onPasswordChange(e) {
    if (e.target.value.trim() === "") {
      setIsPasswordEmpty(true);
    } else {
      setIsPasswordEmpty(false);
    }
  }

  function onConfirmPasswordChange(e) {
    if (e.target.value.trim() === "") {
      setIsConfirmPasswordEpmty(true);
    } else {
      setIsConfirmPasswordEpmty(false);
    }
  }

  function onCancelUpdate() {
    if (isProfileUpdating) {
      setIsProfileUpdating(false);
      setUserProfile(originalUserProfile);

      localStorage?.getItem("currentUser")
        ? localStorage.setItem(
            "currentUser",
            JSON.stringify(originalUserProfile.name)
          )
        : sessionStorage?.getItem("currentUser")
        ? localStorage.setItem(
            "currentUser",
            JSON.stringify(originalUserProfile.name)
          )
        : "";

      localStorage?.getItem("email")
        ? localStorage.setItem(
            "email",
            JSON.stringify(originalUserProfile.email)
          )
        : sessionStorage?.getItem("email")
        ? localStorage.setItem(
            "email",
            JSON.stringify(originalUserProfile.email)
          )
        : "";
    } else if (isPasswordUpdating) {
      setIsPasswordUpdating(false);
      console.log("Cancel password update!");
    } else {
      return;
    }
  }

  async function updateProfile() {
    try {
      const response = await axios.put(
        `${server}/api/users/update`,
        userProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        console.error(response);
        return;
      }

      const result = await response.data;
      setIsProfileUpdating(false);
      setOriginalUserProfile(userProfile);

      localStorage?.getItem("currentUser")
        ? localStorage.setItem("currentUser", JSON.stringify(userProfile.name))
        : sessionStorage?.getItem("currentUser")
        ? localStorage.setItem("currentUser", JSON.stringify(userProfile.name))
        : "";

      localStorage?.getItem("email")
        ? localStorage.setItem("email", JSON.stringify(userProfile.email))
        : sessionStorage?.getItem("email")
        ? localStorage.setItem("email", JSON.stringify(userProfile.email))
        : "";

      Toast.fire({
        icon: "success",
        title: result.message,
      });
    } catch (error) {
      if (error.response.data) {
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
      console.error(error);
    }
  }

  async function changePassword() {
    const userPassword = {
      password: passwordRef.current.value || "",
      password_confirmation: confirmPasswordRef.current.value || "",
    };

    try {
      const response = await axios.put(
        `${server}/api/users/change-password`,
        userPassword,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        console.error(response);
        return;
      }

      const result = await response.data;
      setIsPasswordUpdating(false);
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";

      Toast.fire({
        icon: "success",
        title: result.message,
      });
    } catch (error) {
      if (error.response.data) {
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
      console.error(error);
    }
  }

  async function onSaveUpdate() {
    if (isProfileUpdating) {
      updateProfile();
    } else if (isPasswordUpdating) {
      changePassword();
    } else {
      return;
    }
  }

  useEffect(() => {
    const name = localStorage?.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : sessionStorage?.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : "";

    const email = localStorage?.getItem("email")
      ? JSON.parse(localStorage.getItem("email"))
      : sessionStorage?.getItem("email")
      ? JSON.parse(localStorage.getItem("email"))
      : "";

    setUserProfile(
      (prevData) =>
        (prevData = {
          name,
          email,
        })
    );

    setOriginalUserProfile(
      (prevData) =>
        (prevData = {
          name,
          email,
        })
    );
  }, []);

  return (
    <div>
      <Meta subTitle={userProfile.name} />

      <div className="py-12 px-4 w-full bg-teal-500">
        <div className="container flex flex-col gap-4 w-full mx-auto px-4">
          <div className="flex items-center gap-2 text-3xl leading-none font-bold text-gray-50 md:text-text-[2.5rem]">
            <div className="flex items-center justify-center size-16 bg-gray-50 text-teal-500 rounded-full p-3.5">
              <span className="uppercase">
                {userProfile.name && userProfile.name[0]}
              </span>
            </div>
            <h2 className="capitalize">{userProfile.name}</h2>
          </div>
          <p className="text-gray-200 text-md md:text-lg">
            {userProfile.email}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 min-h-[calc(100svh-4.5rem)]">
        <section className="flex flex-col gap-6 py-12">
          <h3 className="font-bold text-3xl">Manage Profile</h3>
          {isProfileUpdating ? (
            // Profile Form
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <input
                  id="nameInput"
                  className="px-4 py-2 outline outline-1 outline-gray-200 focus:outline focus:outline-teal-500 focus:outline-2"
                  type="text"
                  defaultValue={userProfile.name}
                  autoFocus
                  onChange={onNameChange}
                />
                {userProfile.name.trim() === "" && (
                  <small className="text-red-500 mt-1">
                    * Name field is required
                  </small>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  id="emailInput"
                  type="email"
                  className="px-4 py-2 outline outline-1 outline-gray-200 focus:outline focus:outline-teal-500 focus:outline-2"
                  defaultValue={userProfile.email}
                  onChange={onEmailChange}
                />
                {userProfile.email.trim() === "" && (
                  <small className="text-red-500 mt-1">
                    * Email field is required
                  </small>
                )}
              </div>
            </form>
          ) : isPasswordUpdating ? (
            // Password Form
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <input
                  ref={passwordRef}
                  id="passwordInput"
                  type="password"
                  placeholder="New password"
                  className="px-4 py-2 outline outline-1 outline-gray-200 focus:outline focus:outline-teal-500 focus:outline-2"
                  autoFocus
                  onChange={onPasswordChange}
                />
                {isPasswordEmpty && (
                  <small className="text-red-500 mt-1">
                    * Password field is required
                  </small>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  ref={confirmPasswordRef}
                  id="confirmPasswordInput"
                  type="password"
                  placeholder="Confirm new password"
                  className="px-4 py-2 outline outline-1 outline-gray-200 focus:outline focus:outline-teal-500 focus:outline-2"
                  onChange={onConfirmPasswordChange}
                />
                {isConfirmPasswordEmpty && (
                  <small className="text-red-500 mt-1">
                    * Confirm new password field is required
                  </small>
                )}
              </div>
            </form>
          ) : (
            <ul className="flex flex-col border">
              <li className="px-4 py-2 border-b">{userProfile.name}</li>
              <li className="px-4 py-2">{userProfile.email}</li>
            </ul>
          )}

          {(isProfileUpdating || isPasswordUpdating) && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onCancelUpdate}
                className="rounded-md px-3 py-1.5 text-red-500 hover:opacity-75 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSaveUpdate}
                className="rounded-md px-3 py-1.5 bg-teal-500 text-gray-50 hover:opacity-75 transition-all duration-300"
              >
                Save
              </button>
            </div>
          )}

          {!isProfileUpdating && !isPasswordUpdating && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleProfileform}
                className="rounded-md px-3 py-1.5 bg-teal-500 text-gray-50 hover:opacity-75 transition-all duration-300"
              >
                Edit profile
              </button>
              <button
                type="button"
                onClick={verifyPassword}
                className="rounded-md px-3 py-1.5 bg-teal-900 text-gray-50 hover:opacity-75 transition-all duration-300"
              >
                Change password
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
