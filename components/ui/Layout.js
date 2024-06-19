import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useAuth } from "../../context/AuthContext";

export default function Layout({ children }) {
  const router = useRouter();

  const [isCreatingNewDocs, setIsCreatingNewDocs] = useState(false);
  const [isUpdatingDocs, setIsUpdatingDocs] = useState(false);
  const { isAuthenticated, logout, currentUser } = useAuth();

  const [isMainPage, setIsMainPage] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      if (
        router.pathname === "/login" ||
        router.pathname === "/signup" ||
        router.pathname === "/forgot-password"
      ) {
        setIsMainPage(false);
      } else {
        setIsMainPage(true);
      }
    }
  }, [router.isReady, router.pathname]);

  async function handleCreateButton() {
    const storedFormdata = localStorage.getItem("formData");

    if (!isCreatingNewDocs) {
      await router.push("/create");
      setIsCreatingNewDocs(true);
      setIsUpdatingDocs(false);
    } else {
      if (storedFormdata) {
        if (
          confirm(
            "You are about to discard your changes. Are you sure you want to cancel?"
          )
        ) {
          localStorage.removeItem("formData");
        } else {
          return;
        }
      }

      await router.push("/");
      setIsCreatingNewDocs(false);
    }
  }

  async function handleUpdateButton() {
    const storedFormdata = localStorage.getItem("formData");

    if (!isUpdatingDocs && router.isReady) {
      await router.push(`/update/${router.query.slug}`);
      setIsUpdatingDocs(true);
      setIsCreatingNewDocs(false);
    } else {
      if (storedFormdata) {
        if (
          confirm(
            "You are about to discard your changes. Are you sure you want to cancel?"
          )
        ) {
          localStorage.removeItem("formData");
        } else {
          return;
        }
      }

      await router.push(`/documentation/${router.query.slug}`);
      setIsUpdatingDocs(false);
    }
  }

  const childerenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        handleCreateButton,
        setIsCreatingNewDocs,
        setIsUpdatingDocs,
        isCreatingNewDocs,
        isUpdatingDocs,
      });
    }

    return child;
  });

  return (
    <div className="text-gray-700 bg-gray-50">
      {isMainPage && (
        <Header
          logout={logout}
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
          handleCreateButton={handleCreateButton}
          isCreatingNewDocs={isCreatingNewDocs}
          setIsCreatingNewDocs={setIsCreatingNewDocs}
          handleUpdateButton={handleUpdateButton}
          isUpdatingDocs={isUpdatingDocs}
          setIsUpdatingDocs={setIsUpdatingDocs}
        />
      )}
      <main className={`${isMainPage ? "mt-[4.5rem] cstm-min-h" : ""}`}>
        {childerenWithProps}
      </main>
      {isMainPage && <Footer />}
    </div>
  );
}
