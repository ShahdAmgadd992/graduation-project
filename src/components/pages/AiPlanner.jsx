import React, { useState } from "react";
import robotImg from "../../assets/ai-planner/Robot - Modern cute chatbot 1.svg";
import ellipseImg from "../../assets/ai-planner/Ellipse 21.svg";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import "./AiPlanner.css";

const destinations = [
  "Cairo", "Giza", "Alexandria",
  "Aswan", "Luxor", "Asyut",
  "Beheira", "Fayoum", "Ismailia",
  "Port Said", "Matroh", "Suez",
  "Red Sea", "Sinai", "Hurghada",
  "Sharm Elsheikh",
];

const budgetOptions = [
  { label: "Basic", price: "$300", emoji: "🧳" },
  { label: "Standard", price: "$500", emoji: "🙂" },
  { label: "Comfort", price: "$1000", emoji: "💸" },
  { label: "Premium", price: "$2000", emoji: "💎" },
];

const interestOptions = [
  { label: "Cafés", emoji: "☕" },
  { label: "Bakeries", emoji: "🥐" },
  { label: "Music", emoji: "🎵" },
  { label: "Street Food Spots", emoji: "🥙" },
  { label: "Restaurants", emoji: "🍽️" },
  { label: "Fine Dining", emoji: "❤️" },
  { label: "Bowling", emoji: "🎳" },
  { label: "Food Trucks", emoji: "🚚" },
  { label: "Escape Rooms", emoji: "🏠" },
  { label: "Corniche", emoji: "🏖️" },
  { label: "Healthy Spots", emoji: "🌿" },
  { label: "Picnic Spots", emoji: "🌸" },
  { label: "Rooftop Views", emoji: "🏙️" },
  { label: "Theaters", emoji: "🎭" },
  { label: "Art Workshops", emoji: "🎨" },
  { label: "Handmade Crafts", emoji: "📦" },
];

// Simple calendar helper
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  let day = new Date(year, month, 1).getDay(); // 0=Sun
  return day === 0 ? 6 : day - 1; // convert to Mon=0
}
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const DAY_NAMES = ["Mo","Tu","We","Th","Fr","Sa","Su"];

