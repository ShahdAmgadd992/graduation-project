import { useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  // Simple routing without react-router
  const [currentPage, setCurrentPage] = useState("signup");

  useEffect(() => {
    const updatePageFromPath = () => {
      const path = window.location.pathname;
      if (path === "/signin" || path === "/sign-in") {
        setCurrentPage("signin");
      } else {
        setCurrentPage("signup");
      }
    };

    updatePageFromPath();

    const handlePopState = () => {
      updatePageFromPath();
    };

    window.addEventListener("popstate", handlePopState);

    window.navigateToSignIn = () => {
      window.history.pushState({}, "", "/signin");
      setCurrentPage("signin");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.navigateToSignUp = () => {
      window.history.pushState({}, "", "/");
      setCurrentPage("signup");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return () => {
      window.removeEventListener("popstate", handlePopState);
      delete window.navigateToSignIn;
      delete window.navigateToSignUp;
    };
  }, []);

  return <>{currentPage === "signup" ? <SignUp /> : <SignIn />}</>;
}

export default App;
