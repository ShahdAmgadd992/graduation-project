import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import "./SavedPlaces.css";

import dahab from "../../assets/cities/dahab.jpg";
import siwa from "../../assets/cities/siwa.jpg";
import luxor from "../../assets/cities/luxor.jpg";
import hurghada from "../../assets/cities/hurghada.jpg";
import alexandria from "../../assets/cities/alexandria.jpg";
import marsaMatrouh from "../../assets/cities/marsaMatrouh.jpg";

const hotelsData = [
  {
    id: 1,
    name: "Dahab Blue Resort",
    desc: "Enjoy a stunning beachfront view, private pool, and cozy rooms.",
    location: "Dahab",
    rating: 4.8,
    reviews: "4.5k",
    price: "80$ / night",
    image: dahab,
    saved: true,
  },
  {
    id: 2,
    name: "Siwa Oasis Lodge",
    desc: "Enjoy a stunning beachfront view, private pool, and cozy rooms.",
    location: "Siwa",
    rating: 4.7,
    reviews: "3.2k",
    price: "80$ / night",
    image: siwa,
    saved: true,
  },
  {
    id: 3,
    name: "Luxor Heritage Hotel",
    desc: "Enjoy a stunning beachfront view, private pool, and cozy rooms.",
    location: "Luxor",
    rating: 4.6,
    reviews: "4.8k",
    price: "80$ / night",
    image: luxor,
    saved: true,
  },
  {
    id: 4,
    name: "Hurghada Beach Hotel",
    desc: "Enjoy a stunning beachfront view, private pool, and cozy rooms.",
    location: "Hurghada",
    rating: 4.5,
    reviews: "2.1k",
    price: "80$ / night",
    image: hurghada,
    saved: true,
  },
  {
    id: 5,
    name: "Alexandria Palace",
    desc: "Enjoy a stunning beachfront view, private pool, and cozy rooms.",
    location: "Alexandria",
    rating: 4.7,
    reviews: "5.0k",
    price: "80$ / night",
    image: alexandria,
    saved: true,
  },
  {
    id: 6,
    name: "Marsa Matrouh Resort",
    desc: "Enjoy a stunning beachfront view, private pool, and cozy rooms.",
    location: "Marsa Matrouh",
    rating: 4.9,
    reviews: "1.8k",
    price: "80$ / night",
    image: marsaMatrouh,
    saved: true,
  },
];

const tripsData = [
  {
    id: 1,
    name: "Nile Cruise Adventure",
    desc: "Sail between Luxor and Aswan, exploring ancient temples and beautiful landscapes.",
    location: "Luxor",
    days: "5 days",
    type: "Cruise",
    price: "60$",
    image: luxor,
    saved: true,
  },
  {
    id: 2,
    name: "Sinai Desert Safari",
    desc: "Explore the rugged mountains and hidden valleys of Sinai on a thrilling jeep safari.",
    location: "Dahab",
    days: "3 days",
    type: "Safari",
    price: "45$",
    image: dahab,
    saved: true,
  },
  {
    id: 3,
    name: "Alexandria Day Trip",
    desc: "Visit the historic Citadel, Roman Amphitheatre, and enjoy fresh seafood by the sea.",
    location: "Alexandria",
    days: "1 day",
    type: "Cultural",
    price: "25$",
    image: alexandria,
    saved: true,
  },
  {
    id: 4,
    name: "Siwa Oasis Escape",
    desc: "Discover ancient ruins, natural springs, and breathtaking sand dunes in Siwa.",
    location: "Siwa",
    days: "4 days",
    type: "Adventure",
    price: "70$",
    image: siwa,
    saved: true,
  },
  {
    id: 5,
    name: "Hurghada Diving Trip",
    desc: "Dive into the Red Sea's vibrant coral reefs with certified instructors and full gear.",
    location: "Hurghada",
    days: "2 days",
    type: "Diving",
    price: "90$",
    image: hurghada,
    saved: true,
  },
  {
    id: 6,
    name: "Marsa Matrouh Beach Retreat",
    desc: "Relax on the stunning white sand beaches and swim in the crystal-clear Mediterranean.",
    location: "Marsa Matrouh",
    days: "3 days",
    type: "Beach",
    price: "55$",
    image: marsaMatrouh,
    saved: true,
  },
];

