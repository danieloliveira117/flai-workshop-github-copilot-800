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
        console.log('Workouts: fetched data', data);
        // Support both paginated DRF responses and plain arrays
        const items = Array.isArray(data) ? data : (data.results || []);
        setWorkouts(items);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">💪 Workouts</h2>
      <div className="row">
        {workouts.map((workout, idx) => (
          <div key={workout._id || idx} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">💪 {workout.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{workout.description}</p>
                {workout.exercises && workout.exercises.length > 0 && (
                  <>
                    <h6 className="mt-3">Exercises:</h6>
                    <ul className="list-group list-group-flush">
                      {workout.exercises.map((exercise, i) => (
                        <li key={i} className="list-group-item">✅ {exercise}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {workouts.length === 0 && <p className="text-muted">No workouts found.</p>}
    </div>
  );
}

export default Workouts;
