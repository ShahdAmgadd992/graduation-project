import { useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ForgetPassword from "./components/ForgetPassword";
import VerifyEmail from "./components/VerifyEmail";
import ResetPassword from "./components/ResetPassword";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [currentPage, setCurrentPage] = useState("signup");

  useEffect(() => {
    const updatePageFromPath = () => {
      const path = window.location.pathname;
      if (path === "/signin" || path === "/sign-in") {
        setCurrentPage("signin");
      } else if (path === "/forget-password") {
        setCurrentPage("forgetPassword");
      } else if (path === "/verify-email") {
        setCurrentPage("verifyEmail");
      } else if (path === "/reset-password") {
        setCurrentPage("resetPassword");
      } else {
        setCurrentPage("signup");
      }
    };

    updatePageFromPath();

    window.addEventListener("popstate", updatePageFromPath);

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

    window.navigateToForgetPassword = () => {
      window.history.pushState({}, "", "/forget-password");
      setCurrentPage("forgetPassword");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.navigateToVerify = () => {
      window.history.pushState({}, "", "/verify-email");
      setCurrentPage("verifyEmail");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.navigateToResetPassword = () => {
      window.history.pushState({}, "", "/reset-password");
      setCurrentPage("resetPassword");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return () => {
      window.removeEventListener("popstate", updatePageFromPath);
      delete window.navigateToSignIn;
      delete window.navigateToSignUp;
      delete window.navigateToForgetPassword;
      delete window.navigateToVerify;
      delete window.navigateToResetPassword;
    };
  }, []);

  const pages = {
    signup: <SignUp />,
    signin: <SignIn />,
    forgetPassword: <ForgetPassword />,
    verifyEmail: <VerifyEmail />,
    resetPassword: <ResetPassword />,
  };

  return (
    <AuthProvider>
      <>{pages[currentPage]}</>
    </AuthProvider>
  );
}

export default App;
