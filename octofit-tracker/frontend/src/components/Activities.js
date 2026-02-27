import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

/* Map activity types to Bootstrap badge colours */
const ACTIVITY_COLOUR = {
  running:   'success',
  cycling:   'info',
  swimming:  'primary',
  yoga:      'warning',
  strength:  'danger',
  walking:   'secondary',
};

function activityColour(type) {
  return ACTIVITY_COLOUR[(type || '').toLowerCase()] || 'dark';
}

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/api/activities/`;
    console.log('Activities: fetching from', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch activities');
        return res.json();
      })
      .then(data => {
        console.log('Activities: raw response data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        console.log('Activities: parsed items', items);
        setActivities(items);
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
        <span style={{ fontSize: '1.6rem' }}>🏃</span>
        <h2>Activities</h2>
        <span className="badge bg-primary ms-2">{activities.length}</span>
      </div>

      {/* Data card */}
      <div className="card shadow-card">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Activity Log</span>
          <span className="badge bg-secondary">{activities.length} entries</span>
        </div>
        <div className="card-body p-0">
          {activities.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏃</div>
              <p className="mb-0">No activities logged yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '60px' }}>#</th>
                    <th>User</th>
                    <th>Activity Type</th>
                    <th>Duration</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, idx) => (
                    <tr key={activity._id || idx}>
                      <td><span className="badge bg-secondary">{idx + 1}</span></td>
                      <td><span className="fw-semibold">👤 {activity.user}</span></td>
                      <td>
                        <span className={`badge bg-${activityColour(activity.activity_type)} activity-badge`}>
                          🏃 {activity.activity_type}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">{activity.duration} min</span>
                      </td>
                      <td>{activity.date}</td>
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

export default Activities;
