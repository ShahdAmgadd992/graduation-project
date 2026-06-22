import React, { useState, useEffect } from "react";
import "./Calendar.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import dahab from "../../assets/cities/dahab.jpg";
import luxor from "../../assets/cities/luxor.jpg";
import aswan from "../../assets/cities/aswan.jpg";
import tripService from "../../services/tripService";

const TRIPS = [
  {
    id: 1,
    title: "Dahab Adventure",
    location: "Dahab, South Sinai",
    startDay: 8,
    endDay: 10,
    month: 4,
    year: 2026,
    image: dahab,
    color: "#FF6B6B",
  },
  {
    id: 2,
    title: "Egypt Adventure",
    location: "Cairo",
    startDay: 12,
    endDay: 16,
    month: 4,
    year: 2026,
    image: luxor,
    color: "#A78BFA",
  },
  {
    id: 3,
    title: "Aswan Tour",
    location: "Aswan",
    startDay: 21,
    endDay: 25,
    month: 4,
    year: 2026,
    image: aswan,
    color: "#34D399",
  },
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}
function getDaysInPrevMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function CalendarPage() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [trips, setTrips] = useState(TRIPS); // fallback للـ hardcoded

  useEffect(() => {
    tripService
      .getTrips({ Page: 1, PageSize: 50 })
      .then((res) => {
        const items = res.data?.items || res.data || [];
        if (items.length > 0) {
          const mapped = items
            .filter((t) => t.startDate && t.endDate)
            .map((t, i) => {
              const start = new Date(t.startDate);
              const end = new Date(t.endDate);
              const colors = [
                "#FF6B6B",
                "#A78BFA",
                "#34D399",
                "#F59E0B",
                "#3B82F6",
              ];
              return {
                id: t.id,
                title: t.title,
                location: t.city || t.location || "Egypt",
                startDay: start.getDate(),
                endDay: end.getDate(),
                month: start.getMonth(),
                year: start.getFullYear(),
                image: t.coverImage || dahab,
                color: colors[i % colors.length],
              };
            });
          setTrips(mapped);
        }
      })
      .catch((err) => console.error("Failed to load trips for calendar:", err));
  }, []);

  function getTripForDay(day, month, year) {
    for (let i = 0; i < trips.length; i++) {
      const t = trips[i];
      if (
        t.month === month &&
        t.year === year &&
        day >= t.startDay &&
        day <= t.endDay
      )
        return t;
    }
    return null;
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const prevMonthDays = getDaysInPrevMonth(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  }

  function isToday(day) {
    return (
      day === today.getDate() &&
      viewMonth === today.getMonth() &&
      viewYear === today.getFullYear()
    );
  }

  // Build cells: prev month trailing days + current month + next month leading days
  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ day: prevMonthDays - i, type: "prev" });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, type: "current" });
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) cells.push({ day: d, type: "next" });

  const formatDate = (day, month) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${d} ${MONTH_NAMES[month].slice(0, 3)}`;
  };

  return (
    <React.Fragment>
      <Navbar
        activePage="calendar"
        style={{ position: "relative", zIndex: 10 }}
      />
      <div className="calendar-page">
        <div className="calendar-header">
          <h1 className="calendar-title">
            <span className="blue-text">Trip</span> Calendar
          </h1>
          <p className="calendar-subtitle">
            All your upcoming adventures, active plans, and travel dates in one
            place.
          </p>
        </div>

        <div
          className={`calendar-body ${trips.filter((t) => t.month === viewMonth && t.year === viewYear).length === 0 ? "no-trips" : ""}`}
        >
          {/* Left: Month Grid */}
          <div className="calendar-grid-wrap">
            <div className="cal-nav">
              <button className="cal-arrow" onClick={prevMonth}>
                &#8249;
              </button>
              <span className="cal-month-label">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button className="cal-arrow" onClick={nextMonth}>
                &#8250;
              </button>
            </div>
            <hr className="cal-divider" />
            <div className="cal-grid">
              {DAY_NAMES.map((d) => (
                <div key={d} className="cal-day-name">
                  {d}
                </div>
              ))}
              {cells.map((cell, i) => {
                if (cell.type !== "current") {
                  return (
                    <div key={i} className="cal-day cal-day-other">
                      {cell.day}
                    </div>
                  );
                }
                const trip = getTripForDay(cell.day, viewMonth, viewYear);
                const color = trip ? String(trip.color) : null;
                const isStart = trip && trip.startDay === cell.day;
                const isEnd = trip && trip.endDay === cell.day;
                const isSingle = trip && trip.startDay === trip.endDay;

                let cls = "cal-day";
                if (isToday(cell.day)) cls += " cal-today";
                if (color) {
                  if (isSingle) cls += " cal-trip-single";
                  else if (isStart) cls += " cal-trip-start";
                  else if (isEnd) cls += " cal-trip-end";
                  else cls += " cal-trip-mid";
                }

                const style =
                  color && !isToday(cell.day)
                    ? {
                        backgroundColor: color + "33",
                        color: color,
                        fontWeight: 700,
                      }
                    : {};

                return (
                  <div key={i} className={cls} style={style}>
                    {cell.day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Trip Cards */}
          <div className="calendar-trips">
            {trips
              .filter((t) => t.month === viewMonth && t.year === viewYear)
              .map((trip) => (
                <div className="trip-card" key={trip.id}>
                  <div
                    className="trip-bookmark"
                    style={{ borderTopColor: trip.color }}
                  >
                    <div
                      className="trip-bookmark-inner"
                      style={{ backgroundColor: trip.color }}
                    />
                  </div>
                  <div className="trip-card-img">
                    <img src={trip.image} alt={trip.title} />
                  </div>
                  <div className="trip-card-info">
                    <h4 className="trip-card-title">{trip.title}</h4>
                    <p className="trip-card-location">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {trip.location}
                    </p>
                    <p className="trip-card-dates">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {formatDate(trip.startDay, trip.month)} –{" "}
                      {formatDate(trip.endDay, trip.month)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default CalendarPage;
