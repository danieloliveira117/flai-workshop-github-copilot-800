import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit" height="40" />
              <span>OctoFit Tracker</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><NavLink className="nav-link" to="/users">Users</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/teams">Teams</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/activities">Activities</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/workouts">Workouts</NavLink></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-5">
                <img src="/octofitapp-small.png" alt="OctoFit Tracker" className="mb-4" style={{ maxHeight: '150px' }} />
                <h1 className="display-4">Welcome to OctoFit Tracker</h1>
                <p className="lead">Track your fitness activities, compete with teams, and climb the leaderboard!</p>
                <div className="row mt-4">
                  {[
                    { to: '/users', label: 'Users', icon: '👤', desc: 'Manage user profiles' },
                    { to: '/teams', label: 'Teams', icon: '🏆', desc: 'View and manage teams' },
                    { to: '/activities', label: 'Activities', icon: '🏃', desc: 'Log fitness activities' },
                    { to: '/leaderboard', label: 'Leaderboard', icon: '📊', desc: 'See top performers' },
                    { to: '/workouts', label: 'Workouts', icon: '💪', desc: 'Explore workout plans' },
                  ].map(card => (
                    <div key={card.to} className="col-md-4 col-lg mb-3">
                      <Link to={card.to} className="text-decoration-none">
                        <div className="card h-100 shadow-sm">
                          <div className="card-body text-center">
                            <div style={{ fontSize: '2rem' }}>{card.icon}</div>
                            <h5 className="card-title mt-2">{card.label}</h5>
                            <p className="card-text text-muted small">{card.desc}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            } />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>

        <footer className="bg-dark text-light text-center py-3 mt-5">
          <p className="mb-0">&copy; 2024 OctoFit Tracker &mdash; Mergington High School</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
