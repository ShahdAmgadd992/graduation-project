import React, { useState } from "react";
import "./Profile.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import clint1 from "../../assets/general/clint1.jpg";
import dahab from "../../assets/cities/dahab.jpg";
import fullHeart from "../../assets/icons/fullHeart.png";
import uisCalender from "../../assets/icons/uis_calender.png";
import pin from "../../assets/icons/pin.png";
import tripsIcon from "../../assets/icons/trips.png";
import searchIcon from "../../assets/icons/searchIcon.png";

// ===== Static Data =====
const userData = {
  name: "Zeina Ahmed",
  bio: "Chasing sunrises, collecting stories.",
  location: "Cairo, Egypt",
  avatar: clint1,
  stats: [
    {
      value: 12,
      label: "Trips Completed",
      icon: <img src={tripsIcon} alt="trips" width="24" height="24" />,
    },
    {
      value: 47,
      label: "Saved Places",
      icon: <img src={fullHeart} alt="saved" width="24" height="24" />,
    },
    {
      value: 3,
      label: "Upcoming Trips",
      icon: <img src={uisCalender} alt="upcoming" width="24" height="24" />,
    },
    {
      value: 8,
      label: "Cities Visited",
      icon: <img src={pin} alt="cities" width="24" height="24" />,
    },
  ],
};

const interests = [
  { label: "Nature & Oasis", emoji: "🌿", active: true },
  { label: "Islamic Architecture & Arts", emoji: "🕌", active: false },
  { label: "Mountains & Highs", emoji: "⛺", active: false },
  { label: "Hidden Gems", emoji: "💎", active: true },
  { label: "Historical Sites & Ruins", emoji: "🏛️", active: false },
  { label: "Coastal Escapes", emoji: "🏖️", active: false },
  { label: "Shopping & Nightlife", emoji: "🛍️", active: true },
  { label: "Local Culture & Folklore", emoji: "🌐", active: false },
  { label: "Diving & Marine Life", emoji: "🤿", active: false },
  { label: "Family Friendly", emoji: "👨‍👩‍👧", active: true },
  { label: "Relaxation & Wellness", emoji: "🧘", active: true },
  { label: "Adventure & Sports", emoji: "🏋️", active: false },
  { label: "Local Cuisine", emoji: "🍽️", active: true },
  { label: "Desert Safari", emoji: "🐪", active: false },
];

const upcomingTrips = [
  {
    id: 1,
    title: "Dahab Retreat",
    date: "Oct 15 - Oct 20",
    location: "South Sinai, Egypt",
    description:
      "A perfect blend of coastal escapes and hidden gems tailored just for you.",
    image: dahab,
    highlights: [
      "Dive at the Canyon",
      "Bedouin Dinner Under Stars",
      "Snorkel the Blue Hole",
    ],
    aiPlanned: true,
  },
];

