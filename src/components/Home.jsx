import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import bgImage from "../assets/egypt-bg.png";
import bgImage2 from "../assets/egypt2.jpg";
import dahab from "../assets/dahab.jpg";
import siwa from "../assets/siwa.jpg";
import luxor from "../assets/luxor.jpg";
import aswan from "../assets/aswan.jpg";
import saintCatherine from "../assets/saintCatherine.jpg";
import alexandria from "../assets/alexandria.jpg";
import marsaMatrouh from "../assets/marsaMatrouh.jpg";
import hurghada from "../assets/hurghada.jpg";
import siwaMysticRetreat from "../assets/siwa.jpg";
import nile from "../assets/Nile.jpg";
import deepBlue from "../assets/DeepBlue.jpg";
import pyramid from "../assets/Pyramid.jpg";
import logo from "../assets/logo.png";
import locationIcon from "../assets/location-icon.png";
import aiIcon from "../assets/ai-icon.png";
import travelIcon from "../assets/travel-Icon.png";
import AiTrip from "../assets/AiTrip.png";
import smart from "../assets/smart.png";
import Hidden from "../assets/Hidden.png";
import location2 from "../assets/location2.png";
import location3 from "../assets/location3.png";
import calender from "../assets/calender.png";
import clint1 from "../assets/clint1.jpg";
import clint2 from "../assets/clint2.jpg";
import clint3 from "../assets/clint3.jpg";
import Arrow from "../assets/Arrow.png";
import airbnb from "../assets/airbnb.png";
import Uber from "../assets/Uber.png";
import TripAdvisor from "../assets/TripAdvisor.png";
import Expedia from "../assets/Expedia.png";
import booking from "../assets/booking.png";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jensen",
    role: "Digital Creator",
    rating: 4.9,
    image: clint1,
    review:
      "Mind Trip's AI planner is a lifesaver! It balanced my 4-day trip to Siwa perfectly, finding me the best eco-lodges within my tight budget. I saw things I never would've found on Google.",
  },
  {
    id: 2,
    name: "Ahmed Mamdouh",
    role: "Software Developer",
    rating: 5.0,
    image: clint2,
    review:
      "The best UI I've seen in a travel app. The AI-generated itinerary for our Luxor trip was so precise; it optimized our route to avoid crowds and saved us so much time.",
  },
  {
    id: 3,
    name: "Mona Khaled",
    role: "Travel Blogger",
    rating: 4.8,
    image: clint3,
    review:
      "I used MindTrip for my Cairo trip and the Google Maps integration was seamless. Everything was in my pocket — no need to switch between apps at all.",
  },
];

