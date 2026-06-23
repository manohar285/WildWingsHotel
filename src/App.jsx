



// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import "./index.css";

// // Layout Components
// import Navbar from "./Components/Navbar";
// import Footer from "./Components/Footer";

// // Page Components
// import Home from "./pages/Home";
// import Rooms from "./pages/Rooms";
// import RoomDetail from "./pages/RoomDetail";
// import { LoginPage, RegisterPage } from "./pages/Auth";
// import BookPage from "./pages/Book";
// import AdminDashboard from "./pages/Admin";
// import { ContactPage, MyBookings } from "./pages/OtherPages";

// function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <main style={{ minHeight: "75vh" }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/rooms" element={<Rooms />} />
//           <Route path="/rooms/:id" element={<RoomDetail />} />
//           <Route path="/book" element={<BookPage />} />
//           <Route path="/contact" element={<ContactPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
          
//           {/* Temporarily bypassed ProtectedRoute for testing your visual components */}
//           <Route path="/my-bookings" element={<MyBookings />} />
//           <Route path="/admin" element={<AdminDashboard />} />
          
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default function App() {
//   return <AppRoutes />;
// }









import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { AuthProvider, useAuth } from "./services/AuthContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import { LoginPage, RegisterPage } from "./pages/Auth";
import BookPage from "./pages/Book";
import AdminDashboard from "./pages/Admin";
import { ContactPage, MyBookings } from "./pages/OtherPages";
import Locations from "./pages/Locations";

function ProtectedRoute({ children, adminOnly }) {
  const { user } = useAuth();
   if (!user) return <Navigate to="/login" />;
   if (adminOnly && user.role !== "ADMIN") return <Navigate to="/" />;
  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ minHeight: "75vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/locations" element={<Locations />} />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>*
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="colored"
      />
    </BrowserRouter>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
