import React, { useEffect, useState } from "react";
import { getAllRooms } from "../services/api";
import BookingForm from "../Components/BookingForm";

export default function BookPage() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    getAllRooms()
      .then((r) => {
        setRooms(r.data);
        setSelectedRoom(r.data[0]);
      })
      .catch(() => {
        const demo = [
          {
            id: 1,
            name: "Suite Room",
            pricePerNight: 3200,
            maxGuests: 2,
            type: "SUITE",
          },
          {
            id: 2,
            name: "Deluxe Room",
            pricePerNight: 2500,
            maxGuests: 2,
            type: "DELUXE",
          },
          {
            id: 3,
            name: "Glass Room",
            pricePerNight: 3499,
            maxGuests: 2,
            type: "GLASS",
          },
        ];
        setRooms(demo);
        setSelectedRoom(demo[0]);
      });
  }, []);

  return (
    <div style={{ paddingTop: 72 }}>
      <div
        style={{
          background: "var(--forest)",
          padding: "48px 24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2rem,5vw,3rem)",
            color: "#fff",
            marginBottom: 8,
          }}
        >
          Book Your Stay
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)" }}>
          Select a room and fill in your details to confirm instantly
        </p>
      </div>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Room selector */}
          <div>
            <h3 style={{ color: "var(--forest)", marginBottom: 16 }}>
              Select Room
            </h3>
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                style={{
                  padding: "16px",
                  marginBottom: 12,
                  borderRadius: 12,
                  cursor: "pointer",
                  border: `2px solid ${selectedRoom?.id === room.id ? "var(--forest)" : "var(--ivory-dark)"}`,
                  background:
                    selectedRoom?.id === room.id
                      ? "var(--forest)"
                      : "var(--white)",
                  color:
                    selectedRoom?.id === room.id ? "#fff" : "var(--charcoal)",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  {room.name}
                </div>
                <div style={{ fontSize: "0.88rem", opacity: 0.7 }}>
                  ₹{room.pricePerNight?.toLocaleString()} / night
                </div>
              </div>
            ))}
          </div>

          {/* Booking form */}
          <div
            style={{
              background: "var(--white)",
              borderRadius: 20,
              padding: 36,
              boxShadow: "var(--shadow)",
            }}
          >
            {selectedRoom ? (
              <>
                <h2 style={{ color: "var(--forest)", marginBottom: 4 }}>
                  Book: {selectedRoom.name}
                </h2>
                <p
                  style={{
                    color: "var(--muted)",
                    marginBottom: 28,
                    fontSize: "0.9rem",
                  }}
                >
                  ₹{selectedRoom.pricePerNight?.toLocaleString()} per night
                </p>
                <BookingForm room={selectedRoom} />
              </>
            ) : (
              <p
                style={{
                  color: "var(--muted)",
                  textAlign: "center",
                  padding: 40,
                }}
              >
                Please select a room
              </p>
            )}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .container > div { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