const activitiesData = [
  {
    id: 1,
    name: "Desert Stargazing",
    desc: "Watch the magical night sky through telescopes while enjoying Bedouin tea and music.",
    location: "Dahab",
    duration: "3 hours",
    rating: 4.7,
    price: "25$ / person",
    image: dahab,
    saved: true,
  },
  {
    id: 2,
    name: "Siwa Hot Springs",
    desc: "Relax in natural hot springs surrounded by palm trees and golden sand dunes.",
    location: "Siwa",
    duration: "2 hours",
    rating: 4.8,
    price: "15$ / person",
    image: siwa,
    saved: true,
  },
  {
    id: 3,
    name: "Luxor Hot Air Balloon",
    desc: "Soar above ancient temples and the Nile Valley at sunrise for a breathtaking experience.",
    location: "Luxor",
    duration: "1 hour",
    rating: 4.9,
    price: "80$ / person",
    image: luxor,
    saved: true,
  },
  {
    id: 4,
    name: "Snorkeling in Hurghada",
    desc: "Explore colorful coral reefs and tropical fish in the crystal-clear Red Sea waters.",
    location: "Hurghada",
    duration: "4 hours",
    rating: 4.6,
    price: "35$ / person",
    image: hurghada,
    saved: true,
  },
  {
    id: 5,
    name: "Alexandria Library Tour",
    desc: "Discover one of the world's greatest libraries with guided tours through ancient manuscripts.",
    location: "Alexandria",
    duration: "2 hours",
    rating: 4.5,
    price: "10$ / person",
    image: alexandria,
    saved: true,
  },
  {
    id: 6,
    name: "Marsa Matrouh Kayaking",
    desc: "Paddle through the stunning turquoise lagoons and hidden caves along the Mediterranean coast.",
    location: "Marsa Matrouh",
    duration: "3 hours",
    rating: 4.7,
    price: "30$ / person",
    image: marsaMatrouh,
    saved: true,
  },
];
const restaurantsData = [
  {
    id: 1,
    name: "Ali Baba Restaurant",
    desc: "Famous beachfront spot serving fresh Red Sea seafood with an authentic cozy vibe.",
    location: "Dahab",
    cuisine: "Seafood",
    rating: 4.8,
    price: "$ Moderate",
    image: dahab,
    saved: true,
  },
  {
    id: 2,
    name: "Siwa Palm Garden",
    desc: "Traditional Siwan cuisine served under palm trees with organic local ingredients.",
    location: "Siwa",
    cuisine: "Egyptian",
    rating: 4.6,
    price: "$ Moderate",
    image: siwa,
    saved: true,
  },
  {
    id: 3,
    name: "Luxor Nile View",
    desc: "Enjoy classic Egyptian dishes with a stunning panoramic view of the Nile River.",
    location: "Luxor",
    cuisine: "Egyptian",
    rating: 4.7,
    price: "$$ Fine Dining",
    image: luxor,
    saved: true,
  },
  {
    id: 4,
    name: "The Coral Table",
    desc: "Fresh Mediterranean and international cuisine steps away from the Red Sea shore.",
    location: "Hurghada",
    cuisine: "Mediterranean",
    rating: 4.5,
    price: "$ Moderate",
    image: hurghada,
    saved: true,
  },
  {
    id: 5,
    name: "Café Greco Alexandria",
    desc: "Historic café serving authentic Mediterranean dishes and fresh pastries since 1929.",
    location: "Alexandria",
    cuisine: "Mediterranean",
    rating: 4.9,
    price: "$$ Fine Dining",
    image: alexandria,
    saved: true,
  },
  {
    id: 6,
    name: "Matrouh Pearl",
    desc: "Beachside restaurant famous for grilled fish and fresh salads with sea breeze views.",
    location: "Marsa Matrouh",
    cuisine: "Seafood",
    rating: 4.6,
    price: "$ Moderate",
    image: marsaMatrouh,
    saved: true,
  },
];

