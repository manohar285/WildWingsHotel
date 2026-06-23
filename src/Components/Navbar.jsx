import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: transparent ? 'rgba(26,58,42,0.0)' : 'var(--forest)',
      backdropFilter: transparent ? 'none' : 'blur(12px)',
      transition: 'all 0.3s',
      borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.08)'
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:72 }}>
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{
            width:40, height:40, borderRadius:8,
            background:'var(--gold)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'Cormorant Garamond, serif', fontWeight:700, fontSize:'1.2rem', color:'#fff'
          }}>W</div>
          <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.4rem', fontWeight:600, color:'#fff', letterSpacing:'0.02em' }}>
            WildWings
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{ display:'flex', listStyle:'none', gap:32, alignItems:'center' }} className="desktop-nav">
          {[['/', 'Home'], ['/rooms', 'Our Rooms'], ['/locations', 'Locations'], ['/contact', 'Contact']].map(([to, label]) => (
            <li key={to}>
              <Link to={to} style={{
                color: location.pathname === to ? 'var(--gold-light)' : '#e5e7eb',
                fontWeight: 500, fontSize:'0.93rem', transition:'color 0.2s'
              }}>{label}</Link>
            </li>
          ))}
          {user ? (
            <>
              <li><Link to="/my-bookings" style={{ color:'#e5e7eb', fontWeight:500, fontSize:'0.93rem' }}>My Bookings</Link></li>
              {user.role === 'ADMIN' && <li><Link to="/admin" style={{ color:'var(--gold-light)', fontWeight:600, fontSize:'0.93rem' }}>Admin</Link></li>}
              <li>
                <button onClick={logout} className="btn-outline" style={{ color:'#fff', borderColor:'rgba(255,255,255,0.4)', padding:'8px 20px', fontSize:'0.88rem' }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" style={{ color:'#e5e7eb', fontWeight:500, fontSize:'0.93rem' }}>Login</Link></li>
              <li>
                <Link to="/book">
                  <button className="btn-primary" style={{ padding:'9px 22px', fontSize:'0.9rem' }}>Book Now</button>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{ background:'none', border:'none', cursor:'pointer', color:'#fff', display:'none' }} className="hamburger">
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background:'var(--forest)', padding:'16px 24px 24px' }}>
          {[['/', 'Home'], ['/rooms', 'Our Rooms'], ['/locations', 'Locations'], ['/contact', 'Contact'], ['/book', 'Book Now']].map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} style={{ display:'block', color:'#e5e7eb', padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
              {label}
            </Link>
          ))}
          {user ? (
            <button onClick={() => { logout(); setOpen(false); }} style={{ marginTop:16, color:'#e5e7eb', background:'none', border:'1px solid rgba(255,255,255,0.3)', padding:'10px 20px', borderRadius:8, cursor:'pointer', width:'100%' }}>
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} style={{ display:'block', marginTop:16, color:'var(--gold-light)', fontWeight:600 }}>Login</Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}


















// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// //import { useAuth } from '../services/AuthContext';
// import { Menu, X, Phone } from 'lucide-react';

// export default function Navbar() {
//   // const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//    const isHome = location.pathname === '/';
//    const transparent = isHome && !scrolled;

//    backdropFilter: transparent ? 'none' : 'blur(12px)',
//    background: transparent ? 'rgba(26,58,42,0.0)' : 'var(--forest)',
      
//       transition: 'all 0.3s',
//   //     borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.08)'
//   return (
//     <nav style={{
//       position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
     
//     }}>
//       <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:72 }}>
//         {/* Logo */}
//         <Link to="/" style={{ display:'flex', alignItems:'center', gap:10 }}>
//           <div style={{
//             width:40, height:40, borderRadius:8,
//             background:'var(--gold)',
//             display:'flex', alignItems:'center', justifyContent:'center',
//             fontFamily:'Cormorant Garamond, serif', fontWeight:700, fontSize:'1.2rem', color:'#fff'
//           }}>W</div>
//           <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.4rem', fontWeight:600, color:'#fff', letterSpacing:'0.02em' }}>
//             WildWings
//           </span>
//         </Link>

//         {/* Desktop links */}
//         <ul style={{ display:'flex', listStyle:'none', gap:32, alignItems:'center' }} className="desktop-nav">
//           {[['/', 'Home'], ['/rooms', 'Our Rooms'], ['/locations', 'Locations'], ['/contact', 'Contact']].map(([to, label]) => (
//             <li key={to}>
//               <Link to={to} style={{
//                 color: location.pathname === to ? 'var(--gold-light)' : '#e5e7eb',
//                 fontWeight: 500, fontSize:'0.93rem', transition:'color 0.2s'
//               }}>{label}</Link>
//             </li>
//           ))}
//           {/*{user ? (
//           //   <>
//           //     <li><Link to="/my-bookings" style={{ color:'#e5e7eb', fontWeight:500, fontSize:'0.93rem' }}>My Bookings</Link></li>
//           //     {user.role === 'ADMIN' && <li><Link to="/admin" style={{ color:'var(--gold-light)', fontWeight:600, fontSize:'0.93rem' }}>Admin</Link></li>}
//           //     <li>
//           //       <button onClick={logout} className="btn-outline" style={{ color:'#fff', borderColor:'rgba(255,255,255,0.4)', padding:'8px 20px', fontSize:'0.88rem' }}>
//           //         Logout
//           //       </button>
//           //     </li>
//           //   </>
//           // ) : (
//           //   <>
//           //     <li><Link to="/login" style={{ color:'#e5e7eb', fontWeight:500, fontSize:'0.93rem' }}>Login</Link></li>
//           //     <li>
//           //       <Link to="/book">
//           //         <button className="btn-primary" style={{ padding:'9px 22px', fontSize:'0.9rem' }}>Book Now</button>
//           //       </Link>
//           //     </li>
//           //   </>
//           // )}*/}
//         </ul>

//         {/* Mobile hamburger */}
//         <button onClick={() => setOpen(!open)} style={{ background:'none', border:'none', cursor:'pointer', color:'#fff', display:'none' }} className="hamburger">
//           {open ? <X size={24}/> : <Menu size={24}/>}
//         </button>
//       </div>

//       {/* Mobile menu */}
//       {open && (
//         <div style={{ background:'var(--forest)', padding:'16px 24px 24px' }}>
//           {[['/', 'Home'], ['/rooms', 'Our Rooms'], ['/locations', 'Locations'], ['/contact', 'Contact'], ['/book', 'Book Now']].map(([to, label]) => (
//             <Link key={to} to={to} onClick={() => setOpen(false)} style={{ display:'block', color:'#e5e7eb', padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
//               {label}
//             </Link>
//           ))}
//           {user ? (
//             <button onClick={() => { logout(); setOpen(false); }} style={{ marginTop:16, color:'#e5e7eb', background:'none', border:'1px solid rgba(255,255,255,0.3)', padding:'10px 20px', borderRadius:8, cursor:'pointer', width:'100%' }}>
//               Logout
//             </button>
//           ) : (
//             <Link to="/login" onClick={() => setOpen(false)} style={{ display:'block', marginTop:16, color:'var(--gold-light)', fontWeight:600 }}>Login</Link>
//           )}
//         </div>
//       )}

//       <style>{`
//         @media (max-width: 768px) {
//           .desktop-nav { display: none !important; }
//           .hamburger { display: block !important; }
//         }
//       `}</style>
//     </nav>
//   );
// }