const Home = () => {
  const sliderRef = useRef(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const visibleTestimonials = [
    testimonials[currentTestimonial % testimonials.length],
    testimonials[(currentTestimonial + 1) % testimonials.length],
  ];

  const handleNavigation = (page) => {
    if (page === "explore") {
      window.navigateToExplore?.();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroContent = document.querySelector(".hero-content");
      const stats = document.querySelector(".stats");

      if (heroContent && stats) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
        stats.style.transform = `translateY(${scrolled * 0.2}px)`;
        stats.style.opacity = 1 - scrolled / 500;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      slider.style.cursor = "grabbing";
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      slider.style.cursor = "grab";
    };
    const onMouseUp = () => {
      isDown = false;
      slider.style.cursor = "grab";
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      slider.scrollLeft = scrollLeft - (x - startX) * 2;
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mousemove", onMouseMove);

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      {/* ===== Hero Section ===== */}
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
            <li onClick={() => handleNavigation("explore")}>Explore</li>
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

      {/* ===== How It Works Section ===== */}
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
              <span className="blue"> Tell</span> us{" "}
              <span className="blue">your</span>
              <br />
              <strong>travel</strong> <span className="blue">style</span>
            </p>
          </div>
          <div className="card">
            <div className="card-icon">
              <img src={aiIcon} alt="ai-icon" style={{ width: "50px" }} />
            </div>
            <p>
              <span className="blue">AI</span> <strong>builds</strong>{" "}
              <span className="blue">your</span>
              <br />
              <strong>plan</strong>
            </p>
          </div>
          <div className="card">
            <div className="card-icon">
              <img
                src={travelIcon}
                alt="travel-icon"
                style={{ width: "50px" }}
              />
            </div>
            <p>
              <span className="blue">Travel</span> <strong>better</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ===== Why Choose Section ===== */}
      <div className="why-choose">
        <div className="why-content">
          <h2>
            <span style={{ color: "#5596FE" }}>Why Travelers </span>
            Choose Mind Trip
          </h2>
          <p className="why-subtitle">
            Thoughtfully designed trips tailored to your mood, budget, and
            travel style. Discover Egypt beyond the usual, from iconic landmarks
            to hidden gems.
          </p>
          <div className="why-body">
            <div className="why-image">
              <img src={bgImage2} alt="Egypt" />
            </div>
            <div className="why-features">
              <div className="feature-card">
                <div className="feature-icon">
                  <img src={AiTrip} alt="Aitrip" style={{ width: "50px" }} />
                </div>
                <div>
                  <h4>AI Trip Planner</h4>
                  <p>
                    Our AI designs trips based on your mood, time, and travel
                    style
                  </p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <img src={smart} alt="smart" style={{ width: "50px" }} />
                </div>
                <div>
                  <h4>Smart Budget Optimizer</h4>
                  <p>
                    The best stays and activities, perfectly tailored to your
                    budget
                  </p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <img src={Hidden} alt="Hidden" style={{ width: "50px" }} />
                </div>
                <div>
                  <h4>Hidden Gems</h4>
                  <p>Discover places you won't find in typical travel guides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Popular Destinations Section ===== */}
      <div className="popular-destinations">
        <div className="popular-content">
          <h2>
            <span className="blue-text">Popular</span> Destinations
          </h2>
          <p className="popular-subtitle">
            Handpicked wonders tailored to your taste. Discover Egypt's most
            iconic spots and hidden gems.
          </p>
          <div className="destinations-row">
            <div className="dest-card short">
              <img src={dahab} alt="Dahab" />
              <div className="dest-overlay">
                <span className="dest-name">Dahab</span>
                <span className="dest-region">
                  <img
                    src={location2}
                    alt="location2"
                    style={{ width: "8px" }}
                  />{" "}
                  South Sinai
                </span>
              </div>
            </div>
            <div className="dest-card tall">
              <img src={siwa} alt="Siwa" />
              <div className="dest-overlay">
                <span className="dest-name">Siwa</span>
                <span className="dest-region">
                  <img
                    src={location2}
                    alt="location2"
                    style={{ width: "8px" }}
                  />{" "}
                  Western Desert
                </span>
              </div>
            </div>
            <div className="dest-card featured">
              <img src={luxor} alt="Luxor" />
              <div className="dest-overlay">
                <span className="dest-name">Luxor</span>
                <span className="dest-region">
                  <img
                    src={location2}
                    alt="location2"
                    style={{ width: "8px" }}
                  />{" "}
                  Upper Egypt
                </span>
              </div>
            </div>
            <div className="dest-card tall">
              <img src={aswan} alt="Aswan" />
              <div className="dest-overlay">
                <span className="dest-name">Aswan</span>
                <span className="dest-region">
                  <img
                    src={location2}
                    alt="location2"
                    style={{ width: "8px" }}
                  />{" "}
                  Nubia
                </span>
              </div>
            </div>
            <div className="dest-card saint">
              <img src={saintCatherine} alt="Saint Catherine" />
              <div className="dest-overlay">
                <span className="dest-name">Saint Catherine</span>
                <span className="dest-region">
                  <img
                    src={location2}
                    alt="location2"
                    style={{ width: "8px" }}
                  />{" "}
                  Mount Sinai
                </span>
              </div>
            </div>
          </div>
          <button className="more-btn">More destinations ↗</button>
        </div>
      </div>

      {/* ===== Explore Without Limits Section ===== */}
      <div className="explore-section">
        <div className="explore-content">
          <h2>
            <span className="blue-text">Explore</span> Without{" "}
            <span className="blue-text">Limits</span>
          </h2>
          <p className="explore-subtitle">
            Discover Egypt beyond the guidebooks. Browse through curated
            stories, vibrant cultures, and stunning destinations waiting for
            your arrival
          </p>
          <div className="explore-cards">
            <div className="explore-card">
              <img src={alexandria} alt="Alexandria" />
              <div className="explore-overlay">
                <span className="explore-name">Alexandria</span>
                <span className="explore-rating">⭐ 4.9</span>
              </div>
              <button className="arrow-btn">
                <img src={Arrow} alt="arrow" />
              </button>
            </div>
            <div className="explore-card featured-explore">
              <img src={marsaMatrouh} alt="Marsa Matrouh" />
              <div className="explore-overlay">
                <span className="explore-name">Marsa Matrouh</span>
                <span className="explore-rating">⭐ 4.9</span>
              </div>
              <button className="arrow-btn">
                <img src={Arrow} alt="arrow" />
              </button>
            </div>
            <div className="explore-card">
              <img src={hurghada} alt="Hurghada" />
              <div className="explore-overlay">
                <span className="explore-name">Hurghada</span>
                <span className="explore-rating">⭐ 4.9</span>
              </div>
              <button className="arrow-btn">
                <img src={Arrow} alt="arrow" />
              </button>
            </div>
          </div>
          <button className="more-btn">Explore More ↗</button>
        </div>
      </div>

      {/* ===== Exclusive Travel Packages Section ===== */}
      <div className="packages-section">
        <div className="packages-content">
          <h2>
            <span className="blue-text">Exclusive</span> Travel{" "}
            <span className="blue-text">Packages</span>
          </h2>
          <p className="packages-subtitle">
            Best-value trips designed by AI. We balance experiences, stays, and
            activities to get you the best trip within your budget.
          </p>
          <div className="packages-row" ref={sliderRef}>
            <div className="package-card">
              <div className="package-img">
                <img src={siwaMysticRetreat} alt="Siwa Mystic Retreat" />
              </div>
              <div className="package-info">
                <h4>Siwa Mystic Retreat</h4>
                <div className="package-meta">
                  <span>
                    <img
                      src={calender}
                      alt="calender"
                      style={{ width: "12px" }}
                    />{" "}
                    4 days
                  </span>
                  <span>
                    <img
                      src={location3}
                      alt="location3"
                      style={{ width: "12px" }}
                    />{" "}
                    Western Desert
                  </span>
                </div>
                <p className="package-price">
                  USD 60 <span>/ person</span>
                </p>
                <button className="book-now-btn">Book now</button>
              </div>
            </div>
            <div className="package-card">
              <div className="package-img">
                <img src={nile} alt="The Nile Heritage Path" />
              </div>
              <div className="package-info">
                <h4>The Nile Heritage Path</h4>
                <div className="package-meta">
                  <span>
                    <img
                      src={calender}
                      alt="calender"
                      style={{ width: "12px" }}
                    />{" "}
                    6 days
                  </span>
                  <span>
                    <img
                      src={location3}
                      alt="location3"
                      style={{ width: "12px" }}
                    />{" "}
                    Luxor & Aswan
                  </span>
                </div>
                <p className="package-price">
                  USD 60 <span>/ person</span>
                </p>
                <button className="book-now-btn">Book now</button>
              </div>
            </div>
            <div className="package-card">
              <div className="package-img">
                <img src={deepBlue} alt="Deep Blue Serenity" />
              </div>
              <div className="package-info">
                <h4>Deep Blue Serenity</h4>
                <div className="package-meta">
                  <span>
                    <img
                      src={calender}
                      alt="calender"
                      style={{ width: "12px" }}
                    />{" "}
                    5 days
                  </span>
                  <span>
                    <img
                      src={location3}
                      alt="location3"
                      style={{ width: "12px" }}
                    />{" "}
                    Marsa Alam
                  </span>
                </div>
                <p className="package-price">
                  USD 60 <span>/ person</span>
                </p>
                <button className="book-now-btn">Book now</button>
              </div>
            </div>
            <div className="package-card">
              <div className="package-img">
                <img src={pyramid} alt="The Pyramid" />
              </div>
              <div className="package-info">
                <h4>The Pyramid</h4>
                <div className="package-meta">
                  <span>
                    <img
                      src={calender}
                      alt="calender"
                      style={{ width: "12px" }}
                    />{" "}
                    1 day
                  </span>
                  <span>
                    <img
                      src={location3}
                      alt="location3"
                      style={{ width: "12px" }}
                    />{" "}
                    Giza
                  </span>
                </div>
                <p className="package-price">
                  USD 60 <span>/ person</span>
                </p>
                <button className="book-now-btn">Book now</button>
              </div>
            </div>
          </div>
          <button className="more-packages-btn">More Packages ↗</button>
        </div>
      </div>

      {/* ===== Testimonials Section ===== */}
      <div className="testimonials-section">
        <h2 className="testimonials-title">
          <span className="blue-text">What Our</span> Clients Say ?
        </h2>
        <div className="testimonials-wrapper">
          <div className="testimonials-track">
            {visibleTestimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="testimonial-card-header">
                  <img src={t.image} alt={t.name} className="client-avatar" />
                  <div className="client-info">
                    <p className="client-name">{t.name}</p>
                    <p className="client-role">{t.role}</p>
                  </div>
                  <div className="client-rating">
                    <span className="star-icon">★</span>
                    <span className="rating-value">{t.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="client-review">{t.review}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="testimonials-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentTestimonial ? "dot-active" : ""}`}
              onClick={() => setCurrentTestimonial(i)}
            />
          ))}
        </div>
      </div>

      {/* ===== Trusted Partners Section ===== */}
      <div className="partners-section">
        <h2 className="partners-title">
          <span className="blue-text">Our Trusted</span> Partners
        </h2>
        <div className="partners-row">
          <div className="partner-item">
            <img src={airbnb} alt="airbnb" style={{ width: "120px" }} />
          </div>
          <div className="partner-item">
            <img src={booking} alt="booking" style={{ width: "160px" }} />
          </div>
          <div className="partner-item">
            <img src={Uber} alt="Uber" style={{ width: "70px" }} />
          </div>
          <div className="partner-item">
            <img
              src={TripAdvisor}
              alt="TripAdvisor"
              style={{ width: "160px" }}
            />
          </div>
          <div className="partner-item">
            <img src={Expedia} alt="Expedia" style={{ width: "160px" }} />
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="footer-inner">
          {/* Brand Column */}
          <div className="footer-brand">
            <img src={logo} alt="Mind Trip Logo" className="footer-logo" />
            <p className="footer-brand-name">Mind Trip</p>
            <p className="footer-tagline">
              Smart AI, Unforgettable Journeys. Personalized Egyptian trips,
              ready in seconds
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#5596fe"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M13.5 8H15V6h-1.5C12.12 6 11 7.12 11 8.5V10H9.5v2H11v6h2v-6h1.5l.5-2H13V8.5c0-.28.22-.5.5-.5z"
                    fill="#5596fe"
                  />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="6"
                    stroke="#5596fe"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="#5596fe"
                    strokeWidth="1.8"
                  />
                  <circle cx="17.5" cy="6.5" r="1" fill="#5596fe" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="5"
                    width="20"
                    height="14"
                    rx="4"
                    stroke="#5596fe"
                    strokeWidth="1.8"
                  />
                  <polygon points="10,9 10,15 16,12" fill="#5596fe" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Pinterest">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#5596fe"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M12 7c-2.76 0-5 2.24-5 5 0 2.12 1.31 3.93 3.18 4.71-.04-.37-.08-.94.02-1.35l.56-2.38s-.14-.29-.14-.71c0-.67.39-1.17.87-1.17.41 0 .61.31.61.68 0 .41-.26 1.03-.4 1.6-.11.48.24.87.71.87.85 0 1.51-.9 1.51-2.19 0-1.15-.82-1.95-2-1.95-1.36 0-2.16 1.02-2.16 2.07 0 .41.16.85.35 1.09.04.05.04.09.03.14l-.13.54c-.02.09-.08.11-.18.07-.63-.3-1.03-1.22-1.03-1.97 0-1.6 1.16-3.07 3.35-3.07 1.76 0 3.12 1.25 3.12 2.93 0 1.75-1.1 3.15-2.63 3.15-.51 0-1-.27-1.17-.58l-.32 1.19c-.11.44-.42.99-.63 1.32.47.15.97.22 1.49.22 2.76 0 5-2.24 5-5s-2.24-5-5-5z"
                    fill="#5596fe"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-links">
            <div className="footer-col">
              <h4>About</h4>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Our Story</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press and media</a>
                </li>
                <li>
                  <a href="#">Sustainability</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Help</h4>
              <ul>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">FAQS</a>
                </li>
                <li>
                  <a href="#">How to book</a>
                </li>
                <li>
                  <a href="#">Travel insurance</a>
                </li>
                <li>
                  <a href="#">Live Chat</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="#">Terms and conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Cookies Policy</a>
                </li>
                <li>
                  <a href="#">User Agreement</a>
                </li>
                <li>
                  <a href="#">Accessibility</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#">Travel Blog</a>
                </li>
                <li>
                  <a href="#">Destination Guides</a>
                </li>
                <li>
                  <a href="#">Trip Planner</a>
                </li>
                <li>
                  <a href="#">Customer Reviews</a>
                </li>
                <li>
                  <a href="#">Safety Tips</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-divider" />
        <p className="footer-copyright">@2026 MindTrip. All Rights Reserved</p>
      </footer>
    </>
  );
};

export default Home;