const cafesData = [
  {
    id: 1,
    name: "Everyday Cafe",
    desc: "Your perfect morning stop for specialty coffee, fresh bakery, and direct sea views.",
    location: "Dahab",
    type: "Cafe",
    rating: 4.6,
    price: "$ Moderate",
    image: dahab,
    saved: true,
  },
  {
    id: 2,
    name: "Siwa Oasis Lounge",
    desc: "Sip herbal teas and fresh juices in a tranquil garden setting among ancient ruins.",
    location: "Siwa",
    type: "Lounge",
    rating: 4.7,
    price: "$ Moderate",
    image: siwa,
    saved: true,
  },
  {
    id: 3,
    name: "Luxor Rooftop Cafe",
    desc: "Enjoy your morning coffee with a breathtaking rooftop view over Luxor's temples.",
    location: "Luxor",
    type: "Rooftop Cafe",
    rating: 4.8,
    price: "$ Moderate",
    image: luxor,
    saved: true,
  },
  {
    id: 4,
    name: "Red Sea Brew",
    desc: "Specialty third-wave coffee shop with tropical smoothies and homemade cakes.",
    location: "Hurghada",
    type: "Coffee Shop",
    rating: 4.5,
    price: "$ Moderate",
    image: hurghada,
    saved: true,
  },
  {
    id: 5,
    name: "Alexandria Corniche Cafe",
    desc: "Classic Alexandrian café with sea views, shisha, and traditional Egyptian sweets.",
    location: "Alexandria",
    type: "Traditional Cafe",
    rating: 4.6,
    price: "$ Moderate",
    image: alexandria,
    saved: true,
  },
  {
    id: 6,
    name: "Blue Lagoon Cafe",
    desc: "Relax with fresh juice and light snacks overlooking Marsa Matrouh's turquoise waters.",
    location: "Marsa Matrouh",
    type: "Beach Cafe",
    rating: 4.7,
    price: "$ Moderate",
    image: marsaMatrouh,
    saved: true,
  },
];

const filters = [
  "All",
  "Hotels",
  "Trips",
  "Activities",
  "Restaurants",
  "Cafes",
];

const Stars = ({ rating }) => (
  <span className="sp-stars">
    {"★".repeat(Math.floor(rating))}
    {"☆".repeat(5 - Math.floor(rating))}
    <span className="sp-rating-num">{rating}</span>
  </span>
);

const HotelCard = ({ item, onToggle }) => (
  <div className="sp-card">
    <div className="sp-card-img-wrap">
      <img src={item.image} alt={item.name} className="sp-card-img" />
      <button className="sp-heart-btn" onClick={() => onToggle(item.id)}>
        ❤️
      </button>
    </div>
    <div className="sp-card-body">
      <h4 className="sp-card-title">{item.name}</h4>
      <p className="sp-card-desc">{item.desc}</p>
      <p className="sp-card-location">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5596fe"
          strokeWidth="2"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {item.location}
      </p>
      <Stars rating={item.rating} />
      <span className="sp-reviews"> {item.reviews} reviews</span>
      <div className="sp-card-footer">
        <span className="sp-price-tag">{item.price}</span>
      </div>
    </div>
  </div>
);

const TripCard = ({ item, onToggle }) => (
  <div className="sp-card">
    <div className="sp-card-img-wrap">
      <img src={item.image} alt={item.name} className="sp-card-img" />
      <button className="sp-heart-btn" onClick={() => onToggle(item.id)}>
        ❤️
      </button>
    </div>
    <div className="sp-card-body">
      <h4 className="sp-card-title">{item.name}</h4>
      <p className="sp-card-desc">{item.desc}</p>
      <div className="sp-trip-meta">
        <span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5596fe"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>{" "}
          {item.location}
        </span>
        <span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5596fe"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>{" "}
          {item.days}
        </span>
        <span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5596fe"
            strokeWidth="2"
          >
            <path d="M3 17l4-8 4 4 4-6 4 10" />
          </svg>{" "}
          {item.type}
        </span>
      </div>
      <div className="sp-card-footer">
        <span className="sp-price-tag">{item.price}</span>
      </div>
    </div>
  </div>
);

