import React, { useState, useRef, useEffect } from "react";
import "./Explore.css";
import exploreBg from "../../assets/explore/explore.jpg";
import starRate from "../../assets/explore/star-rate.svg";
import timeIcon from "../../assets/explore/bx_time.jpg";

import AttractionsIcon from "../../assets/explore/Attractions.svg";
import NightToursIcon from "../../assets/explore/Night_tours.svg";
import TravelServiceIcon from "../../assets/explore/Travel_service.svg";
import DayToursIcon from "../../assets/explore/DayTours.svg";

import heritageImg1 from "../../assets/explore/complex-of-religions-cairo.jpg";
import heritageImg2 from "../../assets/explore/al-muizz-street.jpg";
import heritageImg3 from "../../assets/explore/karnak-temple.jpg";
import heritageImg4 from "../../assets/explore/valley-of-the-kings.jpg";
import heritageImg5 from "../../assets/explore/saqqara-step-pyramid.jpg";
import heritageImg6 from "../../assets/explore/philae-temple.jpg";
import { useSavedPlaces } from "../../context/SavedPlacesContext";

// Leaflet Imports (Restored)
import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import ExperiencesIcon from "../../assets/explore/Experiences.svg";
import {
  cityCoordinates,
  uniqueExperiences,
  aiMagicDestinations,
} from "../../data/exploreData";

import { useHomePlaces } from "../../services/useHomePlaces";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

// Strict Allowed UI Options
const sidebarCities = [
  "Cairo", "Giza", "Alexandria", "Luxor", "Aswan",
  "Sharm El Sheikh", "Hurghada", "Port Said", "Ismailia",
  "Marsa Matrouh", "Fayoum"
];

const targetCategories = [
  "historical_sites", "arts_culture", "cafe", "food", 
  "food_cafes", "beaches", "shopping", "nature", 
  "religious_sites", "entertainment"
];

const categories = [
  { icon: AttractionsIcon, label: "Attractions" },
  { icon: TravelServiceIcon, label: "Travel Services" },
  { icon: ExperiencesIcon, label: "Experiences" },
  { icon: DayToursIcon, label: "Day Tours" },
  { icon: NightToursIcon, label: "Night Tours" },
];

const sortOptions = [
  "Popularity",
  "Price: Low to High",
  "Price: High to Low",
  "Rating",
];

const momentImages = [
  heritageImg1,
  heritageImg2,
  heritageImg3,
  heritageImg4,
  heritageImg5,
  heritageImg6,
];
const defaultLocationImages = [
  heritageImg1,
  heritageImg2,
  heritageImg3,
  heritageImg4,
  heritageImg5,
  heritageImg6,
];

const mapPlaceToTour = (place, idx) => ({
  id: place.place_id || idx,
  title: place.name || "Unknown Place",
  city: place.city || "Unknown",
  duration: "1 day",
  rating: place.rating ?? 4.5,
  reviews: place.reviews_count ?? 0,
  price: place.price ?? 0,
  category: place.category || "",
  badge: place.is_hidden_gem ? "Hidden Gem" : null,
  is_popular: place.is_popular || false,
  image:
    place.photo_url ||
    defaultLocationImages[idx % defaultLocationImages.length],
  image_urls: place.image_urls || [],
  opening_hours: place.opening_hours || "",
  description: place.description || "",
  maps_url: place.maps_url,
  lat: place.lat,
  lng: place.lng,
});

