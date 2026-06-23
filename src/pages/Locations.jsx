
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, BedDouble, ChevronRight } from 'lucide-react';

const DEMO_LOCATIONS = [
  {
    id: 1,
    name: 'Gachibowli Premium',
    address: 'Plot no 50, Road No. 2, P Janardhan Reddy Nagar, Gachibowli, Hyderabad',
    phone: '+91 9989195969',
    description:
      'Our flagship premium hotel in the heart of Gachibowli IT Hub. Perfect for corporate guests and leisure travellers who want the best of both worlds.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80',
    roomCount: 12,
    tag: 'Flagship',
  },
  {
    id: 2,
    name: 'Gachibowli Budget',
    address: 'Gachibowli, Hyderabad, Telangana',
    phone: '+91 9989195969',
    description:
      'Same WildWings quality and warm hospitality at a budget-friendly price point. Ideal for extended stays and solo travellers.',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&q=80',
    roomCount: 8,
    tag: 'Budget Friendly',
  },
  {
    id: 3,
    name: 'Madhapur',
    address: 'Madhapur, HITECH City, Hyderabad, Telangana',
    phone: '+91 9989195969',
    description:
      'Centrally located near HITECH City and Cyber Towers. A preferred choice for IT professionals and business travellers in the tech corridor.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80',
    roomCount: 10,
    tag: 'Business Hub',
  },
  {
    id: 4,
    name: 'Narsingi',
    address: 'Narsingi, Hyderabad, Telangana',
    phone: '+91 9989195969',
    description:
      'A peaceful retreat on the outskirts of the city surrounded by greenery. Perfect for families and guests seeking a calm, relaxed environment.',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80',
    roomCount: 7,
    tag: 'Peaceful Retreat',
  },
  {
    id: 5,
    name: 'ECIL',
    address: 'ECIL, Hyderabad, Telangana',
    phone: '+91 9989195969',
    description:
      'Conveniently located in the eastern corridor of Hyderabad. Great connectivity to ECIL, Secunderabad, and the old city.',
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=700&q=80',
    roomCount: 6,
    tag: 'East Hyderabad',
  },
  {
    id: 6,
    name: 'Kothapet',
    address: 'Kothapet, Hyderabad, Telangana',
    phone: '+91 9989195969',
    description:
      'Premium comfort in south Hyderabad. Easy access to LB Nagar, Dilsukhnagar, and the southern business districts.',
    imageUrl: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=700&q=80',
    roomCount: 8,
    tag: 'South Hyderabad',
  },
  {
    id: 7,
    name: 'Farm House',
    address: 'Outskirts of Hyderabad, Telangana',
    phone: '+91 9989195969',
    description:
      'An exclusive luxury farm stay experience surrounded by open fields, fresh air, and nature. Our most unique and spacious property — ideal for events, staycations, and group bookings.',
    imageUrl: 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?w=700&q=80',
    roomCount: 5,
    tag: 'Nature Escape',
  },
];

