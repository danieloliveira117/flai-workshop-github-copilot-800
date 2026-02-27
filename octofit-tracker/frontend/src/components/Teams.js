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
        console.log('Teams: raw response data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        // Normalize members field to always be an array
        const normalized = items.map(team => ({
          ...team,
          members: Array.isArray(team.members)
            ? team.members
            : typeof team.members === 'string'
              ? (() => { try { const v = JSON.parse(team.members.replace(/'/g, '"')); return Array.isArray(v) ? v : []; } catch(e) { return []; } })()
              : team.members && typeof team.members === 'object'
                ? Object.values(team.members)
                : [],
        }));
        console.log('Teams: parsed items', normalized);
        setTeams(normalized);
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
        <span style={{ fontSize: '1.6rem' }}>🏆</span>
        <h2>Teams</h2>
        <span className="badge bg-primary ms-2">{teams.length}</span>
      </div>

      {teams.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏆</div>
          <p className="mb-0">No teams found.</p>
        </div>
      ) : (
        <div className="row g-4">
          {teams.map((team, idx) => (
            <div key={team._id || idx} className="col-md-6">
              <div className="card shadow-card h-100">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">🏆 {team.name}</h5>
                  <span className="badge bg-primary">
                    {team.members ? team.members.length : 0} members
                  </span>
                </div>
                <div className="card-body p-0">
                  {team.members && team.members.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-striped table-hover align-middle mb-0">
                        <thead className="table-secondary">
                          <tr>
                            <th style={{ width: '50px' }}>#</th>
                            <th>Member</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.members.map((member, i) => (
                            <tr key={i}>
                              <td><span className="badge bg-secondary">{i + 1}</span></td>
                              <td>👤 {member}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted p-3 mb-0">No members yet.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