const AiPlanner = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 5;

  // Step 1 - Destination
  const [selectedDest, setSelectedDest] = useState(null);
  const [search, setSearch] = useState("");

  // Step 2 - Calendar
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Step 3 - Travelers
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  // Step 4 - Budget
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  // Step 5 - Interests
  const [selectedInterests, setSelectedInterests] = useState([]);

  const progressPercent = (step / totalSteps) * 100;

  // ── Calendar logic ──
  const handlePrevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const handleNextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };
  const handleDayClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate({ year: calYear, month: calMonth, day });
      setEndDate(null);
    } else {
      const s = new Date(startDate.year, startDate.month, startDate.day);
      const e = new Date(calYear, calMonth, day);
      if (e < s) {
        setStartDate({ year: calYear, month: calMonth, day });
        setEndDate(null);
      } else {
        setEndDate({ year: calYear, month: calMonth, day });
      }
    }
  };
  const isDayStart = (day) => startDate && calYear === startDate.year && calMonth === startDate.month && day === startDate.day;
  const isDayEnd = (day) => endDate && calYear === endDate.year && calMonth === endDate.month && day === endDate.day;
  const isDayInRange = (day) => {
    if (!startDate || !endDate) return false;
    const d = new Date(calYear, calMonth, day);
    const s = new Date(startDate.year, startDate.month, startDate.day);
    const e = new Date(endDate.year, endDate.month, endDate.day);
    return d > s && d < e;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDay = getFirstDayOfMonth(calYear, calMonth);
    const prevMonthDays = getDaysInMonth(calYear, calMonth === 0 ? 11 : calMonth - 1);
    const cells = [];

    // prev month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push(<div key={`prev-${i}`} className="aip-cal-day aip-cal-day--other">{prevMonthDays - i}</div>);
    }
    // current month
    for (let d = 1; d <= daysInMonth; d++) {
      const isStart = isDayStart(d);
      const isEnd = isDayEnd(d);
      const inRange = isDayInRange(d);
      let cls = "aip-cal-day";
      if (isStart || isEnd) cls += " aip-cal-day--selected";
      else if (inRange) cls += " aip-cal-day--range";
      cells.push(
        <div key={`d-${d}`} className={cls} onClick={() => handleDayClick(d)}>{d}</div>
      );
    }
    // next month padding
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push(<div key={`next-${d}`} className="aip-cal-day aip-cal-day--other">{d}</div>);
    }
    return cells;
  };

  // ── Step 3 helpers ──
  const changeCount = (setter, val, delta) => {
    setter(Math.max(0, val + delta));
  };
  const totalTravelers = adults + children + pets;

  // ── Step 4 helpers ──
  const hasBudget = selectedBudget !== null || customAmount.trim() !== "";

  // ── Step 5 helpers ──
  const toggleInterest = (label) => {
    setSelectedInterests(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  // ── Continue handlers ──
  const handleContinue = () => {
    if (step < totalSteps) setStep(s => s + 1);
    else {
      setIsLoading(true);
      // Simulate AI generating plan (3 seconds)
      setTimeout(() => {
        setIsLoading(false);
        console.log("Plan data:", { selectedDest, startDate, endDate, adults, children, pets, selectedBudget, customAmount, selectedInterests });
      }, 3000);
    }
  };
  const handleBack = () => setStep(s => s - 1);

  // ── Can continue? ──
  const canContinue = () => {
    if (step === 1) return selectedDest !== null;
    if (step === 2) return startDate !== null && endDate !== null;
    if (step === 3) return totalTravelers > 0;
    if (step === 4) return hasBudget;
    if (step === 5) return selectedInterests.length > 0;
    return false;
  };

  const filteredDests = destinations.filter(d =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  // ── Bot messages per step ──
  const botMessages = {
    1: "Tap the bot if you need some inspiration.",
    2: "Not sure about the dates? Ask AI",
    3: "Skip the clicks! Tell AI who's joining.",
    4: "Need help estimating your budget? Ask AI",
    5: null,
  };

  // ── Loading Screen ──
  if (isLoading) {
    return (
      <div className="aip-loading-screen">
        <div className="aip-loading-robot-wrapper">
          <img src={ellipseImg} alt="" className="aip-loading-ellipse" />
          <img src={robotImg} alt="Mindy" className="aip-loading-robot" />
        </div>
        <div className="aip-loading-spinner" />
        <h2 className="aip-loading-title">Mindy is working his magic...</h2>
        <p className="aip-loading-sub">Analyzing best spots and matching your budget...</p>
      </div>
    );
  }

  return (
    <div className="aip-page">
      <Navbar activePage="aiplanner" />

      <div className="aip-hero">
        <h1 className="aip-title"><span className="aip-title-ai">AI</span> Planner</h1>
        <p className="aip-subtitle">
          Design your dream trip in seconds. Answer a few quick questions, and let Mindy do the magic!
        </p>
      </div>

      <div className="aip-card">
        {/* Progress Bar */}
        <div className="aip-progress-bar">
          <div className="aip-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* ── STEP 1: Destination ── */}
        {step === 1 && (
          <>
            <div className="aip-question-header">
              <h2 className="aip-question-title">Where do you want to go? 📍</h2>
              <p className="aip-question-sub">Pick a destination or type your dream place or chat with your.</p>
            </div>
            <div className="aip-search-wrapper">
              <span className="aip-search-icon">🔍</span>
              <input
                className="aip-search-input"
                type="text"
                placeholder="Destinations, trips, activities..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="aip-grid" style={{ marginBottom: "28px" }}>
              {filteredDests.map(dest => (
                <button
                  key={dest}
                  className={`aip-dest-btn ${selectedDest === dest ? "aip-dest-btn--active" : ""}`}
                  onClick={() => setSelectedDest(dest)}
                >
                  {dest}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── STEP 2: Calendar ── */}
        {step === 2 && (
          <>
            <div className="aip-question-header">
              <button className="aip-back-btn" onClick={handleBack}>←</button>
              <h2 className="aip-question-title">How long is your trip? 🗓️</h2>
              <p className="aip-question-sub">Choose how many days you're planning to travel.</p>
            </div>
            <div className="aip-calendar">
              <div className="aip-cal-header">
                <button className="aip-cal-nav" onClick={handlePrevMonth}>‹</button>
                <span className="aip-cal-month">{MONTH_NAMES[calMonth]} {calYear}</span>
                <button className="aip-cal-nav" onClick={handleNextMonth}>›</button>
              </div>
              <div className="aip-cal-divider" />
              <div className="aip-cal-days-header">
                {DAY_NAMES.map((d, i) => <div key={i} className="aip-cal-day-name">{d}</div>)}
              </div>
              <div className="aip-cal-grid">
                {renderCalendar()}
              </div>
            </div>
          </>
        )}

        {/* ── STEP 3: Travelers ── */}
        {step === 3 && (
          <>
            <div className="aip-question-header">
              <button className="aip-back-btn" onClick={handleBack}>←</button>
              <h2 className="aip-question-title">Who's traveling? 👥</h2>
              <p className="aip-question-sub">Tell us how many people are joining.</p>
            </div>
            <div className="aip-travelers-grid">
              {[
                { label: "Adults", emoji: "👤", val: adults, set: setAdults },
                { label: "Children", emoji: "👨‍👧", val: children, set: setChildren },
                { label: "Pets", emoji: "🐾", val: pets, set: setPets },
              ].map(({ label, emoji, val, set }) => (
                <div key={label} className={`aip-traveler-card ${val > 0 ? "aip-traveler-card--active" : ""}`}>
                  <span className={`aip-traveler-emoji ${val > 0 ? "aip-traveler-emoji--active" : ""}`}>{emoji}</span>
                  <span className="aip-traveler-label">{label}</span>
                  <div className="aip-counter">
                    <button className="aip-counter-btn" onClick={() => changeCount(set, val, -1)}>−</button>
                    <span className={`aip-counter-val ${val > 0 ? "aip-counter-val--active" : ""}`}>{val}</span>
                    <button className="aip-counter-btn" onClick={() => changeCount(set, val, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── STEP 4: Budget ── */}
        {step === 4 && (
          <>
            <div className="aip-question-header">
              <button className="aip-back-btn" onClick={handleBack}>←</button>
              <h2 className="aip-question-title">What's your budget? 💰</h2>
              <p className="aip-question-sub">This is your budget per person.</p>
            </div>
            <div className="aip-budget-grid">
              {budgetOptions.map(({ label, price, emoji }) => (
                <button
                  key={label}
                  className={`aip-budget-btn ${selectedBudget === label ? "aip-budget-btn--active" : ""}`}
                  onClick={() => { setSelectedBudget(label); setCustomAmount(""); }}
                >
                  <span className="aip-budget-emoji">{emoji}</span>
                  <span className="aip-budget-label">{label}</span>
                  <span className="aip-budget-price">{price}</span>
                </button>
              ))}
            </div>
            <div className="aip-or-divider">OR</div>
            <input
              className="aip-custom-input"
              type="number"
              placeholder="Enter your custom amount"
              value={customAmount}
              onChange={e => { setCustomAmount(e.target.value); setSelectedBudget(null); }}
            />
          </>
        )}

        {/* ── STEP 5: Interests ── */}
        {step === 5 && (
          <>
            <div className="aip-question-header">
              <button className="aip-back-btn" onClick={handleBack}>←</button>
              <h2 className="aip-question-title">What are you into? 🎯</h2>
              <p className="aip-question-sub">Select what you'd love to do on this trip.</p>
            </div>
            <div className="aip-interests-grid">
              {interestOptions.map(({ label, emoji }) => (
                <button
                  key={label}
                  className={`aip-interest-btn ${selectedInterests.includes(label) ? "aip-interest-btn--active" : ""}`}
                  onClick={() => toggleInterest(label)}
                >
                  {emoji} {label}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Continue / Generate Button */}
        <button
          className={`aip-continue-btn ${canContinue() ? "aip-continue-btn--active" : ""}`}
          onClick={handleContinue}
          disabled={!canContinue()}
        >
          {step === 5 ? "Generate your plan" : "Continue"}
        </button>
      </div>

      {/* Bot bubble */}
      {botMessages[step] && (
        <div className="aip-bot-wrapper">
          <p className="aip-bot-text">{botMessages[step]}</p>
          <button className="aip-bot-btn">🤖</button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AiPlanner;