const ActivityCard = ({ item, onToggle }) => (
  <div className="sp-card">
    <div className="sp-card-img-wrap">
      <img src={item.image} alt={item.name} className="sp-card-img" />
      <button className="sp-heart-btn" onClick={() => onToggle(item.id)}>
        ❤️
      </button>
    </div>
    <div className="sp-card-body">
      <h4 className="sp-card-title">{item.name}</h4>
      <p className="sp-card-desc">{item.desc}</p>
      <div className="sp-trip-meta">
        <span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5596fe"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>{" "}
          {item.location}
        </span>
        <span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5596fe"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>{" "}
          {item.duration}
        </span>
        <span>⭐ {item.rating}</span>
      </div>
      <div className="sp-card-footer">
        <span className="sp-price-tag">{item.price}</span>
      </div>
    </div>
  </div>
);

const RestaurantCard = ({ item, onToggle }) => (
  <div className="sp-card">
    <div className="sp-card-img-wrap">
      <img src={item.image} alt={item.name} className="sp-card-img" />
      <button className="sp-heart-btn" onClick={() => onToggle(item.id)}>
        ❤️
      </button>
    </div>
    <div className="sp-card-body">
      <h4 className="sp-card-title">{item.name}</h4>
      <p className="sp-card-desc">{item.desc}</p>
      <div className="sp-trip-meta">
        <span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5596fe"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>{" "}
          {item.location}
        </span>
        <span>🍽️ {item.cuisine}</span>
        <span>⭐ {item.rating}</span>
      </div>
      <div className="sp-card-footer">
        <span className="sp-price-moderate">{item.price}</span>
      </div>
    </div>
  </div>
);

const CafeCard = ({ item, onToggle }) => (
  <div className="sp-card">
    <div className="sp-card-img-wrap">
      <img src={item.image} alt={item.name} className="sp-card-img" />
      <button className="sp-heart-btn" onClick={() => onToggle(item.id)}>
        ❤️
      </button>
    </div>
    <div className="sp-card-body">
      <h4 className="sp-card-title">{item.name}</h4>
      <p className="sp-card-desc">{item.desc}</p>
      <div className="sp-trip-meta">
        <span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5596fe"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>{" "}
          {item.location}
        </span>
        <span>☕ {item.type}</span>
        <span>⭐ {item.rating}</span>
      </div>
      <div className="sp-card-footer">
        <span className="sp-price-moderate">{item.price}</span>
      </div>
    </div>
  </div>
);

const Section = ({
  title,
  children,
  onSeeMore,
  seeMoreLabel = "Show More",
  activeFilter,
}) => (
  <div className="sp-section">
    <div className="sp-section-header">
      <h3 className="sp-section-title">{title}</h3>
      {activeFilter === "All" && (
        <button className="sp-see-more" onClick={onSeeMore}>
          See more
        </button>
      )}
    </div>
    <div className="sp-cards-grid">{children}</div>
    {activeFilter !== "All" && (
      <div className="sp-see-more-wrap">
        <button className="sp-see-more-btn" onClick={onSeeMore}>
          {seeMoreLabel}
        </button>
      </div>
    )}
  </div>
);

