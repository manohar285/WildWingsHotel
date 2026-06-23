import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomById } from "../services/api";
import BookingForm from "../Components/BookingForm";
import { Users, Maximize, Star, ChevronLeft, Check } from "lucide-react";

const DEMO = {
  id: 1,
  name: "Suite Room",
  type: "SUITE",
  pricePerNight: 3200,
  size: "12 x 12 m²",
  maxGuests: 2,
  status: "AVAILABLE",
  description:
    "Our flagship suite offers a spacious, elegantly appointed room with panoramic city views and premium furnishings. Perfect for couples or business travelers seeking the best.",
  amenities: [
    "Buffet Breakfast",
    "Netflix & Amazon Prime",
    "King-size Bed",
    "3-Seated Sofa",
    "Eco-Friendly Toiletries",
    "Kettle & Tea/Coffee",
    '32" Smart TV',
    "Blackout Curtains",
    "Room Service 24/7",
    "Free WiFi",
  ],
};

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    getRoomById(id)
      .then((r) => setRoom(r.data))
      .catch(() => setRoom({ ...DEMO, id: parseInt(id) }))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div
        style={{ paddingTop: 120, textAlign: "center", color: "var(--muted)" }}
      >
        Loading...
      </div>
    );
  if (!room)
    return (
      <div style={{ paddingTop: 120, textAlign: "center" }}>
        Room not found.
      </div>
    );

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Breadcrumb */}
      <div
        style={{
          background: "var(--white)",
          borderBottom: "1px solid var(--ivory-dark)",
          padding: "16px 24px",
        }}
      >
        <div className="container">
          <button
            onClick={() => navigate("/rooms")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "var(--muted)",
              fontSize: "0.9rem",
            }}
          >
            <ChevronLeft size={16} /> Back to Rooms
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Left – Details */}
          <div>
            <img
              src={
                room.imageUrl ||
                `https://source.unsplash.com/900x500/?hotel,suite,luxury&sig=${room.id}`
              }
              alt={room.name}
              style={{
                width: "100%",
                height: 420,
                objectFit: "cover",
                borderRadius: 20,
                marginBottom: 32,
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "2.5rem",
                  color: "var(--forest)",
                }}
              >
                {room.name}
              </h1>
              <div style={{ display: "flex", gap: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="var(--gold)"
                    color="var(--gold)"
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 24,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--muted)",
                  fontSize: "0.9rem",
                }}
              >
                <Maximize size={16} /> {room.size}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--muted)",
                  fontSize: "0.9rem",
                }}
              >
                <Users size={16} /> Up to {room.maxGuests} guests
              </span>
              <span
                style={{
                  background: "#dcfce7",
                  color: "#166534",
                  padding: "3px 12px",
                  borderRadius: 20,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {room.status}
              </span>
            </div>

            <p
              style={{
                color: "var(--charcoal)",
                lineHeight: 1.8,
                marginBottom: 32,
                fontSize: "1.02rem",
              }}
            >
              {room.description}
            </p>

            {room.amenities?.length > 0 && (
              <div>
                <h3
                  style={{
                    color: "var(--forest)",
                    marginBottom: 16,
                    fontSize: "1.3rem",
                  }}
                >
                  Room Amenities
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: 12,
                  }}
                >
                  {room.amenities.map((a) => (
                    <div
                      key={a}
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "var(--forest)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check size={11} color="#fff" strokeWidth={3} />
                      </div>
                      <span
                        style={{ fontSize: "0.9rem", color: "var(--charcoal)" }}
                      >
                        {a}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right – Booking */}
          <div style={{ position: "sticky", top: 100 }}>
            <div
              style={{
                background: "var(--white)",
                borderRadius: 20,
                padding: 32,
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--ivory-dark)",
              }}
            >
              <div style={{ marginBottom: 24 }}>
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    color: "var(--forest)",
                  }}
                >
                  ₹{room.pricePerNight?.toLocaleString()}
                </span>
                <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                  {" "}
                  per night
                </span>
              </div>
              <BookingForm room={room} />
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .container > div { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
