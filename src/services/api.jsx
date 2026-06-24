import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:8080/api' });

const API = axios.create({ baseURL: 'https://wildwingshotelbackend.onrender.com' });

// Attach JWT token if present
API.interceptors.request.use(config => {
  const token = localStorage.getItem('ww_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const register = data => API.post('/auth/register', data);
export const login    = data => API.post('/auth/login', data);

// ─── Rooms ────────────────────────────────────────────────────────────────────
export const getAllRooms = ()=> API.get('/api/rooms');
export const getRoomById = id=> API.get(`/rooms/${id}`);
export const getAvailableRooms = (checkIn, checkOut, guests) =>
  API.get('/rooms/available', { params: { checkIn, checkOut, guests } });

// ─── Bookings ─────────────────────────────────────────────────────────────────
export const createBooking   = data => API.post('/bookings', data);
export const getBookingByRef = ref  => API.get(`/bookings/ref/${ref}`);
export const cancelBooking   = id   => API.put(`/bookings/${id}/cancel`);
export const getUserBookings = uid  => API.get(`/bookings/user/${uid}`);

// ─── Admin ────────────────────────────────────────────────────────────────────
export const getDashboard    = ()   => API.get('/admin/dashboard');
export const getAllBookings   = ()   => API.get('/admin/bookings');

export default API;