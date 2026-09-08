import React, { useEffect, useState } from "react";
import "./App.css";

const SERVICES = [
  { icon: "🔧", bg: "#FEE8DA", name: "Plumbing", price: "Starting ₹299", count: "340+ experts" },
  { icon: "⚡", bg: "#EEF2FF", name: "Electrical", price: "Starting ₹349", count: "280+ experts" },
  { icon: "🪵", bg: "#EAF3DE", name: "Carpentry", price: "Starting ₹399", count: "190+ experts" },
  { icon: "🧱", bg: "#FFFBEB", name: "Masonry", price: "Starting ₹450", count: "120+ experts" },
  { icon: "❄️", bg: "#FEE8DA", name: "AC Repair", price: "Starting ₹499", count: "210+ experts" },
  { icon: "🎨", bg: "#F5F0FF", name: "Painting", price: "Starting ₹299", count: "160+ experts" },
  { icon: "🧹", bg: "#EAF3DE", name: "Cleaning", price: "Starting ₹599", count: "400+ experts" },
  { icon: "🏗️", bg: "#FFF0F0", name: "Daily Labour", price: "₹600/day", count: "500+ workers" }
];

const STEPS = [
  { n: 1, h: "Choose a Service", p: "Pick from 20+ categories based on your need" },
  { n: 2, h: "Select a Worker", p: "Browse verified profiles, ratings & reviews" },
  { n: 3, h: "Pick a Timeslot", p: "Choose a time that works for your schedule" },
  { n: 4, h: "Done & Reviewed", p: "Pay after work is done, then rate the service" }
];

const TOP_WORKERS = [
  { initials: "RS", bg: "#FEE8DA", color: "#C04810", name: "Ramesh Sahu", role: "Senior Plumber", rating: "4.9★", jobs: "210", exp: "8 yrs", tags: ["Pipe repair", "Leak fix"] },
  { initials: "MK", bg: "#EEF2FF", color: "#4338CA", name: "Manoj Kumar", role: "Master Electrician", rating: "4.8★", jobs: "183", exp: "12 yrs", tags: ["Wiring", "Switchboard"] },
  { initials: "SP", bg: "#EAF3DE", color: "#3B6D11", name: "Suresh Patil", role: "Expert Carpenter", rating: "4.7★", jobs: "97", exp: "5 yrs", tags: ["Furniture", "Doors"] }
];

const TRUST_POINTS = [
  { icon: "🔍", h: "Background Verified", p: "Every worker goes through identity & skill verification before joining the platform." },
  { icon: "💰", h: "Transparent Pricing", p: "No hidden charges. You see the full price before confirming any booking." },
  { icon: "🛡️", h: "Service Guarantee", p: "Not satisfied? We will send another professional or give you a full refund." },
  { icon: "📞", h: "24/7 Support", p: "Our team is available around the clock to resolve any issues instantly." }
];

const REVIEWS = [
  { initials: "PD", bg: "#FEE8DA", color: "#C04810", name: "Priya Deshmukh", loc: "Nagpur, Maharashtra", stars: "★★★★★", text: "Got a plumber in 30 minutes on a Sunday morning. Excellent service and very professional." },
  { initials: "AJ", bg: "#EEF2FF", color: "#4338CA", name: "Ajay Joshi", loc: "Nagpur, Maharashtra", stars: "★★★★★", text: "The carpenter was on time and did a great job fixing my wardrobe." },
  { initials: "NB", bg: "#EAF3DE", color: "#3B6D11", name: "Neha Bharti", loc: "Nagpur, Maharashtra", stars: "★★★★☆", text: "Super convenient. Booked an electrician while cooking dinner." }
];

const HERO_WORKERS = [
  { initials: "RS", bg: "#FEE8DA", color: "#C04810", name: "Ramesh Sahu", role: "Senior Plumber · 8 yrs", rate: "₹320/hr", stars: "★ 4.9" },
  { initials: "MK", bg: "#EEF2FF", color: "#4338CA", name: "Manoj Kumar", role: "Electrician · 12 yrs", rate: "₹380/hr", stars: "★ 4.8" },
  { initials: "SP", bg: "#EAF3DE", color: "#3B6D11", name: "Suresh Patil", role: "Carpenter · 5 yrs", rate: "₹410/hr", stars: "★ 4.7" }
];

