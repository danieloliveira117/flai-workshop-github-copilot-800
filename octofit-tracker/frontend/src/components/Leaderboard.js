import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/leaderboard/`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        return res.json();
      })
      .then(data => {
        // Sort by score descending
        const sorted = [...data].sort((a, b) => b.score - a.score);
        setEntries(sorted);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  const getMedal = (idx) => {
    if (idx === 0) return '🥇';
    if (idx === 1) return '🥈';
    if (idx === 2) return '🥉';
    return `#${idx + 1}`;
  };

  const getRowClass = (idx) => {
    if (idx === 0) return 'table-warning fw-bold';
    if (idx === 1) return 'table-secondary';
    if (idx === 2) return 'table-light';
    return '';
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">🏆 Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={entry._id || idx} className={getRowClass(idx)}>
                <td>{getMedal(idx)}</td>
                <td>{entry.user}</td>
                <td>{entry.score.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {entries.length === 0 && <p className="text-muted">No leaderboard data found.</p>}
    </div>
  );
}

export default Leaderboard;
