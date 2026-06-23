import React, { useEffect, useState } from 'react';
import { getAllRooms, getAvailableRooms } from '../services/api';
import RoomCard from '../Components/RoomCard';
import { Search, Filter } from 'lucide-react';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ checkIn:'', checkOut:'', guests:1, type:'' });
  const [searched, setSearched] = useState(false);


  useEffect(() => {
  const fetchRooms = async () => {
    try {
      const response = await getAllRooms();
      
      // Safety check: if response or response.data is undefined, fallback to demo
      if (response && response.data) {
        setRooms(response.data);
      } else if (Array.isArray(response)) {
        setRooms(response); // In case your API returns the raw array directly
      } else {
        setRooms(DEMO_ROOMS);
      }
    } catch (error) {
      console.error("Failed to fetch rooms from API, using demo data:", error);
      setRooms(DEMO_ROOMS);
    } finally {
      setLoading(false);
    }
  };

  fetchRooms();
}, []);




  // useEffect(() => {
  //   getAllRooms()
  //     .then(r => setRooms(r.data))
  //     console.log(DEMO_ROOMS)
  //     .catch(() => setRooms(DEMO_ROOMS))
  //     .finally(() => setLoading(false));
  // }, []);

  const handleSearch = async e => {
    e.preventDefault();
    if (filter.checkIn && filter.checkOut) {
      setLoading(true);
      try {
        const { data } = await getAvailableRooms(filter.checkIn, filter.checkOut, filter.guests);
        setRooms(data);
        setSearched(true);
      } catch {
        setRooms(DEMO_ROOMS);
      } finally { setLoading(false); }
    }
  };

  const filtered = filter.type ? rooms.filter(r => r.type === filter.type) : rooms;

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background:'var(--forest)', padding:'60px 24px', textAlign:'center' }}>
        <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2.2rem,5vw,3.5rem)', color:'#fff', marginBottom:12 }}>
          Our Rooms
        </h1>
        <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'1.05rem' }}>
          Find your perfect stay across all WildWings locations
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ background:'var(--white)', boxShadow:'var(--shadow)', padding:'24px', position:'sticky', top:72, zIndex:50 }}>
        <div className="container">
          <form onSubmit={handleSearch} style={{ display:'flex', gap:16, flexWrap:'wrap', alignItems:'flex-end' }}>
            {[
              { label:'Check-in', key:'checkIn', type:'date' },
              { label:'Check-out', key:'checkOut', type:'date' },
            ].map(({ label, key, type }) => (
              <div key={key} style={{ flex:1, minWidth:140 }}>
                <label style={{ display:'block', fontSize:'0.8rem', fontWeight:600, color:'var(--forest)', marginBottom:6 }}>{label}</label>
                <input type={type} style={{ width:'100%', padding:'10px 12px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:'0.9rem' }}
                  value={filter[key]} min={new Date().toISOString().split('T')[0]}
                  onChange={e => setFilter(f => ({...f, [key]: e.target.value}))}/>
              </div>
            ))}
            <div style={{ flex:1, minWidth:100 }}>
              <label style={{ display:'block', fontSize:'0.8rem', fontWeight:600, color:'var(--forest)', marginBottom:6 }}>Guests</label>
              <input type="number" min={1} max={6} style={{ width:'100%', padding:'10px 12px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:'0.9rem' }}
                value={filter.guests} onChange={e => setFilter(f => ({...f, guests: +e.target.value}))}/>
            </div>
            <div style={{ flex:1, minWidth:120 }}>
              <label style={{ display:'block', fontSize:'0.8rem', fontWeight:600, color:'var(--forest)', marginBottom:6 }}>Type</label>
              <select style={{ width:'100%', padding:'10px 12px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:'0.9rem' }}
                value={filter.type} onChange={e => setFilter(f => ({...f, type: e.target.value}))}>
                <option value="">All Types</option>
                {['SUITE','DELUXE','GLASS','STANDARD'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button type="submit" className="btn-primary" style={{ padding:'10px 24px', display:'flex', alignItems:'center', gap:8 }}>
              <Search size={16}/> Search
            </button>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="section">
        <div className="container">
          {searched && (
            <div style={{ marginBottom:24, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <p style={{ color:'var(--muted)' }}>{filtered.length} room{filtered.length !== 1 ? 's' : ''} found</p>
              <button onClick={() => { setSearched(false); getAllRooms().then(r => setRooms(r.data)).catch(() => setRooms(DEMO_ROOMS)); }}
                style={{ color:'var(--forest)', background:'none', border:'none', cursor:'pointer', fontWeight:600, fontSize:'0.9rem' }}>
                Clear Search
              </button>
            </div>
          )}
          {loading ? (
            <div style={{ textAlign:'center', padding:'60px', color:'var(--muted)' }}>Loading rooms...</div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:28 }}>
              {filtered.map(room => <RoomCard key={room.id} room={room}/>)}
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'60px', color:'var(--muted)' }}>
              No rooms available for the selected criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




const DEMO_ROOMS = [
  {
    id: 1,
    name: 'Suite Room',
    type: 'SUITE',
    pricePerNight: 3999,
    size: '12 x 12 m²',
    maxGuests: 2,
    floorNumber: 3,
    status: 'AVAILABLE',
    locationName: 'Gachibowli Premium',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    description: 'Our flagship suite with a king-size bed, panoramic city views, and top-tier amenities. Perfect for couples and business travellers seeking the very best.',
    amenities: [
      'Buffet Breakfast', 'Netflix & Amazon Prime', 'King-size Bed',
      '3-Seated Sofa', 'Eco-Friendly Toiletry Kit', 'Kettle & Hot Beverages',
      'Free High-Speed WiFi', 'Air Conditioning', 'Room Service 24/7', 'Art Paintings'
    ],
  },
  {
    id: 2,
    name: 'Glass Room',
    type: 'GLASS',
    pricePerNight: 3499,
    size: '14 x 12 m²',
    maxGuests: 2,
    floorNumber: 4,
    status: 'AVAILABLE',
    locationName: 'Gachibowli Premium',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
    description: 'A stunning floor-to-ceiling glass-walled room offering breathtaking city views. A unique, modern experience unlike any other in Hyderabad.',
    amenities: [
      'Buffet Breakfast', 'Netflix & Amazon Prime', 'Floor-to-Ceiling Glass Walls',
      'King-size Bed', 'Full Toiletry & Dental Kit', 'Kettle & Hot Beverages',
      'Free WiFi', 'Air Conditioning', 'Smart TV', 'Mini Fridge'
    ],
  },
  {
    id: 3,
    name: 'Deluxe Room',
    type: 'DELUXE',
    pricePerNight: 2999,
    size: '12 x 10 m²',
    maxGuests: 2,
    floorNumber: 2,
    status: 'AVAILABLE',
    locationName: 'Gachibowli Premium',
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
    description: 'Spacious and elegantly furnished, our Deluxe Room offers premium comfort with all the essentials for a perfect stay — whether for business or leisure.',
    amenities: [
      'Buffet Breakfast', 'Smart TV', 'OTT Channels', 'Eco-Friendly Toiletries',
      'Kettle with Coffee & Tea', 'Queen-size Bed', 'Free WiFi', 'Air Conditioning',
      'Work Desk', 'Daily Housekeeping'
    ],
  },
  {
    id: 4,
    name: 'Standard Room',
    type: 'STANDARD',
    pricePerNight: 1800,
    size: '10 x 10 m²',
    maxGuests: 2,
    floorNumber: 1,
    status: 'AVAILABLE',
    locationName: 'Gachibowli Budget',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80',
    description: 'A clean, comfortable room with all the essentials you need. Great value without compromising on quality — ideal for short stays and budget-conscious travellers.',
    amenities: [
      'Free WiFi', 'Air Conditioning', '32" TV', 'Hot Water',
      'Daily Housekeeping', 'Double Bed'
    ],
  },
  {
    id: 5,
    name: 'Suite Room',
    type: 'SUITE',
    pricePerNight: 3999,
    size: '12 x 12 m²',
    maxGuests: 2,
    floorNumber: 3,
    status: 'AVAILABLE',
    locationName: 'Madhapur',
    imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&q=80',
    description: 'Premium suite at our Madhapur property — right in the heart of HITECH City. Ideal for corporate guests with seamless access to the IT corridor.',
    amenities: [
      'Buffet Breakfast', 'Netflix & Amazon Prime', 'King-size Bed',
      'Corporate Work Desk', 'Free High-Speed WiFi', 'Air Conditioning',
      'Eco-Friendly Toiletry Kit', 'Kettle & Hot Beverages', 'Room Service'
    ],
  },
  {
    id: 6,
    name: 'Deluxe Room',
    type: 'DELUXE',
    pricePerNight: 2500,
    size: '12 x 10 m²',
    maxGuests: 2,
    floorNumber: 2,
    status: 'AVAILABLE',
    locationName: 'Narsingi',
    imageUrl: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80',
    description: 'A serene deluxe room at our peaceful Narsingi retreat. Surrounded by greenery and calm — perfect for a relaxing getaway from the busy city.',
    amenities: [
      'Buffet Breakfast', 'Garden View', 'Queen-size Bed', 'Smart TV',
      'Free WiFi', 'Air Conditioning', 'Toiletry Kit', 'Balcony Access'
    ],
  },
  {
    id: 7,
    name: 'Farm House Suite',
    type: 'SUITE',
    pricePerNight: 4500,
    size: '16 x 14 m²',
    maxGuests: 4,
    floorNumber: 1,
    status: 'AVAILABLE',
    locationName: 'Farm House',
    imageUrl: 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?w=600&q=80',
    description: 'A luxurious countryside escape with lush green surroundings, open-air seating, and nature at your doorstep. Our most exclusive and spacious offering.',
    amenities: [
      'Buffet Breakfast', 'Private Garden', 'King-size Bed', 'Open-Air Seating',
      'Barbeque Area', 'Netflix', 'Free WiFi', 'Air Conditioning',
      'Bonfire on Request', 'Nature Walks'
    ],
  },
  {
    id: 8,
    name: 'Standard Room',
    type: 'STANDARD',
    pricePerNight: 1800,
    size: '10 x 10 m²',
    maxGuests: 2,
    floorNumber: 1,
    status: 'AVAILABLE',
    locationName: 'ECIL',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
    description: 'Comfortable and affordable stay in the ECIL corridor — convenient for travellers visiting the eastern parts of Hyderabad.',
    amenities: [
      'Free WiFi', 'Air Conditioning', 'TV', 'Hot Water',
      'Double Bed', 'Daily Housekeeping'
    ],
  },
];





// const DEMO_ROOMS = [
//   {
//     id: 1,
//     name: "Suite Room",
//     type: "SUITE",
//     pricePerNight: 3200,
//     size: "12 x 12 m²",
//     maxGuests: 2,
//     status: "AVAILABLE",
//     amenities: ["Breakfast", "Netflix", "King Bed", "Sofa"],
//   },
//   {
//     id: 2,
//     name: "Deluxe Room",
//     type: "DELUXE",
//     pricePerNight: 2500,
//     size: "12 x 10 m²",
//     maxGuests: 2,
//     status: "AVAILABLE",
//     amenities: ["Breakfast", "WiFi", "AC"],
//   },
//   {
//     id: 3,
//     name: "Glass Room",
//     type: "GLASS",
//     pricePerNight: 3499,
//     size: "14 x 12 m²",
//     maxGuests: 2,
//     status: "AVAILABLE",
//     amenities: ["Breakfast", "Spa", "Pool View"],
//   },
//   {
//     id: 4,
//     name: "Standard Room",
//     type: "STANDARD",
//     pricePerNight: 1800,
//     size: "10 x 10 m²",
//     maxGuests: 2,
//     status: "AVAILABLE",
//     amenities: ["WiFi", "AC", "TV"],
//   },
// ];
