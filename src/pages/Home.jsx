import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRooms } from "../services/api";
import RoomCard from "../Components/RoomCard";
import {
  ChevronDown,
  Star,
  Shield,
  Wifi,
  Coffee,
  Car,
  Utensils,
} from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80";
const ABOUT_IMG =
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80";

const AMENITIES = [
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Coffee, label: "Buffet Breakfast" },
  { icon: Car, label: "Free Parking" },
  { icon: Utensils, label: "Restaurant" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Star, label: "OTT Streaming" },
];

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    rating: 5,
    text: "Absolutely stunning stay! The suite room exceeded all my expectations. Premium service and beautiful interiors.",
  },
  {
    name: "Priya Sharma",
    rating: 5,
    text: "The perfect getaway in Hyderabad. Loved the complimentary breakfast and the incredibly warm staff.",
  },
  {
    name: "Ravi Kumar",
    rating: 5,
    text: "Stayed at the Gachibowli location for a business trip. World-class amenities at a budget-friendly price.",
  },
];

export default function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getAllRooms()
      .then((r) => setRooms(r.data.slice(0, 3)))
      .catch(() => {
        // Fallback demo rooms
        setRooms([
          {
            id: 1,
            name: "Suite Room",
            type: "SUITE",
            pricePerNight: 3200,
            size: "12 x 12 m²",
            maxGuests: 2,
            status: "AVAILABLE",
            amenities: ["Breakfast", "Netflix", "King Bed"],
            description: "Our flagship suite offering panoramic city views.",
          },
          {
            id: 2,
            name: "Deluxe Room",
            type: "DELUXE",
            pricePerNight: 2500,
            size: "12 x 10 m²",
            maxGuests: 2,
            status: "AVAILABLE",
            amenities: ["Breakfast", "WiFi", "AC"],
            description: "Spacious deluxe room with premium furnishings.",
          },
          {
            id: 3,
            name: "Glass Room",
            type: "GLASS",
            pricePerNight: 3499,
            size: "14 x 12 m²",
            maxGuests: 2,
            status: "AVAILABLE",
            amenities: ["Breakfast", "Spa", "Pool View"],
            description: "Unique glass-walled room with stunning views.",
          },
        ]);
      });
  }, []);

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,28,18,0.58)",
          }}
        />
        <div
          style={{
            position: "relative",
            textAlign: "center",
            color: "#fff",
            maxWidth: 720,
            padding: "0 24px",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <span
              style={{
                background: "rgba(201,147,58,0.25)",
                border: "1px solid var(--gold)",
                color: "var(--gold-light)",
                padding: "5px 16px",
                borderRadius: 20,
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Welcome to WildWings
            </span>
          </div>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Discover the Art of
            <br />
            <em style={{ color: "var(--gold-light)" }}>Relaxation</em>
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.8)",
              marginBottom: 40,
              lineHeight: 1.8,
            }}
          >
            Experience warmth, luxury, and comfort at Hyderabad's most
            celebrated boutique hotels.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/book">
              <button
                className="btn-primary"
                style={{ padding: "14px 36px", fontSize: "1.05rem" }}
              >
                Book Your Stay
              </button>
            </Link>
            <Link to="/rooms">
              <button
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  padding: "14px 36px",
                  borderRadius: 8,
                  fontSize: "1.05rem",
                  cursor: "pointer",
                  backdropFilter: "blur(4px)",
                }}
              >
                Explore Rooms
              </button>
            </Link>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            animation: "bounce 2s infinite",
          }}
        >
          <ChevronDown size={28} color="rgba(255,255,255,0.6)" />
        </div>
      </section>

      {/* ─── AMENITIES STRIP ─────────────────────────────────── */}
      <section style={{ background: "var(--forest)", padding: "32px 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            {AMENITIES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "#d1d5db",
                }}
              >
                <Icon size={20} style={{ color: "var(--gold)" }} />
                <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 60,
              alignItems: "center",
            }}
          >
            <div>
              <span
                className="badge"
                style={{ marginBottom: 16, display: "inline-block" }}
              >
                About WildWings
              </span>
              <h2 className="section-title">
                Your Home Away from Home in Hyderabad
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                WildWings Hotels offers a luxurious blend of comfort and nature
                across 6 strategic locations in Hyderabad. From Gachibowli's
                corporate hub to the serene Farm House experience, every
                property is designed to deliver exceptional hospitality.
              </p>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}
              >
                Our rooms are meticulously appointed with premium amenities —
                complimentary buffet breakfast, OTT streaming, eco-friendly
                toiletries, and round-the-clock service — because every detail
                of your stay matters to us.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                }}
              >
                {[
                  ["6+", "Locations"],
                  ["500+", "Happy Guests"],
                  ["50+", "Rooms"],
                  ["5★", "Average Rating"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "2.2rem",
                        fontWeight: 700,
                        color: "var(--forest)",
                      }}
                    >
                      {num}
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: "0.88rem" }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <img
                src={ABOUT_IMG}
                alt="Hotel Interior"
                style={{ width: "100%", height: 440, objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── ROOMS ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              className="badge"
              style={{ marginBottom: 16, display: "inline-block" }}
            >
              Our Rooms
            </span>
            <h2 className="section-title">Best Offer on Our Rooms</h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              Handpicked stays for every occasion
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 28,
              marginBottom: 48,
            }}
          >
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))} 
          </div>
          <div style={{ textAlign: "center" }}>
            <Link to="/rooms">
              <button className="btn-outline" style={{ padding: "12px 36px" }}>
                View All Rooms
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ──────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--forest)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                background: "var(--gold)",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Packages
            </span>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#fff",
                marginTop: 16,
                marginBottom: 8,
              }}
            >
              Exclusive Room Packages
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 0 }}>
              Everything you need for a perfect stay
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28,
            }}
          >
            {[
              { name: "Suite Room", price: "₹3,999", highlight: true },
              { name: "Glass Room", price: "₹3,499", highlight: false },
              { name: "Deluxe Room", price: "₹2,999", highlight: false },
            ].map((pkg) => (
              <div
                key={pkg.name}
                style={{
                  background: pkg.highlight
                    ? "var(--gold)"
                    : "rgba(255,255,255,0.06)",
                  border: `1px solid ${pkg.highlight ? "var(--gold)" : "rgba(255,255,255,0.12)"}`,
                  borderRadius: 20,
                  padding: "32px 28px",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    fontFamily: "Cormorant Garamond, serif",
                    color: "#fff",
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {pkg.price}
                </div>
                <div
                  style={{
                    color: pkg.highlight
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.6)",
                    fontSize: "0.85rem",
                    marginBottom: 24,
                  }}
                >
                  /Night
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "1.3rem",
                    marginBottom: 20,
                  }}
                >
                  {pkg.name}
                </h3>
                <ul style={{ listStyle: "none", marginBottom: 32 }}>
                  {[
                    "Complementary Lavish Buffet Breakfast",
                    "Eco-friendly Dental & Toiletry Kit",
                    "Kettle with Coffee, Tea & Green Tea",
                    '32" TV with Netflix & Amazon Prime',
                    "Comfort 3-Seated Sofa",
                    "Art Paintings on Walls",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.85rem",
                        marginBottom: 10,
                        paddingLeft: 20,
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: pkg.highlight
                            ? "rgba(255,255,255,0.9)"
                            : "var(--gold)",
                        }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/book">
                  <button
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: pkg.highlight
                        ? "rgba(255,255,255,0.2)"
                        : "var(--gold)",
                      color: "#fff",
                      border: `1.5px solid ${pkg.highlight ? "rgba(255,255,255,0.4)" : "var(--gold)"}`,
                      borderRadius: 8,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.95rem",
                    }}
                  >
                    Book Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              className="badge"
              style={{ marginBottom: 16, display: "inline-block" }}
            >
              Reviews
            </span>
            <h2 className="section-title">Hear From Our Happy Customers</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{
                  background: "var(--ivory)",
                  borderRadius: 16,
                  padding: 28,
                }}
              >
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      fill="var(--gold)"
                      color="var(--gold)"
                    />
                  ))}
                </div>
                <p
                  style={{
                    color: "var(--charcoal)",
                    lineHeight: 1.7,
                    marginBottom: 20,
                    fontStyle: "italic",
                  }}
                >
                  "{t.text}"
                </p>
                <div style={{ fontWeight: 600, color: "var(--forest)" }}>
                  {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--gold)",
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2rem,4vw,3rem)",
            color: "#fff",
            marginBottom: 16,
          }}
        >
          Your Ultimate Stay Starts Here
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.85)",
            marginBottom: 32,
            fontSize: "1.05rem",
          }}
        >
          Lock in your stay and elevate your getaway today!
        </p>
        <Link to="/book">
          <button
            style={{
              background: "var(--forest)",
              color: "#fff",
              border: "none",
              padding: "14px 40px",
              borderRadius: 8,
              fontSize: "1.05rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Book Now
          </button>
        </Link>
      </section>

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
      `}</style>
    </div>
  );
}
