import React from "react";
import logo from "../../assets/general/logo.png";
import profileIcon from "../../assets/icons/profileIcon.png";
import wishlistIcon from "../../assets/icons/whishListIcon.png";
import "../pages/Home.css";

const Navbar = ({ activePage = "home" }) => {
  const handleNavigation = (page) => {
    if (page === "explore") window.navigateToExplore?.();
    if (page === "home") window.navigateToHome?.();
    if (page === "profile") window.navigateToProfile?.();
  };

  return (
    <nav className="navbar">
      {/* Logo + Brand Name */}
      <div
        className="logo"
        onClick={() => handleNavigation("home")}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Mind Trip" style={{ width: "85px" }} />
        {/* <span className="brand-name">Mind Trip</span> */}
      </div>

      {/* Nav Links */}
      <ul className="nav-links">
        <li
          className={activePage === "home" ? "active" : ""}
          onClick={() => handleNavigation("home")}
        >
          Home
        </li>
        <li>AI Planner</li>
        <li
          className={activePage === "explore" ? "active" : ""}
          onClick={() => handleNavigation("explore")}
        >
          Explore
        </li>
        <li>Tour packages</li>
        <li>About Us</li>
      </ul>

      {/* Right Icons */}
      <div className="nav-right">
        {/* Wishlist */}
        <button className="nav-icon-btn" title="Wishlist">
          <img src={wishlistIcon} alt="wishlist" style={{ width: "24px" }} />
        </button>

        {/* Profile */}
        <button
          className="nav-icon-btn"
          title="Profile"
          onClick={() => handleNavigation("profile")}
        >
          <img src={profileIcon} alt="profile" style={{ width: "24px" }} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
