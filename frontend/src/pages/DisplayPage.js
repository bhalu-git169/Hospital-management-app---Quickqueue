// src/pages/DisplayPage.js
import { useEffect, useState } from 'react';
import { departmentAPI } from '../services/api';
import { socket } from '../socket';
import './DisplayPage.css';

function DisplayPage() {
  const [departments, setDepartments] = useState([]);

  const loadDepartments = async () => {
    try {
      const res = await departmentAPI.getAll();
      setDepartments(res.data);
    } catch (err) {
      console.error('Failed to load departments', err);
    }
  };

  useEffect(() => {
    loadDepartments();

    socket.connect();

    const reload = () => loadDepartments();

    socket.on('queue_update', reload);
    socket.on('token_generated', reload);

    return () => {
      socket.off('queue_update', reload);
      socket.off('token_generated', reload);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="display-page">
      <div className="display-header">
        <h1>Now Serving</h1>
        <p className="live-indicator">● LIVE</p>
      </div>

      <div className="departments-grid">
        {departments.map((dept) => (
          <div key={dept.id} className="dept-card">
            <h2 className="dept-name">{dept.name}</h2>

            <div className="serving-section">
              <p className="label">Now Serving</p>
              <div className="serving-token">{dept.serving_token}</div>
            </div>

            <div className="upcoming-section">
              <span>Upcoming: </span>
              <span className="upcoming-numbers">
                {dept.serving_token + 1}, {dept.serving_token + 2},{' '}
                {dept.serving_token + 3}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayPage;
