import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Maximize, Star } from 'lucide-react';

export default function RoomCard({ room }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
        <img
          src={room.imageUrl || `https://source.unsplash.com/600x400/?hotel,room,luxury&sig=${room.id}`}
          alt={room.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', top: 16, right: 16,
          background: 'var(--gold)', color: '#fff',
          padding: '4px 12px', borderRadius: 20,
          fontSize: '0.78rem', fontWeight: 600
        }}>
          {room.status || 'AVAILABLE'}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--forest)' }}>{room.name}</h3>
          <div style={{ display: 'flex', gap: 2 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} fill="var(--gold)" color="var(--gold)"/>
            ))}
          </div>
        </div>

        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 16, flex: 1 }}>
          {room.description || 'Experience comfort and luxury in this beautifully appointed room with world-class amenities.'}
        </p>

        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)', fontSize: '0.85rem' }}>
            <Maximize size={14}/> {room.size || '12 x 12 m²'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)', fontSize: '0.85rem' }}>
            <Users size={14}/> {room.maxGuests || 2} Guests
          </div>
        </div>

        {room.amenities?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {room.amenities.slice(0, 3).map(a => (
              <span key={a} style={{
                background: 'var(--ivory-dark)', color: 'var(--forest-mid)',
                padding: '3px 10px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 500
              }}>{a}</span>
            ))}
            {room.amenities.length > 3 && (
              <span style={{ color: 'var(--muted)', fontSize: '0.75rem', alignSelf: 'center' }}>+{room.amenities.length - 3} more</span>
            )}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--ivory-dark)', paddingTop: 16 }}>
          <div>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--forest)', fontFamily: 'Cormorant Garamond, serif' }}>
              ₹{room.pricePerNight?.toLocaleString()}
            </span>
            <span style={{ color: 'var(--muted)', fontSize: '0.83rem' }}> / night</span>
          </div>
          <Link to={`/rooms/${room.id}`}>
            <button className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.88rem' }}>
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}