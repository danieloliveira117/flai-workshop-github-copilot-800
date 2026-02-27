import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/api/teams/`;
    console.log('Teams: fetching from', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch teams');
        return res.json();
      })
      .then(data => {
        console.log('Teams: fetched data', data);
        // Support both paginated DRF responses and plain arrays
        const items = Array.isArray(data) ? data : (data.results || []);
        setTeams(items);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">Teams</h2>
      <div className="row">
        {teams.map((team, idx) => (
          <div key={team._id || idx} className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">🏆 {team.name}</h5>
              </div>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Members ({team.members ? team.members.length : 0})</h6>
                <ul className="list-group list-group-flush">
                  {team.members && team.members.map((member, i) => (
                    <li key={i} className="list-group-item">👤 {member}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      {teams.length === 0 && <p className="text-muted">No teams found.</p>}
    </div>
  );
}

export default Teams;
