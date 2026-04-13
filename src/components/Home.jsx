import React from "react";
import "./Home.css";
import bgImage from "../assets/egypt-bg.png";
import logo from "../assets/logo.png";
import locationIcon from "../assets/location-icon.jpeg";

const Home = () => {
  return (
    <>
      <div
        className="home-container"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay" />

        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="Mind Trip" style={{ width: "80px" }} />
          </div>
          <ul className="nav-links">
            <li className="active">Home</li>
            <li>Explore</li>
            <li>About Us</li>
            <li>Tour Packages</li>
            <li>Ai Planner</li>
          </ul>
          <div className="nav-right">
            <span className="lang">🌐 EN ▾</span>
            <span className="menu-icon">☰</span>
          </div>
        </nav>

        <div className="hero-content">
          <h1>Egypt</h1>
          <p>
            Plan smart, travel better, AI-powered itineraries, custom schedules,
            and budget optimization.
          </p>
          <button className="book-btn">Book Now</button>
        </div>

        <div className="stats">
          <div className="stat-item">
            <h3>10K</h3>
            <p>Total Customers</p>
          </div>
          <div className="divider" />
          <div className="stat-item">
            <h3>01+</h3>
            <p>Years Of Experience</p>
          </div>
          <div className="divider" />
          <div className="stat-item">
            <h3>1k</h3>
            <p>Total Destinations</p>
          </div>
          <div className="divider" />
          <div className="stat-item">
            <h3>7.0</h3>
            <p>Average rating</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>
          <span className="blue">How </span>MindTrip
          <span className="blue"> Works</span>
        </h2>
        <p className="how-subtitle">
          Best-value trips designed by AI. We balance experiences, stays, and
          activities to get you the best trip within your budget.
        </p>
        <div className="cards-container">
          <div className="card">
            <div className="card-icon">
              <img
                src={locationIcon}
                alt="location"
                style={{ width: "50px" }}
              />
            </div>
            <p>
              <span className="blue">Tell</span> us{" "}
              <span className="blue">your</span>
              <br />
              <strong>travel</strong> <span className="blue">style</span>
            </p>
          </div>
          <div className="card">
            <div className="card-icon">✨</div>
            <p>
              <span className="blue">AI</span> <strong>builds</strong>{" "}
              <span className="blue">your</span>
              <br />
              <strong>plan</strong>
            </p>
          </div>
          <div className="card">
            <div className="card-icon">📈</div>
            <p>
              <span className="blue">Travel</span> <strong>better</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
