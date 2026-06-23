import React, { useEffect, useState } from "react";
import { getDashboard, getAllBookings } from "../services/api";
import {
  BarChart2,
  Calendar,
  BedDouble,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    totalRooms: 0,
  });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getDashboard()
      .then((r) => setStats(r.data))
      .catch(() => {});
    getAllBookings()
      .then((r) => setBookings(r.data))
      .catch(() => {});
  }, []);

  const statCards = [
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "var(--forest)",
    },
    {
      label: "Confirmed",
      value: stats.confirmedBookings,
      icon: CheckCircle,
      color: "#059669",
    },
    {
      label: "Total Rooms",
      value: stats.totalRooms,
      icon: BedDouble,
      color: "var(--gold)",
    },
    {
      label: "Occupancy Rate",
      value: `${stats.totalRooms ? Math.round((stats.confirmedBookings / stats.totalRooms) * 100) : 0}%`,
      icon: BarChart2,
      color: "#7c3aed",
    },
  ];

  const statusColor = {
    CONFIRMED: "#059669",
    PENDING: "#d97706",
    CANCELLED: "#dc2626",
    CHECKED_IN: "#2563eb",
    CHECKED_OUT: "#6b7280",
  };

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "var(--forest)", padding: "48px 24px" }}>
        <div className="container">
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "2.2rem",
              color: "#fff",
            }}
          >
            Admin Dashboard
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
            WildWings Hotel Management
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        {/* Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              style={{
                background: "var(--white)",
                borderRadius: 16,
                padding: 24,
                boxShadow: "var(--shadow)",
                borderLeft: `4px solid ${color}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 8,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "var(--charcoal)",
                      fontFamily: "Cormorant Garamond, serif",
                    }}
                  >
                    {value}
                  </p>
                </div>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bookings Table */}
        <div
          style={{
            background: "var(--white)",
            borderRadius: 16,
            boxShadow: "var(--shadow)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid var(--ivory-dark)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ color: "var(--forest)", fontSize: "1.2rem" }}>
              All Bookings
            </h2>
            <span
              style={{
                background: "var(--ivory-dark)",
                color: "var(--muted)",
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: "0.8rem",
              }}
            >
              {bookings.length} total
            </span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--ivory)", textAlign: "left" }}>
                  {[
                    "Reference",
                    "Guest",
                    "Room",
                    "Check-in",
                    "Check-out",
                    "Amount",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        padding: "40px",
                        textAlign: "center",
                        color: "var(--muted)",
                      }}
                    >
                      No bookings yet
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr
                      key={b.id}
                      style={{ borderBottom: "1px solid var(--ivory-dark)" }}
                    >
                      <td
                        style={{
                          padding: "14px 16px",
                          fontWeight: 600,
                          color: "var(--forest)",
                          fontSize: "0.88rem",
                        }}
                      >
                        {b.bookingReference}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "0.88rem" }}>
                        <div>{b.guestName}</div>
                        <div
                          style={{ color: "var(--muted)", fontSize: "0.8rem" }}
                        >
                          {b.guestEmail}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "0.88rem" }}>
                        {b.room?.name}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "0.88rem",
                          color: "var(--muted)",
                        }}
                      >
                        {b.checkInDate}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "0.88rem",
                          color: "var(--muted)",
                        }}
                      >
                        {b.checkOutDate}
                      </td>
                      <td style={{ padding: "14px 16px", fontWeight: 600 }}>
                        ₹{b.totalAmount?.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            background: `${statusColor[b.status]}18`,
                            color: statusColor[b.status],
                            padding: "4px 10px",
                            borderRadius: 20,
                            fontSize: "0.78rem",
                            fontWeight: 600,
                          }}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
