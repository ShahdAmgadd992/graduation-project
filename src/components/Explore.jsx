import React, { useState, useRef, useEffect } from "react";
import "./Explore.css";
import logo from "../assets/logo.png";
import exploreBg from "../assets/explore/explore.jpg";

import AttractionsIcon from "../assets/explore/Attractions.svg";
import ExperiencesIcon from "../assets/explore/Experiences.svg";
import NightToursIcon from "../assets/explore/Night_tours.svg";
import TravelServiceIcon from "../assets/explore/Travel_service.svg";
import DayToursIcon from "../assets/explore/DayTours.svg";
import GroupIcon from "../assets/explore/Group.svg";

const cities = [
  "Cairo", "Giza", "Alexandria", "Luxor", "Aswan", "Hurghada",
  "Sharm El-Sheikh", "Dahab", "Siwa", "Marsa Matruh", "Saint Catherine",
  "Port Said", "Suez", "Ismailia", "Mansoura", "Tanta", "Zagazig",
  "Minya", "Sohag", "Qena", "Beni Suef", "Faiyum", "Asyut",
  "Damanhur", "Kafr El-Sheikh", "Damietta", "Beheira", "Sharqia",
  "Monufia", "Gharbia", "Dakahlia", "North Sinai", "South Sinai",
  "Red Sea", "New Valley", "Matrouh",
];

const categories = [
  { icon: AttractionsIcon, label: "Attractions" },
  { icon: ExperiencesIcon, label: "Experiences" },
  { icon: DayToursIcon, label: "Day Tours" },
  { icon: NightToursIcon, label: "Night Tours" },
  { icon: TravelServiceIcon, label: "Travel Services" },
  { icon: GroupIcon },
];

const Explore = () => {
  const [selectedCity, setSelectedCity] = useState("Cairo");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (page) => {
    if (page === "home") window.navigateToHome?.();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery} in ${selectedCity}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <div className="explore-container" style={{ backgroundImage: `url(${exploreBg})` }}>
        <div className="overlay" />

        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="Mind Trip" style={{ width: "80px" }} />
          </div>
          <ul className="nav-links">
            <li onClick={() => handleNavigation("home")}>Home</li>
            <li className="active">Explore</li>
            <li onClick={() => handleNavigation("about")}>About Us</li>
            <li onClick={() => handleNavigation("packages")}>Tour Packages</li>
            <li onClick={() => handleNavigation("planner")}>Ai Planner</li>
          </ul>
          <div className="nav-right">
            <span className="lang">🌐 EN ▾</span>
            <span className="menu-icon">☰</span>
          </div>
        </nav>

        <div className="explore-content" style={{ marginLeft: "15%" }}>
          <h1>Discover more</h1>
          <div className="search-container">
            <div className="custom-select-wrapper" ref={dropdownRef}>
              <div
                className={`custom-select-trigger ${dropdownOpen ? "open" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{selectedCity}</span>
                <svg
                  className={`chevron ${dropdownOpen ? "rotate" : ""}`}
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {dropdownOpen && (
                <div className="custom-dropdown-menu">
                  {cities.map((city) => (
                    <div
                      key={city}
                      className={`custom-dropdown-item ${selectedCity === city ? "selected" : ""}`}
                      onClick={() => {
                        setSelectedCity(city);
                        setDropdownOpen(false);
                      }}
                    >
                      {city}
                      {selectedCity === city && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="#5596fe" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              className="search-input"
              placeholder="Search attractions and tours"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍 Search
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="categories-bar">
        <div className="categories-list">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`category-item ${activeCategory === index ? "active" : ""}`}
              onClick={() => setActiveCategory(index)}
            >
              <img src={cat.icon} alt={cat.label} className="category-icon" />
              {cat.label && <span>{cat.label}</span>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;