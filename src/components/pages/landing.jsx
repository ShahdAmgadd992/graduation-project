import landingImg from "../../assets/general/landing.jpg";
import logoImg from "../../assets/general/logo.png";
import "./landing.css";

const Landing = ({ onNavigate }) => {
  const goTo = (path, page) => {
    window.history.pushState({}, "", path);
    onNavigate(page);
  };

  return (
    <div className="landing-page">
      <img src={landingImg} alt="Landing" className="landing-bg" />

      <div className="landing-overlay" />

      <div className="landing-navbar">
        <div className="landing-logo">
          <img src={logoImg} alt="MindTrip" className="landing-logo-img" />
          <span className="landing-logo-text">Mind Trip</span>
        </div>
        <button
          className="landing-signin-btn"
          onClick={() => goTo("/signin", "signin")}
        >
          Sign In
        </button>
      </div>

      <div className="landing-content">
        <h1 className="landing-title">
          Your Next Egyptian Adventure Starts Here.
        </h1>
        <p className="landing-subtitle">
          Tailored itineraries powered by AI, designed for your budget and
          style.
        </p>
        <button
          className="landing-cta-btn"
          onClick={() => goTo("/home", "home")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;