const allTrips = [
  {
    id: 1,
    title: "Aswan Golden Sun",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 2,
    title: "Siwa Oasis Escape",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 3,
    title: "Historic Cairo Walk",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 4,
    title: "Marsa Alam Dive",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: null,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 5,
    title: "Alex Sea Breeze",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: null,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 6,
    title: "Sinai Mountain Trail",
    date: "16 May 2026",
    places: 12,
    status: "Upcoming",
    image: null,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
];

const draftTrips = [
  {
    id: 1,
    title: "El Gouna Weekend Retreat",
    lastEdited: "2 hours ago",
    progress: 60,
  },
  {
    id: 2,
    title: "Abu Simbel Sun Festival",
    lastEdited: "2 hours ago",
    progress: 60,
  },
  {
    id: 3,
    title: "Sharm El Sheikh Vibes",
    lastEdited: "2 hours ago",
    progress: 60,
  },
  {
    id: 4,
    title: "Taba Heights Getaway",
    lastEdited: "2 hours ago",
    progress: 60,
  },
  {
    id: 5,
    title: "Sahl Hasheesh Chill",
    lastEdited: "2 hours ago",
    progress: 60,
  },
  {
    id: 6,
    title: "Wadi El Hitan Camp",
    lastEdited: "2 hours ago",
    progress: 60,
  },
];

const reviews = [
  {
    id: 1,
    place: "Karnak Temple, Luxor",
    rating: 5,
    date: "March 2024",
    text: "Absolutely breathtaking. Walking through those massive columns at sunset was a moment I'll never forget.",
  },
  {
    id: 2,
    place: "Siwa Oasis",
    rating: 5,
    date: "January 2024",
    text: "The most peaceful place I've ever been. The stars at night were unreal.",
  },
];

const completedTrips = [
  {
    id: 1,
    title: "Siwa Oasis Retreat",
    days: 5,
    location: "Cairo,Giza,Luxor",
    places: 12,
    lastUpdated: "11/5/2026 at 5:00pm",
    status: "Completed",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 2,
    title: "Dahab Blue Vibe",
    days: 5,
    location: "Cairo,Giza,Luxor",
    places: 12,
    lastUpdated: "11/5/2026 at 5:00pm",
    status: "Completed",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
  {
    id: 3,
    title: "Egypt Adventure",
    days: 5,
    location: "Cairo,Giza,Luxor",
    places: 12,
    lastUpdated: "11/5/2026 at 5:00pm",
    status: "Completed",
    image: dahab,
    highlights: ["Pyramids of Giza", "Luxor Temple", "+10 more places"],
  },
];

const tabs = ["Overview", "My Trips", "Reviews", "Settings"];
const tripFilters = ["ALL", "Upcoming", "Drafts", "Completed"];

// ===== Profile Page =====
const Profile = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTrips, setShowAllTrips] = useState(false);
  const [showAllDrafts, setShowAllDrafts] = useState(false);

  const upcomingFiltered = allTrips.filter(
    (t) =>
      t.status === "Upcoming" &&
      t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const draftsFiltered = draftTrips.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const completedFiltered = completedTrips.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Navbar activePage="profile" />

      <div className="profile-page">
        {/* ===== Cover Photo ===== */}
        <div className="profile-cover">
          <img src={dahab} alt="cover" className="cover-img" />
        </div>

        {/* ===== Profile Header ===== */}
        <div className="profile-header-wrap">
          <div className="profile-header">
            <div className="avatar-section">
              <div className="avatar-wrap">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="profile-avatar"
                />
                <button className="avatar-edit-btn" title="Change photo">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
              <div className="profile-info">
                <h2 className="profile-name">{userData.name}</h2>
                <p className="profile-bio">{userData.bio}</p>
                <p className="profile-location">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5596fe"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {userData.location}
                </p>
              </div>
            </div>
            <div className="profile-actions">
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
          </div>

          {/* ===== Tabs ===== */}
          <div className="profile-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`profile-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ===== Tab Content ===== */}
        <div className="profile-content">
          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === "Overview" && (
            <div className="overview-tab">
              <div className="welcome-card">
                <h3>
                  Welcome back,{" "}
                  <span className="blue-name">
                    {userData.name.split(" ")[0]}
                  </span>
                </h3>
                <p>Ready for your next Trip?</p>
              </div>

              <div className="stats-grid">
                {userData.stats.map((stat, i) => (
                  <div className="stat-card" key={i}>
                    <div className="stat-icon-circle">{stat.icon}</div>
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="overview-section">
                <div className="section-card-header">
                  <h4>My Travel Interests</h4>
                  <button className="edit-icon-btn">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#5596fe"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
                <div className="interests-wrap">
                  {interests.map((interest, i) => (
                    <span
                      key={i}
                      className={`interest-tag ${interest.active ? "active" : ""}`}
                    >
                      {interest.emoji} {interest.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="overview-section">
                <h4>Upcoming Trips</h4>
                {upcomingTrips.map((trip) => (
                  <div className="upcoming-trip-card" key={trip.id}>
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="trip-thumb"
                    />
                    <div className="trip-left">
                      <h5 className="trip-title">{trip.title}</h5>
                      <p className="trip-date">{trip.date}</p>
                      <p className="trip-desc">{trip.description}</p>
                      <button className="view-itinerary-btn">
                        View Itinerary
                      </button>
                    </div>
                    <div className="trip-right">
                      <h6 className="trip-highlights-title">Trip Highlights</h6>
                      <div className="trip-highlights">
                        {trip.highlights.map((h, i) => (
                          <span key={i} className="highlight-item">
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    {trip.aiPlanned && (
                      <span className="ai-badge">✦ AI Planner</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== MY TRIPS TAB ===== */}
          {activeTab === "My Trips" && (
            <div className="trips-tab">
              {/* Filter + Search Bar */}
              <div className="trips-toolbar">
                <div className="trips-filters">
                  {tripFilters.map((f) => (
                    <button
                      key={f}
                      className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                      onClick={() => {
                        setActiveFilter(f);
                        setShowAllTrips(false);
                        setShowAllDrafts(false);
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="trips-search">
                  <div className="search-left">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#999"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search for a trip..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <button className="search-sort-btn">
                    <img src={searchIcon} alt="sort" width="20" height="20" />
                  </button>
                </div>
              </div>

              {/* ===== Upcoming Trips Section ===== */}
              {(activeFilter === "ALL" || activeFilter === "Upcoming") && (
                <div className="overview-section">
                  <div className="section-card-header">
                    <h4>Upcoming Trips</h4>
                    <button className="see-all-btn">See All</button>
                  </div>
                  <div className="my-trips-grid">
                    {upcomingFiltered
                      .slice(0, showAllTrips ? undefined : 3)
                      .map((trip) => (
                        <div className="my-trip-card" key={trip.id}>
                          <div className="my-trip-img-wrap">
                            {trip.image ? (
                              <img
                                src={trip.image}
                                alt={trip.title}
                                className="my-trip-img"
                              />
                            ) : (
                              <div className="no-img-placeholder">
                                <svg
                                  width="36"
                                  height="36"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#ccc"
                                  strokeWidth="1.5"
                                >
                                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                                  <circle cx="12" cy="13" r="4" />
                                </svg>
                              </div>
                            )}
                            <span className="trip-status-badge">
                              {trip.status}
                            </span>
                            <button className="trip-more-btn">⋮</button>
                          </div>
                          <div className="my-trip-info">
                            <h5 className="my-trip-title">{trip.title}</h5>
                            <p className="my-trip-meta">
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#999"
                                strokeWidth="2"
                              >
                                <rect
                                  x="3"
                                  y="4"
                                  width="18"
                                  height="18"
                                  rx="2"
                                />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                              </svg>
                              {trip.date}
                            </p>
                            <p className="my-trip-meta">
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#999"
                                strokeWidth="2"
                              >
                                <rect
                                  x="3"
                                  y="4"
                                  width="18"
                                  height="18"
                                  rx="2"
                                />
                                <line x1="3" y1="10" x2="21" y2="10" />
                                <line x1="9" y1="4" x2="9" y2="20" />
                              </svg>
                              {trip.places} places
                            </p>
                            <div className="my-trip-highlights">
                              {trip.highlights.map((h, i) => (
                                <p
                                  key={i}
                                  className={`my-trip-highlight-item ${h.startsWith("+") ? "more" : ""}`}
                                >
                                  • {h}
                                </p>
                              ))}
                            </div>
                            <button className="view-itinerary-btn">
                              View Itinerary
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                  {upcomingFiltered.length > 3 && (
                    <div className="show-more-wrap">
                      <button
                        className="show-more-btn"
                        onClick={() => setShowAllTrips(!showAllTrips)}
                      >
                        {showAllTrips ? "Show Less" : "Show More"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ===== Drafts Section ===== */}
              {(activeFilter === "ALL" || activeFilter === "Drafts") && (
                <div className="overview-section">
                  <div className="section-card-header">
                    <h4>Drafts</h4>
                    <button className="see-all-btn">See All</button>
                  </div>
                  <div className="my-trips-grid">
                    {draftsFiltered
                      .slice(0, showAllDrafts ? undefined : 3)
                      .map((draft) => (
                        <div className="my-trip-card" key={draft.id}>
                          <div className="draft-img-wrap">
                            <span className="trip-status-badge">Draft</span>
                            <div className="draft-img-placeholder">
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#aaa"
                                strokeWidth="1.5"
                              >
                                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                                <circle cx="12" cy="13" r="4" />
                              </svg>
                            </div>
                          </div>
                          <div className="my-trip-info">
                            <div className="draft-title-row">
                              <h5 className="my-trip-title">{draft.title}</h5>
                              <button
                                className="trip-more-btn"
                                style={{ position: "static" }}
                              >
                                ⋮
                              </button>
                            </div>
                            <p className="draft-edited">
                              Last edited: {draft.lastEdited}
                            </p>
                            <p className="draft-hint">
                              Just 2 steps left to create your magic trip!
                            </p>
                            <div className="draft-progress-wrap">
                              <div className="draft-progress-header">
                                <span className="draft-progress-label">
                                  Planning Progress
                                </span>
                                <span className="draft-progress-pct">
                                  ({draft.progress}%)
                                </span>
                              </div>
                              <div className="draft-progress-bar">
                                <div
                                  className="draft-progress-fill"
                                  style={{ width: `${draft.progress}%` }}
                                />
                              </div>
                            </div>
                            <button className="continue-planning-btn">
                              Continue Planning
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                  {draftsFiltered.length > 3 && (
                    <div className="show-more-wrap">
                      <button
                        className="show-more-btn"
                        onClick={() => setShowAllDrafts(!showAllDrafts)}
                      >
                        {showAllDrafts ? "Show Less" : "Show More"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ===== Completed Trips Section ===== */}
              {(activeFilter === "ALL" || activeFilter === "Completed") && (
                <div className="overview-section">
                  <div className="section-card-header">
                    <h4>Completed Trips</h4>
                    <button className="see-all-btn">See All</button>
                  </div>
                  <div className="my-trips-grid">
                    {completedFiltered.map((trip) => (
                      <div className="my-trip-card" key={trip.id}>
                        <div className="my-trip-img-wrap">
                          <img
                            src={trip.image}
                            alt={trip.title}
                            className="my-trip-img"
                          />
                          <span className="trip-status-badge">
                            {trip.status}
                          </span>
                          <button className="trip-more-btn">⋮</button>
                        </div>
                        <div className="my-trip-info">
                          <h5 className="my-trip-title">{trip.title}</h5>
                          <div className="completed-meta-row">
                            <p className="my-trip-meta">
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#999"
                                strokeWidth="2"
                              >
                                <rect
                                  x="3"
                                  y="4"
                                  width="18"
                                  height="18"
                                  rx="2"
                                />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                              </svg>
                              {trip.days} Days
                            </p>
                            <p className="my-trip-meta">
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#999"
                                strokeWidth="2"
                              >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                              </svg>
                              {trip.location}
                            </p>
                          </div>
                          <p className="my-trip-meta">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#999"
                              strokeWidth="2"
                            >
                              <rect x="3" y="4" width="18" height="18" rx="2" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                              <line x1="9" y1="4" x2="9" y2="20" />
                            </svg>
                            {trip.places} places
                          </p>
                          <div className="my-trip-highlights">
                            {trip.highlights.map((h, i) => (
                              <p
                                key={i}
                                className={`my-trip-highlight-item ${h.startsWith("+") ? "more" : ""}`}
                              >
                                • {h}
                              </p>
                            ))}
                          </div>
                          <p className="completed-last-updated">
                            Last Updated : {trip.lastUpdated}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== REVIEWS TAB ===== */}
          {activeTab === "Reviews" && (
            <div className="reviews-tab">
              <div className="overview-section">
                <h4>My Reviews</h4>
                <div className="reviews-list">
                  {reviews.map((review) => (
                    <div className="review-card" key={review.id}>
                      <div className="review-header">
                        <div>
                          <h5>{review.place}</h5>
                          <p className="review-date">{review.date}</p>
                        </div>
                        <div className="review-stars">
                          {"★".repeat(review.rating)}
                        </div>
                      </div>
                      <p className="review-text">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== SETTINGS TAB ===== */}
          {activeTab === "Settings" && (
            <div className="settings-tab">
              <div className="overview-section">
                <h4>Account Settings</h4>
                <div className="settings-list">
                  {[
                    "Full Name",
                    "Email Address",
                    "Phone Number",
                    "Language",
                  ].map((field) => (
                    <div className="setting-row" key={field}>
                      <label>{field}</label>
                      <input
                        type="text"
                        placeholder={`Enter your ${field.toLowerCase()}`}
                        className="setting-input"
                      />
                    </div>
                  ))}
                  <button className="save-settings-btn">Save Changes</button>
                </div>
              </div>
              <div className="overview-section danger-zone">
                <h4>Danger Zone</h4>
                <button className="delete-account-btn">Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