const CITIES = ["📍 Nagpur", "Mumbai", "Pune", "Delhi", "Bangalore", "Hyderabad", "Chennai"];
const HERO_TAGS = ["🔧 Plumber", "⚡ Electrician", "🪵 Carpenter", "❄️ AC Repair", "🎨 Painter"];

export default function FixItWebsite() {
  const [city, setCity] = useState(CITIES[0]);
  const [query, setQuery] = useState("");
  const [services, setServices] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
const [showBookings, setShowBookings] = useState(false);
const [bookingData, setBookingData] = useState({
  scheduledAt: "",
  address: "",
  city: "",
  problemDescription: ""
});
const [bookingMessage, setBookingMessage] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("fixit_token")
);

  useEffect(() => {
    fetch("http://localhost:8080/api/services")
      .then((response) => response.json())
      .then((data) => {
        console.log("Services from backend:", data);
        setServices(data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const handleSearch = () => {

  console.log("Search:", { city, query });

};

// 👇 YAHAN loadMyBookings paste karo

const loadMyBookings = async () => {
  const token = localStorage.getItem("fixit_token");

  if (!token) {
    alert("❌ Please login first.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8080/api/bookings/my",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    console.log("My Bookings:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to load bookings");
    }

    setMyBookings(data);
    setShowBookings(true);

  } catch (error) {
    console.error("My Bookings error:", error);
    alert("❌ " + error.message);
  }
};

// 👇 Iske baad tumhara existing handleLogin rahega

const handleLogin = async () => {

  const email = prompt("Enter your email:");

  const password = prompt("Enter your password:");

  if (!email || !password) {
    alert("Email and password are required.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8080/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    );

    const data = await response.json();

    console.log("Login Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // JWT token save
    localStorage.setItem("fixit_token", data.token);

    // User information save
    localStorage.setItem(
      "fixit_user",
      JSON.stringify(data)
    );

    setIsLoggedIn(true);

    alert("✅ Login successful!");
  } catch (error) {
    console.error("Login error:", error);
    alert("❌ Login failed: " + error.message);
  }
};

  return (
    <div className="fixit-root">

      <nav>
        <a className="logo" href="#top">
          Fix<span>It</span>
        </a>

        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#how">How it works</a></li>
          <li><a href="#workers">Workers</a></li>
          <li><a href="#trust">Why FixIt</a></li>
        </ul>

       <div className="nav-actions">

  <button
    className="btn-ghost"
    onClick={handleLogin}
  >
    {isLoggedIn ? "Logged In ✓" : "Sign in"}
  </button>

  <button
    className="btn-ghost"
    onClick={loadMyBookings}
  >
    My Bookings
  </button>

  <button className="btn-primary">
    Book a Service
  </button>

</div>
            </nav>

      {/* ================= MY BOOKINGS ================= */}

      {showBookings && (
        <section
          className="section"
          style={{
            background: "#fff",
            marginTop: "30px"
          }}
        >
          <div className="section-header">
            <div>
              <div className="section-tag">Your bookings</div>

              <div className="section-title">
                My Bookings
              </div>
            </div>

            <button
              className="btn-ghost"
              onClick={() => setShowBookings(false)}
            >
              Close
            </button>
          </div>

          {myBookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div className="services-grid">
              {myBookings.map((booking) => (
                <div
                  className="service-card"
                  key={booking.id}
                  style={{
                    cursor: "default",
                    textAlign: "left"
                  }}
                >
                  <div className="service-icon">
                    📋
                  </div>

                  <h3>
                    {booking.service?.name || "Service"}
                  </h3>

                  <p>
                    <strong>Booking ID:</strong> #{booking.id}
                  </p>

                  <p>
                    <strong>Worker:</strong>{" "}
                    {booking.worker?.user?.name || "Worker"}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.scheduledAt
                      ? new Date(
                          booking.scheduledAt
                        ).toLocaleString("en-IN")
                      : "N/A"}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {booking.address || "N/A"}
                  </p>

                  <p>
                    <strong>City:</strong>{" "}
                    {booking.city || "N/A"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {booking.status || "PENDING"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="hero-wrapper"></div>
      

      <div className="hero-wrapper">
        <div className="hero">
          <div className="hero-eyebrow">
            Trusted by 50,000+ homes across India
          </div>

          <h1>
            Find Skilled<br />
            Workers,<br />
            <span className="accent">Instantly.</span>
          </h1>

          <p className="hero-desc">
            Plumbers, electricians, carpenters, and more — all verified, rated,
            and available near you. Book in under 2 minutes.
          </p>

          <div className="search-wrap">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="What do you need?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button
              className="search-btn"
              onClick={handleSearch}
            >
              Search →
            </button>
          </div>

          <div className="hero-tags">
            {HERO_TAGS.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-badge fb1">
            <div className="fb-label">Avg response time</div>
            <div className="fb-val">28 min</div>
          </div>

          <div className="hero-card-main">
            <div className="card-header">
              <div className="hc-title">Available Now · Nagpur</div>
              <div className="hc-badge">● 24 Online</div>
            </div>

            <div className="worker-list">
              {HERO_WORKERS.map((w) => (
                <div className="w-item" key={w.name}>
                  <div
                    className="w-avatar"
                    style={{ background: w.bg, color: w.color }}
                  >
                    {w.initials}
                  </div>

                  <div className="w-info">
                    <div className="w-name">{w.name}</div>
                    <div className="w-role">{w.role}</div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div className="w-rate">{w.rate}</div>
                    <div className="w-stars">{w.stars}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="floating-badge fb2">
            <div className="fb-label">Jobs completed today</div>
            <div className="fb-val">1,284</div>
          </div>
        </div>
      </div>

      <div className="stats-strip">
        <div className="stat-item">
          <div className="stat-num">12<span>K+</span></div>
          <div className="stat-label">Verified Professionals</div>
        </div>

        <div className="stat-item">
          <div className="stat-num">50<span>K+</span></div>
          <div className="stat-label">Happy Customers</div>
        </div>

        <div className="stat-item">
          <div className="stat-num">4.8<span>★</span></div>
          <div className="stat-label">Average Rating</div>
        </div>

        <div className="stat-item">
          <div className="stat-num">28<span>min</span></div>
          <div className="stat-label">Avg. Response Time</div>
        </div>

        <div className="stat-item">
          <div className="stat-num">18<span>+</span></div>
          <div className="stat-label">Cities Covered</div>
        </div>
      </div>

      <div id="services" className="section">
        <div className="section-header">
          <div>
            <div className="section-tag">What we offer</div>

            <div className="section-title">
              Every Home Service,<br />
              One Platform
            </div>
          </div>

          <a className="view-all" href="#services">
            View all services
          </a>
        </div>

        <div className="services-grid">
          {services.map((s, index) => {
            const backgrounds = [
              "#FEE8DA",
              "#EEF2FF",
              "#EAF3DE",
              "#FFFBEB",
              "#F5F0FF",
              "#FFF0F0"
            ];

            return (
              <div
                className="service-card"
                key={s.id}
                onClick={() => {
                  fetch(
                    `http://localhost:8080/api/workers/search?serviceId=${s.id}`
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(
                        "Workers for service:",
                        s.name,
                        data
                      );
                      setWorkers(data);
                    })
                    .catch((error) => {
                      console.error(
                        "Error fetching workers:",
                        error
                      );
                    });
                }}
              >
                <div
                  className="service-icon"
                  style={{
                    backgroundColor:
                      backgrounds[index % backgrounds.length]
                  }}
                >
                  {s.icon || "🔧"}
                </div>

                <h3>{s.name}</h3>

                <p>
                  Starting ₹
                  {Number(s.basePrice).toLocaleString("en-IN")}
                </p>

                {s.expertCount && (
                  <span>{s.expertCount}+ experts</span>
                )}
              </div>
            );
          })}
                </div>

```jsx
{workers.length > 0 && (
  <div
    className="workers-section"
    style={{ marginTop: "40px" }}
  >

    <h2>Available Workers</h2>

    <div className="services-grid">

      {workers.map((worker) => (

        <div
          className="service-card"
          key={worker.id}
          onClick={() => {
            console.log("Selected Worker:", worker);
          }}
        >

          <div className="service-icon">
            👨‍🔧
          </div>

          <h3>
            Worker #{worker.id}
          </h3>

          <p>
            {worker.service?.name}
          </p>

          <p>
            {worker.experienceYears} years experience
          </p>

          <p>
            ₹{worker.hourlyRate} / hour
          </p>

          <p>
            ⭐ {worker.avgRating}
          </p>

          <p>
            {worker.city}
          </p>

          <button
            className="book-btn"
            onClick={(e) => {
              e.stopPropagation();

              console.log("BUTTON CLICKED");
              console.log("Selected worker:", worker);

              setSelectedWorker(worker);

              setBookingMessage("");

              setBookingData({
                scheduledAt: "",
                address: "",
                city: worker.city || "",
                problemDescription: ""
              });
            }}
          >
            Book Worker →
          </button>

        </div>

      ))}

    </div>

  </div>
)}

{/* ================= BOOKING FORM ================= */}

{selectedWorker && (
  <div
    className="booking-section"
    style={{
      marginTop: "40px",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "15px",
      background: "#fff"
    }}
  >

    <h2>Book Worker</h2>

    <p>
      <strong>Worker:</strong>{" "}
      Worker #{selectedWorker.id}
    </p>

    <p>
      <strong>Service:</strong>{" "}
      {selectedWorker.service?.name}
    </p>

    <p>
      <strong>Rate:</strong>{" "}
      ₹{selectedWorker.hourlyRate} / hour
    </p>

    <br />

    <label>
      <strong>Date & Time</strong>
    </label>

    <br />

    <input
      type="datetime-local"
      value={bookingData.scheduledAt}
      onChange={(e) =>
        setBookingData({
          ...bookingData,
          scheduledAt: e.target.value
        })
      }
      style={{
        padding: "12px",
        marginTop: "8px",
        marginBottom: "15px",
        width: "100%"
      }}
    />

    <br />

    <label>
      <strong>Address</strong>
    </label>

    <br />

    <input
      type="text"
      placeholder="Enter your full address"
      value={bookingData.address}
      onChange={(e) =>
        setBookingData({
          ...bookingData,
          address: e.target.value
        })
      }
      style={{
        padding: "12px",
        marginTop: "8px",
        marginBottom: "15px",
        width: "100%"
      }}
    />

    <br />

    <label>
      <strong>City</strong>
    </label>

    <br />

    <input
      type="text"
      placeholder="Enter city"
      value={bookingData.city}
      onChange={(e) =>
        setBookingData({
          ...bookingData,
          city: e.target.value
        })
      }
      style={{
        padding: "12px",
        marginTop: "8px",
        marginBottom: "15px",
        width: "100%"
      }}
    />

    <br />

    <label>
      <strong>Problem Description</strong>
    </label>

    <br />

    <textarea
      placeholder="Describe your problem..."
      value={bookingData.problemDescription}
      onChange={(e) =>
        setBookingData({
          ...bookingData,
          problemDescription: e.target.value
        })
      }
      rows="4"
      style={{
        padding: "12px",
        marginTop: "8px",
        marginBottom: "15px",
        width: "100%"
      }}
    />

    <br />

    <button
      className="book-btn"
      onClick={() => {

        if (
          !bookingData.scheduledAt ||
          !bookingData.address
        ) {
          setBookingMessage(
            "Please select date/time and enter address."
          );
          return;
        }
const bookingRequest = {
  workerId: selectedWorker.id,
  serviceId: selectedWorker.service?.id,
  scheduledAt: bookingData.scheduledAt,
  address: bookingData.address,
  city: bookingData.city,
  problemDescription:
    bookingData.problemDescription
};

console.log(
  "Booking Request:",
  bookingRequest
);

const token = localStorage.getItem("fixit_token");

if (!token) {
  setBookingMessage("❌ Please login first.");
  return;
}

fetch("http://localhost:8080/api/bookings", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify(bookingRequest)
})
  .then(async (response) => {
    const text = await response.text();

    let data = {};

    if (text) {
      try {
        data = JSON.parse(text);
      } catch (error) {
        data = {
          message: text
        };
      }
    }

    console.log("Booking API Status:", response.status);
    console.log("Booking API Response:", data);

    if (!response.ok) {
      throw new Error(
        data.message || "Booking failed"
      );
    }

    return data;
  })
          .then((data) => {

            console.log(
              "Booking successful:",
              data
            );

            setBookingMessage(
              "✅ Booking successfully created!"
            );

            setSelectedWorker(null);

            setBookingData({
              scheduledAt: "",
              address: "",
              city: "",
              problemDescription: ""
            });
          })

          .catch((error) => {

            console.error(
              "Booking error:",
              error
            );

            setBookingMessage(
              "❌ Booking failed: " +
                error.message
            );
          });
      }}
    >
      Confirm Booking →
    </button>

    {bookingMessage && (
      <p
        style={{
          marginTop: "15px",
          fontWeight: "bold"
        }}
      >
        {bookingMessage}
      </p>
    )}

  </div>
)}

```





      </div>

      <section id="how" className="how-section">
        <div className="how-inner">
          <div className="section-header">
            <div>
              <div className="section-tag">Simple process</div>
              <div className="section-title">
                Booked in 4 Easy Steps
              </div>
            </div>
          </div>

          <div className="steps-row">
            {STEPS.map((s) => (
              <div className="step-card" key={s.n}>
                <div className="step-num-wrap">{s.n}</div>
                <div className="step-h">{s.h}</div>
                <div className="step-p">{s.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="workers" className="section">
        <div className="section-header">
          <div>
            <div className="section-tag">Top professionals</div>

            <div className="section-title">
              Highest Rated<br />
              Near Nagpur
            </div>
          </div>

          <a className="view-all" href="#workers">
            Browse all workers
          </a>
        </div>

        <div className="workers-grid">
          {TOP_WORKERS.map((w) => (
            <div className="wk-card" key={w.name}>
              <div className="wk-top">
                <div
                  className="wk-av"
                  style={{
                    background: w.bg,
                    color: w.color
                  }}
                >
                  {w.initials}
                </div>

                <div>
                  <div className="wk-nm">{w.name}</div>
                  <div className="wk-role">{w.role}</div>
                </div>
              </div>

              <div className="wk-stats">
                <div className="wk-stat">
                  <div
                    className="wk-stat-val"
                    style={{ color: "var(--orange)" }}
                  >
                    {w.rating}
                  </div>
                  <div className="wk-stat-lbl">Rating</div>
                </div>

                <div className="wk-stat">
                  <div className="wk-stat-val">
                    {w.jobs}
                  </div>
                  <div className="wk-stat-lbl">Jobs done</div>
                </div>

                <div className="wk-stat">
                  <div className="wk-stat-val">
                    {w.exp}
                  </div>
                  <div className="wk-stat-lbl">Experience</div>
                </div>
              </div>

              <div className="wk-tags">
                <span className="wk-tag verified">
                  ✓ Verified
                </span>

                {w.tags.map((tag) => (
                  <span className="wk-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <button className="book-btn">
                Book {w.name.split(" ")[0]} →
              </button>
            </div>
          ))}
        </div>
      </div>

      <section id="trust" className="trust-section">
        <div className="trust-inner">
          <div>
            <div className="section-tag">Why choose us</div>

            <div className="section-title">
              Built on Trust,<br />
              Powered by Quality
            </div>

            <div className="trust-points">
              {TRUST_POINTS.map((tp) => (
                <div className="trust-point" key={tp.h}>
                  <div className="tp-icon">{tp.icon}</div>

                  <div>
                    <div className="tp-h">{tp.h}</div>
                    <div className="tp-p">{tp.p}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="review-stack">
            {REVIEWS.map((r) => (
              <div className="review-card" key={r.name}>
                <div className="rev-top">
                  <div
                    className="rev-av"
                    style={{
                      background: r.bg,
                      color: r.color
                    }}
                  >
                    {r.initials}
                  </div>

                  <div>
                    <div className="rev-nm">{r.name}</div>
                    <div className="rev-loc">{r.loc}</div>
                  </div>
                </div>

                <div className="rev-stars">{r.stars}</div>
                <div className="rev-txt">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Fix Something?</h2>

        <p>
          Join 50,000+ homeowners who trust FixIt for every home repair need.
        </p>

        <div className="cta-btns">
          <button className="cta-btn-main">
            Book a Service Now →
          </button>

          <button className="cta-btn-sec">
            Register as a Worker
          </button>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              Fix<span>It</span>
            </div>

            <div className="footer-desc">
              India's most trusted platform for home services and skilled
              labour. Available in 18+ cities.
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <a href="#services">Plumbing</a>
            <a href="#services">Electrical</a>
            <a href="#services">Carpentry</a>
            <a href="#services">AC Repair</a>
            <a href="#services">Painting</a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <a href="#top">About us</a>
            <a href="#top">Careers</a>
            <a href="#top">Blog</a>
            <a href="#top">Press</a>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <a href="#top">Help Centre</a>
            <a href="#top">Contact us</a>
            <a href="#top">Privacy Policy</a>
            <a href="#top">Terms of Service</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 FixIt Technologies Pvt. Ltd. · Made with ❤️ in India
          </p>

          <div className="footer-badges">
            <span className="f-badge">🔒 SSL Secured</span>
            <span className="f-badge">✓ ISO Certified</span>
            <span className="f-badge">🇮🇳 Made in India</span>
          </div>
        </div>
      </footer>

    </div>
  );
}