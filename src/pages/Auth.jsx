import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { toast } from "react-toastify";

function AuthPage({ mode }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
        toast.success("Welcome back!");
      } else {
        await register(form.name, form.email, form.password, form.phone);
        toast.success("Account created!");
      }
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    fontSize: "0.95rem",
    outline: "none",
    marginTop: 6,
    fontFamily: "Inter, sans-serif",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--ivory)",
        paddingTop: 72,
      }}
    >
      <div style={{ width: "100%", maxWidth: 440, margin: "0 24px" }}>
        <div
          style={{
            background: "var(--white)",
            borderRadius: 20,
            padding: "40px 36px",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: "var(--forest)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.5rem",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              W
            </div>
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.9rem",
                color: "var(--forest)",
              }}
            >
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.9rem",
                marginTop: 4,
              }}
            >
              {mode === "login"
                ? "Sign in to manage your bookings"
                : "Join WildWings for exclusive benefits"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: "0.83rem",
                    fontWeight: 600,
                    color: "var(--forest)",
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  fontSize: "0.83rem",
                  fontWeight: 600,
                  color: "var(--forest)",
                }}
              >
                Email
              </label>
              <input
                type="email"
                style={inputStyle}
                placeholder="you@email.com"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: mode === "register" ? 16 : 24 }}>
              <label
                style={{
                  fontSize: "0.83rem",
                  fontWeight: 600,
                  color: "var(--forest)",
                }}
              >
                Password
              </label>
              <input
                type="password"
                style={inputStyle}
                placeholder="••••••••"
                required
                minLength={6}
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
              />
            </div>
            {mode === "register" && (
              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    fontSize: "0.83rem",
                    fontWeight: 600,
                    color: "var(--forest)",
                  }}
                >
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  style={inputStyle}
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                />
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: "100%", padding: 14, fontSize: "1rem" }}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "var(--muted)",
              fontSize: "0.9rem",
            }}
          >
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <Link
              to={mode === "login" ? "/register" : "/login"}
              style={{ color: "var(--forest)", fontWeight: 600 }}
            >
              {mode === "login" ? "Register" : "Sign In"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  return <AuthPage mode="login" />;
}
export function RegisterPage() {
  return <AuthPage mode="register" />;
}
