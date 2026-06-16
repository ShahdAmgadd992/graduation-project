import React from "react";
import logo from "../../assets/general/logo.png";
import "../pages/Home.css";

const Navbar = ({ activePage = "home", style = {} }) => {
  const handleNavigation = (page) => {
    if (page === "explore") window.navigateToExplore?.();
    if (page === "home") window.navigateToHome?.();
    if (page === "profile") window.navigateToProfile?.();
    if (page === "aiplanner") window.navigateToAiPlanner?.();
    if (page === "calendar") window.navigateToCalendar?.();
  };

  return (
    <nav className="navbar" style={style}>
      <div
        className="logo"
        onClick={() => handleNavigation("home")}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Mind Trip" style={{ width: "85px" }} />
      </div>

      <ul className="nav-links">
        <li
          className={activePage === "home" ? "active" : ""}
          onClick={() => handleNavigation("home")}
        >
          Home
        </li>
        <li
          className={activePage === "aiplanner" ? "active" : ""}
          onClick={() => handleNavigation("aiplanner")}
        >
          AI Planner
        </li>
        <li
          className={activePage === "explore" ? "active" : ""}
          onClick={() => handleNavigation("explore")}
        >
          Explore
        </li>
        <li
          className={activePage === "calendar" ? "active" : ""}
          onClick={() => handleNavigation("calendar")}
        >
          Calendar
        </li>
        <li
          className={activePage === "aboutus" ? "active" : ""}
          onClick={() => window.navigateToAboutUs?.()}
        >
          About Us
        </li>
      </ul>

      <div className="nav-right">
        <button
          className="signin-btn"
          onClick={() => window.navigateToSignIn?.()}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