const trendingDestinations = [
  {
    id: 201,
    title: "The Blue Hole",
    city: "Dahab",
    description: "Dive into one of the world's most famous dive sites, with crystal-clear waters plunging over 100 meters deep.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
  },
  {
    id: 202,
    title: "Salt Lakes",
    city: "Siwa",
    description: "Float in crystal clear salt lakes for a surreal natural spa experience.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
  },
  {
    id: 203,
    title: "Orange Bay",
    city: "Hurghada",
    description: "Escape to a secluded paradise island surrounded by turquoise waters and vibrant coral reefs.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  },
  {
    id: 204,
    title: "White Desert",
    city: "Farafra",
    description: "Wander through a surreal moonscape of chalk-white rock formations sculpted by centuries of wind.",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
  },
];

const TourCard = ({ tour, selectedCategories = [] }) => {
  const { toggleSaved, isSaved } = useSavedPlaces();
  const liked = isSaved(tour.id);

  const handleToggle = () => {
    const type = selectedCategories.includes("hotels")
      ? "Hotels"
      : selectedCategories.includes("cafe")
        ? "Restaurants"
        : "Trips";
    toggleSaved({ ...tour, placeType: type });
  };

  const isVariablePrice = ["cafe", "food", "food_cafes"].includes(tour.category);

  return (
    <div className="tour-card">
      <div className="tour-card-img-wrap">
        <img src={tour.image} alt={tour.title} className="tour-card-img" />
        {tour.badge && (
          <span
            className={`tour-badge ${tour.badge === "New" ? "badge-new" : "badge-discount"}`}
          >
            {tour.badge}
          </span>
        )}
        <button
          className={`fav-btn ${liked ? "liked" : ""}`}
          onClick={handleToggle}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={liked ? "#e63946" : "none"}
            stroke={liked ? "#e63946" : "#aaa"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div className="tour-card-body">
        <h3 className="tour-card-title">{tour.title}</h3>
        <div className="tour-card-meta">
          <span className="tour-card-city">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {tour.city}
          </span>
          <span className="tour-card-rating">
            <img src={starRate} alt="rating" className="star-icon" />
            <strong>{tour.rating}</strong> ({tour.reviews} reviews)
          </span>
        </div>
        <div className="tour-card-price">
          {isVariablePrice ? "~" : ""}{tour.price} EGP
        </div>
        <div className="tour-card-duration">
          <img src={timeIcon} alt="duration" className="time-icon" />
          {tour.duration}
        </div>
        <button
          className="tour-card-view-btn"
          onClick={() => {
            window.navigateToTripDetails &&
              window.navigateToTripDetails({ ...tour, category: tour.category || "attraction" });
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const TrendingCard = ({ item }) => (
  <div
    className="trending-card"
    style={{ backgroundImage: `url(${item.image})` }}
  >
    <div className="trending-card-overlay" />
    <div className="trending-card-content">
      <h3 className="trending-card-title">{item.title}</h3>
      <p className="trending-card-city">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {item.city}
      </p>
      <p className="trending-card-description">{item.description}</p>
      <button
        className="trending-visit-btn"
        onClick={() =>
          window.navigateToTripDetails &&
          window.navigateToTripDetails({
            ...item,
            category: item.category || "attraction",
            rating: item.rating || 4.7,
            reviews: item.reviews || 120,
            price: item.price || 0,
          })
        }
      >
        Visit Now
      </button>
    </div>
  </div>
);

const AIMagicCard = ({ item }) => (
  <div className={`ai-magic-card ${item.large ? "ai-magic-card-large" : ""}`}>
    <div className="ai-magic-img-wrap">
      <img src={item.image} alt={item.title} className="ai-magic-img" />
      <div className="ai-magic-img-overlay" />
      <div className="ai-magic-card-content">
        <h3 className="ai-magic-title">{item.title}</h3>
        <button
          className="ai-magic-action-btn"
          onClick={() =>
            window.navigateToTripDetails &&
            window.navigateToTripDetails({
              ...item,
              category: "attraction",
              rating: 4.7,
              reviews: 100,
              price: 0,
            })
          }
        >
          View Now
        </button>
      </div>
    </div>
  </div>
);

const AIMagicSection = () => (
  <div className="ai-magic-section">
    <hr className="unique-exp-divider" />
    <h2 className="ai-magic-heading">
      <span className="text-blue">AI</span> Magic
    </h2>
    <p className="ai-magic-subtitle">Smartly curated just for your taste</p>
    <div className="ai-magic-grid">
      {aiMagicDestinations.map((item) => (
        <AIMagicCard key={item.id} item={item} />
      ))}
    </div>
    <hr className="unique-exp-divider" />
  </div>
);

const UniqueExperienceCard = ({ item }) => (
  <div className="unique-exp-card">
    <div className="unique-exp-img-wrap">
      <img src={item.image} alt={item.title} className="unique-exp-img" />
      <div className="unique-exp-rating">
        <img src={starRate} alt="star" className="unique-exp-star" />
        <span>{item.rating}</span>
      </div>
    </div>
    <div className="unique-exp-body">
      <h3 className="unique-exp-title">{item.title}</h3>
      <p className="unique-exp-vibe">Vibe: {item.vibe}</p>
      <p className="unique-exp-reviews">({item.reviews} reviews)</p>
      <button
        className="unique-exp-btn"
        onClick={() =>
          window.navigateToTripDetails &&
          window.navigateToTripDetails({ ...item, category: "attraction" })
        }
      >
        More Details
      </button>
    </div>
  </div>
);

const UniqueExperienceSection = () => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState);
      updateScrollState();
      return () => el.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  const scroll = (dir) => {
    const el = carouselRef.current;
    if (el) {
      const card = el.querySelector(".unique-exp-card");
      const itemWidth = (card?.clientWidth || 260) + 20;
      el.scrollBy({ left: dir * itemWidth * 4, behavior: "smooth" });
    }
  };

  return (
    <div className="unique-exp-section">
      <hr className="unique-exp-divider" />
      <h2 className="unique-exp-heading">
        <span className="text-blue">Unique</span> Experience
      </h2>
      <div className="unique-exp-carousel-wrapper">
        {canScrollLeft && (
          <button
            className="unique-exp-arrow unique-exp-arrow-left"
            onClick={() => scroll(-1)}
          >
            &#8249;
          </button>
        )}
        <div className="unique-exp-carousel" ref={carouselRef}>
          {uniqueExperiences.map((item) => (
            <UniqueExperienceCard key={item.id} item={item} />
          ))}
        </div>
        {canScrollRight && (
          <button
            className="unique-exp-arrow unique-exp-arrow-right"
            onClick={() => scroll(1)}
          >
            &#8250;
          </button>
        )}
      </div>
      <hr className="unique-exp-divider" />
    </div>
  );
};

const Explore = () => {
  // Completely decoupled search box states - MUST initialize empty/null
  const [searchBoxCity, setSearchBoxCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchCity, setActiveSearchCity] = useState("Cairo");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filterCity, setFilterCity] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);
  const [tourNameSearch, setTourNameSearch] = useState("");
  const [sortBy, setSortBy] = useState("Popularity");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [showMorePopular, setShowMorePopular] = useState(false);
  const [showMoreTrending, setShowMoreTrending] = useState(false);
  const [showHiddenGems, setShowHiddenGems] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Data fetching
  const {
    featured = [],
    hidden_gems: hiddenGems = [],
    popular: popularAPI = [], 
    loading,
    error,
  } = useHomePlaces(activeSearchCity);

  const dropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(e.target)
      )
        setSortDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    // Only fetch/update global map when SEARCH is explicitly clicked
    if (searchBoxCity) {
      setActiveSearchCity(searchBoxCity);
    }
    if (searchQuery.trim()) {
      setTourNameSearch(searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const toggleFilterCity = (city) => {
    setFilterCity((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city],
    );
  };

  // Extract Popular items entirely from the top explore display
  const popularPlacesList = popularAPI.length > 0 ? popularAPI : featured.filter(p => p.is_popular);
  const popularIds = new Set(popularPlacesList.map(p => p.place_id));
  
  // Regular items for the top that specifically exclude Popular items
  const regularFeaturedList = featured.filter(p => !p.is_popular && !popularIds.has(p.place_id));

  const getFilteredTours = () => {
    let source = showHiddenGems ? hiddenGems : regularFeaturedList;
    let tours = source.map(mapPlaceToTour);

    if (filterCity.length > 0) tours = tours.filter((t) => filterCity.includes(t.city));
    if (selectedCategories.length > 0) tours = tours.filter((t) => selectedCategories.includes(t.category));
    if (tourNameSearch) tours = tours.filter((t) => t.title.toLowerCase().includes(tourNameSearch.toLowerCase()));
    
    tours = tours.filter((t) => t.price <= priceRange);
    
    if (showHiddenGems) tours = tours.filter((t) => t.badge === "Hidden Gem");
    
    if (sortBy === "Price: Low to High") tours.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") tours.sort((a, b) => b.price - a.price);
    else if (sortBy === "Rating") tours.sort((a, b) => b.rating - a.rating);

    return tours;
  };

  const filteredTours = getFilteredTours();

  const hasActiveFilter =
    filterCity.length > 0 ||
    tourNameSearch ||
    showHiddenGems ||
    selectedCategories.length > 0 ||
    priceRange < 10000;

  const getMapCircles = () => {
    const tours = regularFeaturedList.map(mapPlaceToTour);
    const citiesInTours = [...new Set(tours.map((t) => t.city))];
    return citiesInTours
      .filter((city) => cityCoordinates[city])
      .map((city) => ({
        city,
        coords: cityCoordinates[city],
        color: "#5596fe",
      }));
  };

  const mapCircles = getMapCircles();

  // Top Explore Section Source (Explicitly prevents Popular elements from rendering here)
  const exploreSource = regularFeaturedList.map(mapPlaceToTour);
  const displayedExplore = showMorePopular ? exploreSource : exploreSource.slice(0, 6);

  // Bottom Trending Section Source (Explicitly forces ONLY popular elements to render here)
  const popularSource = popularPlacesList.map(mapPlaceToTour);
  const displayedTrending = showMoreTrending 
    ? popularSource 
    : popularSource.slice(0, 4);

  return (
    <>
      <div
        className="explore-container"
        style={{ backgroundImage: `url(${exploreBg})` }}
      >
        <div className="overlay" />
        <Navbar activePage="explore" />
        <div className="explore-content">
          <h1>Discover more</h1>
          <div className="search-container">
            <div className="custom-select-wrapper" ref={dropdownRef}>
              <div
                className={`custom-select-trigger ${dropdownOpen ? "open" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{searchBoxCity || "Select City"}</span>
                <svg
                  className={`chevron ${dropdownOpen ? "rotate" : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {dropdownOpen && (
                <div className="custom-dropdown-menu">
                  {sidebarCities.map((city) => (
                    <div
                      key={city}
                      className={`custom-dropdown-item ${searchBoxCity === city ? "selected" : ""}`}
                      onClick={() => {
                        setSearchBoxCity(city);
                        setDropdownOpen(false);
                      }}
                    >
                      {city}
                      {searchBoxCity === city && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#5596fe"
                          strokeWidth="2.5"
                        >
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

      <div className="explore-main">
        <aside className="explore-sidebar">
          <div className="sidebar-section">
            <h4>Select by tour name</h4>
            <div className="sidebar-search">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#aaa"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="E.g. Luxor tour"
                value={tourNameSearch}
                onChange={(e) => setTourNameSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Select City</h4>
            <div className="sidebar-city-list">
              {sidebarCities.map((city) => (
                <label key={city} className="sidebar-checkbox">
                  <input
                    type="checkbox"
                    checked={filterCity.includes(city)}
                    onChange={() => toggleFilterCity(city)}
                  />
                  <span>{city}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Special Filter</h4>
            <label className="sidebar-checkbox">
              <input
                type="checkbox"
                checked={showHiddenGems}
                onChange={() => {
                  setShowHiddenGems(!showHiddenGems);
                  if (!showHiddenGems) {
                    setTimeout(() => {
                      document
                        .getElementById("hidden-gems-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
              />
              <span>Show hidden gems only</span>
            </label>
          </div>

          <div className="sidebar-section">
            <h4>Select Category</h4>
            <div className="sidebar-city-list">
              {targetCategories.map((cat) => (
                <label key={cat} className="sidebar-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() =>
                      setSelectedCategories((prev) =>
                        prev.includes(cat)
                          ? prev.filter((c) => c !== cat)
                          : [...prev, cat],
                      )
                    }
                  />
                  <span style={{ textTransform: 'capitalize' }}>{cat.replace(/_/g, ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Price Range</h4>
            <input
              type="range"
              min="160"
              max="10000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="price-slider"
            />
            <div className="price-range-labels">
              <span>160 EGP</span>
              <span>{priceRange} EGP</span>
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Moments from Trippers</h4>
            <div className="moments-grid">
              {momentImages.map((img, i) => (
                <img key={i} src={img} alt="moment" className="moment-thumb" />
              ))}
            </div>
          </div>
        </aside>

        <div className="explore-cards-section">
          {hasActiveFilter ? (
            <>
              <div className="cards-header">
                <h2>{filteredTours.length} Results</h2>
                <div className="sort-wrapper" ref={sortDropdownRef}>
                  <span className="sort-label">Sort by :</span>
                  <div
                    className={`sort-trigger ${sortDropdownOpen ? "open" : ""}`}
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  >
                    <span>{sortBy}</span>
                    <svg
                      className={`chevron ${sortDropdownOpen ? "rotate" : ""}`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  {sortDropdownOpen && (
                    <div className="sort-dropdown">
                      {sortOptions.map((opt) => (
                        <div
                          key={opt}
                          className={`sort-option ${sortBy === opt ? "selected" : ""}`}
                          onClick={() => {
                            setSortBy(opt);
                            setSortDropdownOpen(false);
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="active-filters">
                {showHiddenGems && (
                  <span className="filter-tag">
                    Hidden Gems{" "}
                    <button onClick={() => setShowHiddenGems(false)}>✕</button>
                  </span>
                )}
                {selectedCategories.map((cat) => (
                  <span key={cat} className="filter-tag">
                    <span style={{ textTransform: 'capitalize' }}>{cat.replace(/_/g, ' ')}</span>{" "}
                    <button
                      onClick={() =>
                        setSelectedCategories((prev) =>
                          prev.filter((c) => c !== cat),
                        )
                      }
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {filterCity.map((city) => (
                  <span key={city} className="filter-tag">
                    {city}{" "}
                    <button onClick={() => toggleFilterCity(city)}>✕</button>
                  </span>
                ))}
                <button
                  className="clear-all-btn"
                  onClick={() => {
                    setFilterCity([]);
                    setShowHiddenGems(false);
                    setSelectedCategories([]);
                    setTourNameSearch("");
                    setPriceRange(10000);
                  }}
                >
                  Clear all
                </button>
              </div>
              <div className="tours-grid">
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      selectedCategories={selectedCategories}
                    />
                  ))
                ) : (
                  <div className="loading-placeholder">No results found.</div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="cards-header">
                <h2>
                  <span className="text-blue">Explore</span> Destinations
                </h2>
              </div>
              {error && <div className="fetch-error">{error}</div>}
              <div className="tours-grid">
                {loading && !displayedExplore.length ? (
                  <div className="loading-placeholder">
                    Loading destinations...
                  </div>
                ) : (
                  displayedExplore.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      selectedCategories={selectedCategories}
                    />
                  ))
                )}
              </div>
              {!showMorePopular && exploreSource.length > 6 && (
                <div className="show-more-wrap">
                  <button
                    className="show-more-btn"
                    onClick={() => setShowMorePopular(true)}
                  >
                    Show More
                  </button>
                </div>
              )}

              {(showHiddenGems || hiddenGems.length > 0) && (
                <div className="hidden-gems-section" id="hidden-gems-section">
                  <div className="cards-header" style={{ marginTop: '30px' }}>
                    <h2>Hidden Gems</h2>
                  </div>
                  <div className="tours-grid">
                    {hiddenGems.map((place, idx) => (
                      <TourCard
                        key={place.place_id}
                        tour={mapPlaceToTour(place, idx)}
                        selectedCategories={selectedCategories}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="map-section">
        <h2 className="map-title">
          <span className="text-blue">Egypt</span> Map
        </h2>
        <p className="map-subtitle">Warm winter escapes.</p>
        <div className="map-container-wrap">
          <MapContainer
            center={[26.5, 29.8]}
            zoom={7}
            scrollWheelZoom={false}
            className="leaflet-map"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {mapCircles.map(({ city, coords, color }) => (
              <Circle
                key={city}
                center={[coords.lat, coords.lng]}
                radius={80000}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.25,
                  weight: 2,
                }}
              >
                <Tooltip
                  permanent
                  direction="center"
                  className="map-city-tooltip"
                >
                  <span>{city}</span>
                </Tooltip>
              </Circle>
            ))}
          </MapContainer>
        </div>
      </div>

      {popularSource.length > 0 && (
        <div className="trending-section">
          <h2 className="trending-title">
            <span className="text-blue">Trending</span> Now
          </h2>
          <p className="trending-subtitle">Highly Popular Right Now.</p>
          <div className="trending-grid">
            {displayedTrending.map((item) => (
              <TrendingCard key={item.id} item={item} />
            ))}
          </div>
          {!showMoreTrending && popularSource.length > 4 && (
            <div className="show-more-wrap">
              <button
                className="show-more-btn"
                onClick={() => setShowMoreTrending(true)}
              >
                Show More
              </button>
            </div>
          )}
        </div>
      )}

      {popularSource.length === 0 && (
        <div className="trending-section">
          <h2 className="trending-title">
            <span className="text-blue">Trending</span> Now
          </h2>
          <p className="trending-subtitle">Warm winter escapes.</p>
          <div className="trending-grid">
            {trendingDestinations.map((item) => (
              <TrendingCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      <UniqueExperienceSection />
      <AIMagicSection />
      <Footer />
    </>
  );
};

export default Explore;