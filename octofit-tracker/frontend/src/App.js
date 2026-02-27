import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

// Matrix digital rain canvas animation
function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;<>?,./\\~`';
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px Courier New';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = drops[i] * fontSize < 20 ? '#ffffff' : '#00ff41';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 50);
    window.addEventListener('resize', resize);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.18, pointerEvents: 'none' }} />;
}

const NAV_ITEMS = [
  { to: '/users',       label: 'Users',       icon: '[USR]', desc: 'Manage user profiles'    },
  { to: '/teams',       label: 'Teams',       icon: '[TM]',  desc: 'View and manage teams'   },
  { to: '/activities',  label: 'Activities',  icon: '[ACT]', desc: 'Log fitness activities'  },
  { to: '/leaderboard', label: 'Leaderboard', icon: '[LDR]', desc: 'See top performers'      },
  { to: '/workouts',    label: 'Workouts',    icon: '[WRK]', desc: 'Explore workout plans'   },
];

function HomePage() {
  return (
    <div>
      {/* ---- Hero ---- */}
      <div className="hero-section text-center">
        <MatrixRain />
        <div className="hero-content">
          <img
            src="/octofitapp-small.png"
            alt="OctoFit Tracker"
            className="mb-3"
            style={{ maxHeight: '110px' }}
          />
          <h1 className="display-4 fw-bold mb-2">// OctoFit Tracker</h1>
          <p className="lead mb-4">
            &gt; Track activities. Compete with teams. Climb the leaderboard._
          </p>
          <Link to="/activities" className="btn btn-primary btn-lg me-2 px-4">
            &gt; Log Activity
          </Link>
          <Link to="/leaderboard" className="btn btn-outline-light btn-lg px-4">
            &gt; View Leaderboard
          </Link>
        </div>
      </div>

      {/* ---- Feature cards ---- */}
      <div className="row g-3">
        {NAV_ITEMS.map(card => (
          <div key={card.to} className="col-sm-6 col-lg">
            <Link to={card.to} className="text-decoration-none">
              <div className="card h-100 shadow-sm feature-card">
                <div className="card-body text-center py-4">
                  <div className="feature-icon mb-2" style={{ fontFamily: 'Courier New', fontSize: '1.1rem', letterSpacing: '0.04em' }}>{card.icon}</div>
                  <h5 className="card-title fw-bold mb-1">{card.label}</h5>
                  <p className="card-text text-muted small mb-0">{card.desc}</p>
                </div>
                <div className="card-footer bg-transparent text-center border-0 pb-3">
                  <span className="btn btn-sm btn-outline-primary">&gt; Enter</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        {/* ---- Navigation ---- */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit" height="36" />
              <span>&gt; OctoFit_Tracker</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto gap-1">
                {NAV_ITEMS.map(item => (
                  <li className="nav-item" key={item.to}>
                    <NavLink
                      className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                      to={item.to}
                    >
                      {item.icon} {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* ---- Main content ---- */}
        <div className="container mt-4 mb-5">
          <Routes>
            <Route path="/"            element={<HomePage />}   />
            <Route path="/users"       element={<Users />}      />
            <Route path="/teams"       element={<Teams />}      />
            <Route path="/activities"  element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />}/>
            <Route path="/workouts"    element={<Workouts />}   />
          </Routes>
        </div>

        {/* ---- Footer ---- */}
        <footer className="text-light text-center py-3 mt-auto">
          <p className="mb-0">
            &gt; OctoFit_Tracker :: Mergington_High_School :: {new Date().getFullYear()} _
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
