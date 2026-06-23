import React, { useState } from "react";
import { createBooking } from "../services/api";
import { toast } from "react-toastify";
import { Calendar, Users, User, Phone, Mail, CheckCircle } from "lucide-react";

export default function BookingForm({ room, onSuccess }) {
  const [form, setForm] = useState({
    checkInDate: "",
    checkOutDate: "",
    numGuests: 1,
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const nights =
    form.checkInDate && form.checkOutDate
      ? Math.max(
          0,
          (new Date(form.checkOutDate) - new Date(form.checkInDate)) / 86400000,
        )
      : 0;
  const total = nights * (room?.pricePerNight || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nights) return toast.error("Please select valid dates");
    setLoading(true);
    try {
      const { data } = await createBooking({ ...form, roomId: room.id });
      setConfirmed(data);
      toast.success("Booking confirmed!");
      if (onSuccess) onSuccess(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <CheckCircle
          size={56}
          style={{ color: "var(--forest)", marginBottom: 16 }}
        />
        <h2
          style={{
            fontSize: "1.8rem",
            color: "var(--forest)",
            marginBottom: 8,
          }}
        >
          Booking Confirmed!
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          Your booking reference number:
        </p>
        <div
          style={{
            background: "var(--forest)",
            color: "#fff",
            padding: "16px 32px",
            borderRadius: 12,
            fontSize: "1.4rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            display: "inline-block",
            marginBottom: 24,
          }}
        >
          {confirmed.bookingReference}
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          A confirmation has been sent to {form.guestEmail}. Please save your
          reference number.
        </p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    fontSize: "0.93rem",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "Inter, sans-serif",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.83rem",
    fontWeight: 600,
    color: "var(--forest)",
    marginBottom: 6,
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <label style={labelStyle}>Check-in Date</label>
          <input
            type="date"
            style={inputStyle}
            value={form.checkInDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) =>
              setForm((f) => ({ ...f, checkInDate: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Check-out Date</label>
          <input
            type="date"
            style={inputStyle}
            value={form.checkOutDate}
            min={form.checkInDate || new Date().toISOString().split("T")[0]}
            onChange={(e) =>
              setForm((f) => ({ ...f, checkOutDate: e.target.value }))
            }
            required
          />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Number of Guests</label>
        <input
          type="number"
          min={1}
          max={room?.maxGuests || 4}
          style={inputStyle}
          value={form.numGuests}
          onChange={(e) =>
            setForm((f) => ({ ...f, numGuests: +e.target.value }))
          }
          required
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            placeholder="Your full name"
            style={inputStyle}
            value={form.guestName}
            onChange={(e) =>
              setForm((f) => ({ ...f, guestName: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Phone Number</label>
          <input
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            style={inputStyle}
            value={form.guestPhone}
            onChange={(e) =>
              setForm((f) => ({ ...f, guestPhone: e.target.value }))
            }
            required
          />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Email Address</label>
        <input
          type="email"
          placeholder="you@email.com"
          style={inputStyle}
          value={form.guestEmail}
          onChange={(e) =>
            setForm((f) => ({ ...f, guestEmail: e.target.value }))
          }
          required
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Special Requests (optional)</label>
        <textarea
          rows={3}
          placeholder="Any special requirements..."
          style={{ ...inputStyle, resize: "vertical" }}
          value={form.specialRequests}
          onChange={(e) =>
            setForm((f) => ({ ...f, specialRequests: e.target.value }))
          }
        />
      </div>

      {/* Price Summary */}
      {nights > 0 && (
        <div
          style={{
            background: "var(--ivory)",
            borderRadius: 10,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              ₹{room?.pricePerNight?.toLocaleString()} × {nights} night
              {nights > 1 ? "s" : ""}
            </span>
            <span style={{ fontWeight: 600 }}>₹{total.toLocaleString()}</span>
          </div>
          <div
            style={{
              borderTop: "1px solid var(--ivory-dark)",
              paddingTop: 8,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: 700, color: "var(--forest)" }}>
              Total
            </span>
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--forest)",
              }}
            >
              ₹{total.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
        style={{ width: "100%", padding: 14, fontSize: "1rem" }}
      >
        {loading ? "Confirming Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
}
