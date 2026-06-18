import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ReviewsIcon from "../../assets/icons/ReviewsIcon.png";
import "./TripDetails.css";

const TripDetails = ({ place }) => {
  const [liked, setLiked] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  const data = place
    ? {
        name: place.title,
        city: place.city,
        rating: place.rating,
        reviews: `${place.reviews}`,
        avgPrice: `Avg. $${place.price} / Meal`,
        images: [
          place.image,
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
          "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600",
        ],
        overview: `${place.title} is one of Egypt's top destinations in ${place.city}, known for its unique charm and unforgettable experience.`,
        openingHours: "10:00 am",
        closingHours: "12:00 am",
        cuisine: "Oriental",
        suggestedVisit: "Morning",
        nearbyPlaces: [
          {
            name: "Great Sphinx",
            distance: "0.4 km",
            image:
              "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=200",
          },
          {
            name: "Egyptian Museum",
            distance: "0.4 km",
            image:
              "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=200",
          },
          {
            name: "Saqqara",
            distance: "0.4 km",
            image:
              "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?w=200",
          },
        ],
        reviews_list: [
          {
            id: 1,
            name: "Elif",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            text: "One of the most unforgettable places in Egypt. The view at sunrise was incredible.",
          },
          {
            id: 2,
            name: "Kerem",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            text: "Perfect for photography. We spent almost 3 hours exploring the site.",
          },
          {
            id: 3,
            name: "Emre",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            text: "Very crowded at noon, so visiting early morning is definitely better.",
          },
          {
            id: 4,
            name: "Leyla",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
            text: "Our guide explained the history beautifully. A must-visit destination.",
          },
        ],
        overallRating: place.rating,
        lat: 29.9792,
        lng: 31.1342,
      }
    : {
        name: "Ali Baba Restaurant",
        city: "Dahab",
        rating: 4.5,
        reviews: "2.7k",
        avgPrice: "Avg. $50 / Meal",
        images: [
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
          "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600",
        ],
        overview:
          "Ali Baba is a favorite seaside restaurant in Dahab, famous for its fresh seafood, authentic local flavors, and relaxed outdoor seating right on the beach. A perfect spot for lunch or dinner with stunning sea views.",
        openingHours: "10:00 am",
        closingHours: "12:00 am",
        cuisine: "Oriental",
        suggestedVisit: "Morning",
        nearbyPlaces: [
          {
            name: "Great Sphinx",
            distance: "0.4 km",
            image:
              "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=200",
          },
          {
            name: "Egyptian Museum",
            distance: "0.4 km",
            image:
              "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=200",
          },
          {
            name: "Saqqara",
            distance: "0.4 km",
            image:
              "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?w=200",
          },
        ],
        reviews_list: [
          {
            id: 1,
            name: "Sarah",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            text: "One of the most unforgettable places in Egypt. The view at sunrise was incredible.",
          },
          {
            id: 2,
            name: "Ahmed",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            text: "Perfect for photography. We spent almost 3 hours exploring the site.",
          },
          {
            id: 3,
            name: "Omar",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            text: "Very crowded at noon, so visiting early morning is definitely better.",
          },
          {
            id: 4,
            name: "Mona",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
            text: "Our guide explained the history beautifully. A must-visit destination.",
          },
        ],
        overallRating: 4.8,
        lat: 29.9792,
        lng: 31.1342,
      };

  const overviewText = showFullOverview
    ? data.overview
    : data.overview.slice(0, 120) + "...";

  return (
    <>
      <Navbar activePage="explore" />

      <div className="td-wrapper">
        <div className="td-page">
          {/* ===== Place Title ===== */}
          <h1 className="td-place-title">{data.name}</h1>

          {/* ===== Meta Info ===== */}
          <div className="td-meta">
            <span className="td-meta-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5596fe"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {data.city}
            </span>
            <span className="td-meta-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f5a623"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {data.rating} ({data.reviews} reviews)
            </span>
            <span className="td-meta-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5596fe"
                strokeWidth="2"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              {data.avgPrice}
            </span>
          </div>

          {/* ===== Images Grid ===== */}
          <div className="td-images">
            <div className="td-main-img">
              <img src={data.images[0]} alt={data.name} />
            </div>
            <div className="td-side-imgs">
              {data.images.slice(1, 3).map((img, i) => (
                <div key={i} className="td-side-img-wrap">
                  <img src={img} alt={`${data.name} ${i + 1}`} />
                  {i === 0 && (
                    <button
                      className={`td-heart-btn ${liked ? "liked" : ""}`}
                      onClick={() => setLiked(!liked)}
                    >
                      ❤️
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ===== Main Content ===== */}
          <div className="td-content">
            {/* ===== Left Column ===== */}
            <div className="td-left">
              {/* Overview */}
              <div className="td-section">
                <h2 className="td-section-title">Overview</h2>
                <p className="td-overview-text">
                  {overviewText}{" "}
                  <button
                    className="td-see-more"
                    onClick={() => setShowFullOverview(!showFullOverview)}
                  >
                    {showFullOverview ? "See Less" : "See More"}
                  </button>
                </p>
              </div>

              {/* Nearby Places */}
              <div className="td-section">
                <h2 className="td-section-title">Nearby Places</h2>
                <div className="td-nearby-grid">
                  {data.nearbyPlaces.map((np, i) => (
                    <div key={i} className="td-nearby-card">
                      <img
                        src={np.image}
                        alt={np.name}
                        className="td-nearby-img"
                      />
                      <p className="td-nearby-name">{np.name}</p>
                      <span className="td-nearby-dist">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#5596fe"
                          strokeWidth="2"
                        >
                          <rect x="1" y="3" width="15" height="13" rx="2" />
                          <path d="M16 8h4l3 3v5h-7V8z" />
                          <circle cx="5.5" cy="18.5" r="2.5" />
                          <circle cx="18.5" cy="18.5" r="2.5" />
                        </svg>
                        {np.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="td-section">
                <h2 className="td-section-title">
                  Reviews{" "}
                  <span className="td-review-edit">
                    <img
                      src={ReviewsIcon}
                      alt="edit"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </span>
                </h2>
                <div className="td-rating-summary">
                  <div className="td-overall">
                    <span className="td-overall-num">{data.overallRating}</span>
                    <div className="td-stars">
                      {"★".repeat(Math.floor(data.overallRating))}
                      {"☆".repeat(5 - Math.floor(data.overallRating))}
                    </div>
                  </div>
                  <div className="td-rating-bars">
                    <div className="td-bar-row">
                      <div className="td-bar">
                        <div className="td-bar-fill" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <div className="td-bar-row">
                      <div className="td-bar">
                        <div className="td-bar-fill" style={{ width: "70%" }} />
                      </div>
                    </div>
                    <div className="td-bar-row">
                      <div className="td-bar">
                        <div
                          className="td-bar-fill td-bar-fill-light"
                          style={{ width: "30%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="td-reviews-grid">
                  {data.reviews_list.map((rev) => (
                    <div key={rev.id} className="td-review-card">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="td-reviewer-avatar"
                      />
                      <div className="td-review-info">
                        <span className="td-reviewer-name">{rev.name}</span>
                        <div className="td-review-stars">
                          {"★".repeat(rev.rating)}
                        </div>
                        <p className="td-review-text">
                          {rev.text ||
                            "A wonderful experience, highly recommended!"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== Right Column ===== */}
            <div className="td-right">
              <div className="td-visit-card">
                <h3 className="td-visit-title">Visit Info</h3>
                <div className="td-visit-grid">
                  <div className="td-visit-item">
                    <span className="td-visit-label">Opening Hours</span>
                    <span className="td-visit-value">{data.openingHours}</span>
                  </div>
                  <div className="td-visit-item">
                    <span className="td-visit-label">Closing Hours</span>
                    <span className="td-visit-value">{data.closingHours}</span>
                  </div>
                  <div className="td-visit-item">
                    <span className="td-visit-label">Cuisine</span>
                    <span className="td-visit-value">{data.cuisine}</span>
                  </div>
                  <div className="td-visit-item">
                    <span className="td-visit-label">Suggested Visit</span>
                    <span className="td-visit-value">
                      {data.suggestedVisit}
                    </span>
                  </div>
                </div>

                <h3 className="td-visit-title" style={{ marginTop: "24px" }}>
                  Location
                </h3>
                <div className="td-map-placeholder">
                  <iframe
                    title="map"
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: "12px" }}
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${data.lat},${data.lng}&z=14&output=embed`}
                  />
                </div>

                {/* ===== Open Full Map Link ===== */}
                <a
                  className="td-open-map-btn"
                  href={`https://www.google.com/maps?q=${data.lat},${data.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5596fe"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Open full map
                </a>

                <button className="td-add-trip-btn">Add to your trip</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TripDetails;
