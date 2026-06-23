import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useAuth } from '../services/AuthContext';
import { getUserBookings, cancelBooking } from '../services/api';
import { toast } from 'react-toastify';

// ─── Contact Page ─────────────────────────────────────────────────────────────
export function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // In production, POST to /api/contact
    setSent(true);
    toast.success('Message sent! We\'ll get back to you soon.');
  };

  const inputStyle = { width:'100%', padding:'11px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:'0.93rem', outline:'none', fontFamily:'Inter, sans-serif' };

  return (
    <div style={{ paddingTop:72 }}>
      <div style={{ background:'var(--forest)', padding:'60px 24px', textAlign:'center' }}>
        <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2rem,5vw,3.5rem)', color:'#fff', marginBottom:8 }}>Contact Us</h1>
        <p style={{ color:'rgba(255,255,255,0.7)' }}>We're here to help make your stay perfect</p>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:48 }}>
            {/* Info */}
            <div>
              <h2 style={{ color:'var(--forest)', marginBottom:24, fontSize:'1.8rem' }}>Get In Touch</h2>
              {[
                { icon: MapPin, title:'Address', text:'Plot no 50, Road No. 2, P Janardhan Reddy Nagar, Gachibowli, Hyderabad' },
                { icon: Phone, title:'Phone', text:'+91 9989195969' },
                { icon: Mail, title:'Email', text:'wildwingspremiumhotel@gmail.com' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} style={{ display:'flex', gap:16, marginBottom:28 }}>
                  <div style={{ width:44, height:44, borderRadius:10, background:'var(--forest)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={18} color="var(--gold)"/>
                  </div>
                  <div>
                    <div style={{ fontWeight:600, color:'var(--charcoal)', marginBottom:2 }}>{title}</div>
                    <div style={{ color:'var(--muted)', fontSize:'0.9rem' }}>{text}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop:32 }}>
                <h3 style={{ color:'var(--forest)', marginBottom:16 }}>Our Locations</h3>
                {['Gachibowli Premium Hotel', 'Gachibowli Party Hall', 'Gachibowli Budget', 'Madhapur', 'Narsingi', 'ECIL', 'Kothapet', 'Farm House'].map(loc => (
                  <div key={loc} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--gold)' }}/>
                    <span style={{ color:'var(--charcoal)', fontSize:'0.9rem' }}>{loc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div style={{ background:'var(--white)', borderRadius:20, padding:36, boxShadow:'var(--shadow)' }}>
              <h3 style={{ color:'var(--forest)', marginBottom:24, fontSize:'1.4rem' }}>Send a Message</h3>
              {sent ? (
                <div style={{ textAlign:'center', padding:40 }}>
                  <div style={{ fontSize:'3rem', marginBottom:16 }}>✓</div>
                  <h3 style={{ color:'var(--forest)' }}>Message Sent!</h3>
                  <p style={{ color:'var(--muted)', marginTop:8 }}>We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {[
                    { label:'Full Name', key:'name', type:'text', placeholder:'Your full name' },
                    { label:'Email', key:'email', type:'email', placeholder:'you@email.com' },
                    { label:'Phone', key:'phone', type:'tel', placeholder:'+91 XXXXX XXXXX' },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key} style={{ marginBottom:16 }}>
                      <label style={{ display:'block', fontSize:'0.83rem', fontWeight:600, color:'var(--forest)', marginBottom:6 }}>{label}</label>
                      <input type={type} placeholder={placeholder} style={inputStyle}
                        value={form[key]} onChange={e => setForm(f => ({...f, [key]:e.target.value}))} required/>
                    </div>
                  ))}
                  <div style={{ marginBottom:24 }}>
                    <label style={{ display:'block', fontSize:'0.83rem', fontWeight:600, color:'var(--forest)', marginBottom:6 }}>Message</label>
                    <textarea rows={4} placeholder="How can we help you?" style={{...inputStyle, resize:'vertical'}}
                      value={form.message} onChange={e => setForm(f => ({...f, message:e.target.value}))} required/>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width:'100%', padding:13, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    <Send size={16}/> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── My Bookings ─────────────────────────────────────────────────────────────
export function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      getUserBookings(user.id)
        .then(r => setBookings(r.data))
        .catch(() => setBookings([]))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleCancel = async id => {
    try {
      await cancelBooking(id);
      setBookings(prev => prev.map(b => b.id === id ? {...b, status:'CANCELLED'} : b));
      toast.success('Booking cancelled');
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  const statusColor = {
    CONFIRMED: { bg:'#dcfce7', color:'#166534' },
    PENDING: { bg:'#fef9c3', color:'#854d0e' },
    CANCELLED: { bg:'#fee2e2', color:'#991b1b' },
    CHECKED_IN: { bg:'#dbeafe', color:'#1e40af' },
    CHECKED_OUT: { bg:'#f3f4f6', color:'#374151' },
  };

  return (
    <div style={{ paddingTop:72 }}>
      <div style={{ background:'var(--forest)', padding:'48px 24px', textAlign:'center' }}>
        <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'2.5rem', color:'#fff', marginBottom:8 }}>My Bookings</h1>
        <p style={{ color:'rgba(255,255,255,0.7)' }}>Manage your upcoming and past stays</p>
      </div>

      <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
        {loading ? (
          <p style={{ textAlign:'center', color:'var(--muted)', padding:60 }}>Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign:'center', padding:80 }}>
            <p style={{ color:'var(--muted)', marginBottom:20 }}>No bookings yet.</p>
            <a href="/book"><button className="btn-primary">Book a Room</button></a>
          </div>
        ) : (
          bookings.map(b => (
            <div key={b.id} className="card" style={{ marginBottom:20, padding:28 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16 }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
                    <h3 style={{ color:'var(--forest)', fontSize:'1.2rem' }}>{b.room?.name || 'Room'}</h3>
                    <span style={{ ...statusColor[b.status], padding:'3px 10px', borderRadius:20, fontSize:'0.78rem', fontWeight:600 }}>
                      {b.status}
                    </span>
                  </div>
                  <p style={{ color:'var(--muted)', fontSize:'0.88rem', marginBottom:4 }}>
                    Ref: <strong style={{ color:'var(--forest)' }}>{b.bookingReference}</strong>
                  </p>
                  <p style={{ color:'var(--muted)', fontSize:'0.88rem' }}>
                    {b.checkInDate} → {b.checkOutDate} · {b.numGuests} guest{b.numGuests > 1 ? 's' : ''}
                  </p>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.5rem', color:'var(--forest)', fontWeight:700 }}>
                    ₹{b.totalAmount?.toLocaleString()}
                  </div>
                  {b.status === 'CONFIRMED' && (
                    <button onClick={() => handleCancel(b.id)}
                      style={{ marginTop:10, background:'none', border:'1.5px solid #ef4444', color:'#ef4444', padding:'6px 14px', borderRadius:6, cursor:'pointer', fontSize:'0.83rem' }}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}