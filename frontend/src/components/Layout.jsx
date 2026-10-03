import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DemoModeBanner from './DemoModeBanner.jsx';

const links = [
  { to: '/', label: 'Dashboard', icon: '⌂' },
  { to: '/explain', label: 'Topic explainer', icon: 'Aa' },
  { to: '/appointment', label: 'Appointment prep', icon: '◎' },
  { to: '/questions', label: 'Ask my provider', icon: '?' },
  { to: '/history', label: 'Saved history', icon: '☰' },
  { to: '/profile', label: 'Profile', icon: '☺' },
];

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <div className={`overlay ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <div className="brand-mark">C</div>
          <div>
            <h1>CareGuide AI</h1>
            <p>Patient education, plainly</p>
          </div>
        </NavLink>
        <nav className="nav-list" aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="nav-ico">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-note">
          Not for emergencies. If you have chest pain, trouble breathing, or feel unsafe, seek in-person care now.
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <button className="menu-btn" type="button" onClick={() => setOpen(true)} aria-label="Open menu">
            Menu
          </button>
          <p className="muted">Clinic-ready explanations for everyday visits</p>
        </header>
        <div className="page-banner">
          <DemoModeBanner />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
