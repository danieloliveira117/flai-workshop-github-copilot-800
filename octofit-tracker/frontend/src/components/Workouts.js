import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/api/workouts/`;
    console.log('Workouts: fetching from', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch workouts');
        return res.json();
      })
      .then(data => {
        console.log('Workouts: raw response data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        // Normalize exercises field to always be an array
        const normalized = items.map(workout => ({
          ...workout,
          exercises: Array.isArray(workout.exercises)
            ? workout.exercises
            : typeof workout.exercises === 'string'
              ? (() => { try { const v = JSON.parse(workout.exercises.replace(/'/g, '"')); return Array.isArray(v) ? v : []; } catch(e) { return []; } })()
              : workout.exercises && typeof workout.exercises === 'object'
                ? Object.values(workout.exercises)
                : [],
        }));
        console.log('Workouts: parsed items', normalized);
        setWorkouts(normalized);
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
        <span style={{ fontSize: '1.6rem' }}>💪</span>
        <h2>Workouts</h2>
        <span className="badge bg-primary ms-2">{workouts.length}</span>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💪</div>
          <p className="mb-0">No workouts found.</p>
        </div>
      ) : (
        <div className="row g-4">
          {workouts.map((workout, idx) => (
            <div key={workout._id || idx} className="col-md-6 col-lg-4">
              <div className="card shadow-card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">💪 {workout.name}</h5>
                  {workout.exercises && (
                    <span className="badge">
                      {workout.exercises.length} exercises
                    </span>
                  )}
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">{workout.description}</p>
                </div>
                {workout.exercises && workout.exercises.length > 0 && (
                  <div className="card-body border-top p-0">
                    <table className="table table-sm align-middle mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: '40px' }}>#</th>
                          <th>Exercise</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workout.exercises.map((exercise, i) => (
                          <tr key={i}>
                            <td><span className="badge bg-primary">{i + 1}</span></td>
                            <td>✅ {exercise}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="card-footer bg-transparent d-flex justify-content-between align-items-center">
                  <small className="text-muted">Workout #{idx + 1}</small>
                  <span className="badge">Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
