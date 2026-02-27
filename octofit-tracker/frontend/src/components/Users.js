import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/api/users/`;
    console.log('Users: fetching from', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        console.log('Users: raw response data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        console.log('Users: parsed items', items);
        setUsers(items);
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
        <span style={{ fontSize: '1.6rem' }}>👤</span>
        <h2>Users</h2>
        <span className="badge bg-primary ms-2">{users.length}</span>
      </div>

      {/* Data card */}
      <div className="card shadow-card">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Registered Users</span>
          <span className="badge bg-secondary">{users.length} total</span>
        </div>
        <div className="card-body p-0">
          {users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👤</div>
              <p className="mb-0">No users found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '60px' }}>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user._id || idx}>
                      <td><span className="badge bg-secondary">{idx + 1}</span></td>
                      <td>
                        <span className="fw-semibold">👤 {user.username}</span>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          {user.email}
                        </a>
                      </td>
                      <td>
                        <span className="badge bg-success">Active</span>
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

export default Users;
