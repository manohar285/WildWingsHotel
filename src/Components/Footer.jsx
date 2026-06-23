import React from 'react';
import { Link } from 'react-router-dom';
//import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--forest)', color: '#d1d5db', paddingTop: 60, paddingBottom: 32 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#fff', fontWeight: 600, marginBottom: 12 }}>
              WildWings
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#9ca3af' }}>
              Luxury hotels in Hyderabad offering exceptional hospitality, premium comfort, and memorable stays across multiple locations.
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
             {/* {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" style={{ color: '#9ca3af', transition: 'color 0.2s' }}
                   onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'}
                   onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>
                  <Icon size={20}/>
                </a>
              ))} */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Quick Links</h4>
            {[['/', 'Home'], ['/rooms', 'Our Rooms'], ['/book', 'Book Now'], ['/contact', 'Contact Us']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', color: '#9ca3af', marginBottom: 10, fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>
                {label}
              </Link>
            ))}
          </div>

          {/* Locations */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Our Locations</h4>
            {['Gachibowli', 'Madhapur', 'Narsingi', 'ECIL', 'Kothapet', 'Farm House'].map(loc => (
              <p key={loc} style={{ color: '#9ca3af', marginBottom: 8, fontSize: '0.9rem' }}>{loc}</p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact</h4>
            {/* <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 3 }}/>
                <span style={{ color: '#9ca3af', fontSize: '0.88rem' }}>Plot no 50, Road No. 2, P Janardhan Reddy Nagar, Gachibowli, Hyderabad</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--gold)' }}/>
                <a href="tel:9989195969" style={{ color: '#9ca3af', fontSize: '0.88rem' }}>+91 9989195969</a>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--gold)' }}/>
                <span style={{ color: '#9ca3af', fontSize: '0.88rem' }}>wildwingspremiumhotel@gmail.com</span>
              </div>
            </div> */}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#6b7280', fontSize: '0.83rem' }}>© 2024 WildWings Hotels. All rights reserved.</p>
          <p style={{ color: '#6b7280', fontSize: '0.83rem' }}>Hyderabad, Telangana, India</p>
        </div>
      </div>
    </footer>
  );
}