// tag → color mapping
const TAG_COLORS = {
  'Flagship':        { bg: '#1a3a2a', color: '#fff' },
  'Budget Friendly': { bg: '#c9933a', color: '#fff' },
  'Business Hub':    { bg: '#1e3a5f', color: '#fff' },
  'Peaceful Retreat':{ bg: '#2d5a3e', color: '#fff' },
  'East Hyderabad':  { bg: '#5a3a1a', color: '#fff' },
  'South Hyderabad': { bg: '#3a1a5a', color: '#fff' },
  'Nature Escape':   { bg: '#2d5a2d', color: '#fff' },
};

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null); // for detail expand

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        setLocations(data.length ? data : DEMO_LOCATIONS);
      })
      .catch(() => setLocations(DEMO_LOCATIONS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ paddingTop: 72 }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--forest)',
        padding: '64px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative circle */}
        <div style={{
          position: 'absolute', width: 400, height: 400,
          borderRadius: '50%', border: '1px solid rgba(201,147,58,0.15)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}/>
        <span style={{
          background: 'rgba(201,147,58,0.2)', border: '1px solid var(--gold)',
          color: 'var(--gold-light)', padding: '5px 16px', borderRadius: 20,
          fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', display: 'inline-block', marginBottom: 16,
        }}>Our Locations</span>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          color: '#fff', marginBottom: 12,
        }}>
          Find Us Across Hyderabad
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto' }}>
          7 properties spread across the city — from the IT corridor to serene farm escapes.
        </p>

        {/* stat strip */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 48,
          marginTop: 40, flexWrap: 'wrap',
        }}>
          {[['7', 'Locations'], ['50+', 'Rooms'], ['500+', 'Happy Guests']].map(([num, label]) => (
            <div key={label}>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2.4rem', fontWeight: 700, color: 'var(--gold-light)',
              }}>{num}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Location cards ────────────────────────────────────── */}
      <div className="section">
        <div className="container">

          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>
              Loading locations...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 28,
            }}>
              {locations.map(loc => (
                <LocationCard
                  key={loc.id}
                  loc={loc}
                  expanded={selected === loc.id}
                  onToggle={() => setSelected(selected === loc.id ? null : loc.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Map CTA ───────────────────────────────────────────── */}
      <section style={{
        background: 'var(--forest)', padding: '56px 24px', textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#fff', marginBottom: 12,
        }}>
          Not sure which location to pick?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 32, fontSize: '1rem' }}>
          Our team is happy to help you choose the best property for your needs.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact">
            <button className="btn-primary" style={{ padding: '13px 32px' }}>
              Contact Us
            </button>
          </Link>
          <Link to="/book">
            <button style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)',
              padding: '13px 32px', borderRadius: 8,
              fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
            }}>
              Book a Room
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// ── LocationCard component ────────────────────────────────────────────────────
function LocationCard({ loc, expanded, onToggle }) {
  const tagStyle = TAG_COLORS[loc.tag] || { bg: 'var(--forest)', color: '#fff' };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>

      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img
          src={loc.imageUrl}
          alt={loc.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.4s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* tag badge */}
        <span style={{
          position: 'absolute', top: 14, left: 14,
          background: tagStyle.bg, color: tagStyle.color,
          padding: '4px 12px', borderRadius: 20,
          fontSize: '0.75rem', fontWeight: 600,
        }}>
          {loc.tag}
        </span>
        {/* room count badge */}
        <span style={{
          position: 'absolute', top: 14, right: 14,
          background: 'rgba(0,0,0,0.55)', color: '#fff',
          padding: '4px 10px', borderRadius: 20,
          fontSize: '0.75rem', fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <BedDouble size={12}/> {loc.roomCount} rooms
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.4rem', color: 'var(--forest)', marginBottom: 10,
        }}>
          {loc.name}
        </h3>

        {/* Address */}
        <div style={{
          display: 'flex', gap: 8, alignItems: 'flex-start',
          marginBottom: 8,
        }}>
          <MapPin size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 3 }}/>
          <span style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
            {loc.address}
          </span>
        </div>

        {/* Phone */}
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14,
        }}>
          <Phone size={14} style={{ color: 'var(--gold)', flexShrink: 0 }}/>
          <a href={`tel:${loc.phone}`} style={{
            color: 'var(--muted)', fontSize: '0.85rem',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--forest)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >
            {loc.phone}
          </a>
        </div>

        {/* Description — expandable */}
        <p style={{
          color: 'var(--charcoal)', fontSize: '0.88rem', lineHeight: 1.7,
          flex: 1,
          overflow: 'hidden',
          maxHeight: expanded ? 200 : 48,
          transition: 'max-height 0.3s ease',
        }}>
          {loc.description}
        </p>

        {/* Toggle description */}
        <button onClick={onToggle} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--forest)', fontSize: '0.82rem', fontWeight: 600,
          padding: '4px 0', textAlign: 'left', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          {expanded ? 'Show less' : 'Read more'}
          <ChevronRight size={14} style={{
            transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }}/>
        </button>

        {/* Footer buttons */}
        <div style={{
          display: 'flex', gap: 10,
          borderTop: '1px solid var(--ivory-dark)', paddingTop: 16,
        }}>
          <Link to={`/rooms?location=${loc.id}`} style={{ flex: 1 }}>
            <button className="btn-primary" style={{
              width: '100%', padding: '10px',
              fontSize: '0.88rem',
            }}>
              View Rooms
            </button>
          </Link>
          
           <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
            target="_blank"
            rel="noreferrer"
            style={{ flex: 1 }}
          >
            <button className="btn-outline" style={{
              width: '100%', padding: '10px',
              fontSize: '0.88rem',
            }}>
              View Map
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}