const SavedPlaces = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hotels, setHotels] = useState(hotelsData);
  const [trips, setTrips] = useState(tripsData);
  const [activities, setActivities] = useState(activitiesData);
  const [restaurants, setRestaurants] = useState(restaurantsData);
  const [cafes, setCafes] = useState(cafesData);
  const [showMoreHotels, setShowMoreHotels] = useState(false);
  const [showMoreTrips, setShowMoreTrips] = useState(false);
  const [showMoreActivities, setShowMoreActivities] = useState(false);
  const [showMoreRestaurants, setShowMoreRestaurants] = useState(false);
  const [showMoreCafes, setShowMoreCafes] = useState(false);

  const toggleHotel = (id) =>
    setHotels((h) =>
      h.map((i) => (i.id === id ? { ...i, saved: !i.saved } : i)),
    );
  const toggleTrip = (id) =>
    setTrips((h) =>
      h.map((i) => (i.id === id ? { ...i, saved: !i.saved } : i)),
    );
  const toggleActivity = (id) =>
    setActivities((h) =>
      h.map((i) => (i.id === id ? { ...i, saved: !i.saved } : i)),
    );
  const toggleRestaurant = (id) =>
    setRestaurants((h) =>
      h.map((i) => (i.id === id ? { ...i, saved: !i.saved } : i)),
    );
  const toggleCafe = (id) =>
    setCafes((h) =>
      h.map((i) => (i.id === id ? { ...i, saved: !i.saved } : i)),
    );

  const show = (cat) => activeFilter === "All" || activeFilter === cat;

  return (
    <>
      <Navbar activePage="saved" />
      <div className="sp-page">
        <div className="sp-header">
          <h1 className="sp-main-title">
            <span className="sp-blue">Saved</span> Places
          </h1>
          <p className="sp-main-subtitle">
            All the places you saved in one spot, organized and easy to access.
          </p>
          <div className="sp-filters">
            {filters.map((f) => (
              <button
                key={f}
                className={`sp-filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="sp-content">
          {show("Hotels") && (
            <Section
              title="Saved Hotels"
              onSeeMore={() => setShowMoreHotels(!showMoreHotels)}
              seeMoreLabel={showMoreHotels ? "Show Less" : "Show More"}
              activeFilter={activeFilter}
            >
              {hotels.slice(0, showMoreHotels ? undefined : 3).map((item) => (
                <HotelCard key={item.id} item={item} onToggle={toggleHotel} />
              ))}
            </Section>
          )}

          {show("Trips") && (
            <Section
              title="Saved Trips"
              onSeeMore={() => setShowMoreTrips(!showMoreTrips)}
              seeMoreLabel={showMoreTrips ? "Show Less" : "Show More"}
              activeFilter={activeFilter}
            >
              {trips.slice(0, showMoreTrips ? undefined : 3).map((item) => (
                <TripCard key={item.id} item={item} onToggle={toggleTrip} />
              ))}
            </Section>
          )}

          {show("Activities") && (
            <Section
              title="Saved Activities"
              onSeeMore={() => setShowMoreActivities(!showMoreActivities)}
              seeMoreLabel={showMoreActivities ? "Show Less" : "Show More"}
              activeFilter={activeFilter}
            >
              {activities
                .slice(0, showMoreActivities ? undefined : 3)
                .map((item) => (
                  <ActivityCard
                    key={item.id}
                    item={item}
                    onToggle={toggleActivity}
                  />
                ))}
            </Section>
          )}

          {show("Restaurants") && (
            <Section
              title="Saved Restaurants"
              onSeeMore={() => setShowMoreRestaurants(!showMoreRestaurants)}
              seeMoreLabel={showMoreRestaurants ? "Show Less" : "Show More"}
              activeFilter={activeFilter}
            >
              {restaurants
                .slice(0, showMoreRestaurants ? undefined : 3)
                .map((item) => (
                  <RestaurantCard
                    key={item.id}
                    item={item}
                    onToggle={toggleRestaurant}
                  />
                ))}
            </Section>
          )}

          {show("Cafes") && (
            <Section
              title="Saved Cafes"
              onSeeMore={() => setShowMoreCafes(!showMoreCafes)}
              seeMoreLabel={showMoreCafes ? "Show Less" : "Show More"}
              activeFilter={activeFilter}
            >
              {cafes.slice(0, showMoreCafes ? undefined : 3).map((item) => (
                <CafeCard key={item.id} item={item} onToggle={toggleCafe} />
              ))}
            </Section>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SavedPlaces;
