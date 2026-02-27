import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

const MEDALS = ['🥇', '🥈', '🥉'];
const ROW_CLASSES = ['rank-gold fw-bold', 'rank-silver', 'rank-bronze'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/api/leaderboard/`;
    console.log('Leaderboard: fetching from', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        return res.json();
      })
      .then(data => {
        console.log('Leaderboard: raw response data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        const sorted = [...items].sort((a, b) => b.score - a.score);
        console.log('Leaderboard: sorted items', sorted);
        setEntries(sorted);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <span style={{ fontSize: '1.6rem' }}>📊</span>
        <h2>Leaderboard</h2>
        <span className="badge bg-primary ms-2">{entries.length}</span>
      </div>

      {/* Top-3 podium cards */}
      {entries.length >= 3 && (
        <div className="row g-3 mb-4">
          {entries.slice(0, 3).map((entry, idx) => (
            <div key={entry._id || idx} className="col-md-4">
              <div className={`card shadow-card text-center h-100 ${
                idx === 0 ? 'border-warning' : idx === 1 ? 'border-secondary' : 'border-danger-subtle'
              }`}>
                <div className={`card-header fw-bold ${
                  idx === 0 ? 'bg-warning text-dark' : idx === 1 ? 'bg-secondary text-white' : 'bg-danger-subtle'
                }`}>
                  {MEDALS[idx]} Rank {idx + 1}
                </div>
                <div className="card-body">
                  <h5 className="card-title">👤 {entry.user}</h5>
                  <p className="card-text display-6 fw-bold">{entry.score.toFixed(1)}</p>
                  <span className="badge bg-primary">pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full table */}
      <div className="card shadow-card">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Full Rankings</span>
          <span className="badge bg-secondary">{entries.length} participants</span>
        </div>
        <div className="card-body p-0">
          {entries.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <p className="mb-0">No leaderboard data found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '80px' }}>Rank</th>
                    <th>User</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, idx) => (
                    <tr key={entry._id || idx} className={ROW_CLASSES[idx] || ''}>
                      <td className="text-center fs-5">
                        {idx < 3 ? MEDALS[idx] : <span className="badge bg-secondary">#{idx + 1}</span>}
                      </td>
                      <td><span className="fw-semibold">👤 {entry.user}</span></td>
                      <td>
                        <span className="badge bg-primary fs-6 px-3">{entry.score.toFixed(1)}</span>
                      </td>
                      <td>
                        {idx === 0 && <span className="badge bg-warning text-dark">Champion</span>}
                        {idx === 1 && <span className="badge bg-secondary">Runner-up</span>}
                        {idx === 2 && <span className="badge bg-danger">3rd Place</span>}
                        {idx > 2  && <span className="badge bg-light text-dark border">Competitor</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
