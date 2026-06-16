import React, { useState } from "react";
import "./Calendar.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import dahab from "../../assets/cities/dahab.jpg";
import luxor from "../../assets/cities/luxor.jpg";
import aswan from "../../assets/cities/aswan.jpg";

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
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function getTripColorForDay(day, month, year) {
  for (let i = 0; i < TRIPS.length; i++) {
    const trip = TRIPS[i];
    if (
      trip.month === month &&
      trip.year === year &&
      day >= trip.startDay &&
      day <= trip.endDay
    ) {
      return String(trip.color);
    }
  }
  return null;
}

function CalendarPage() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(4);
  const [viewYear, setViewYear] = useState(2026);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(function (y) {
        return y - 1;
      });
    } else
      setViewMonth(function (m) {
        return m - 1;
      });
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(function (y) {
        return y + 1;
      });
    } else
      setViewMonth(function (m) {
        return m + 1;
      });
  }

  function isToday(day) {
    return (
      day === today.getDate() &&
      viewMonth === today.getMonth() &&
      viewYear === today.getFullYear()
    );
  }

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <React.Fragment>
      <Navbar activePage="calendar" />
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

        <div className="calendar-body">
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

            <div className="cal-grid">
              {DAY_NAMES.map(function (d) {
                return (
                  <div key={d} className="cal-day-name">
                    {d}
                  </div>
                );
              })}
              {cells.map(function (day, i) {
                if (!day) return <div key={"empty-" + i} />;
                const color = getTripColorForDay(day, viewMonth, viewYear);
                const isStart = TRIPS.some(function (t) {
                  return (
                    t.month === viewMonth &&
                    t.year === viewYear &&
                    t.startDay === day
                  );
                });
                const isEnd = TRIPS.some(function (t) {
                  return (
                    t.month === viewMonth &&
                    t.year === viewYear &&
                    t.endDay === day
                  );
                });

                let className = "cal-day";
                if (isToday(day)) className += " cal-today";
                if (color) className += " cal-trip-day";
                if (isStart) className += " cal-trip-start";
                if (isEnd) className += " cal-trip-end";

                const dayStyle = color
                  ? {
                      backgroundColor: color + "33",
                      color: color,
                      fontWeight: 700,
                    }
                  : {};

                return (
                  <div key={day} className={className} style={dayStyle}>
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="calendar-trips">
            {TRIPS.filter(function (t) {
              return t.month === viewMonth && t.year === viewYear;
            }).map(function (trip) {
              return (
                <div className="trip-card" key={trip.id}>
                  <div className="trip-card-img">
                    <img src={trip.image} alt={trip.title} />
                  </div>
                  <div className="trip-card-info">
                    <h4 className="trip-card-title">{trip.title}</h4>
                    <p className="trip-card-location">
                      <span>📍</span> {trip.location}
                    </p>
                    <p className="trip-card-dates">
                      <span>🗓</span> {trip.startDay}{" "}
                      {MONTH_NAMES[trip.month].slice(0, 3)} – {trip.endDay}{" "}
                      {MONTH_NAMES[trip.month].slice(0, 3)}
                    </p>
                  </div>
                  <div
                    className="trip-card-bookmark"
                    style={{ color: trip.color }}
                  >
                    ▼
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default CalendarPage;
