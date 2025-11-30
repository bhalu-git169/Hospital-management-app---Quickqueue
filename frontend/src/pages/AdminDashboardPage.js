// src/pages/AdminDashboardPage.js
import { useEffect, useState } from 'react';
import { departmentAPI, tokenAPI } from '../services/api';
import { socket } from '../socket';
import './AdminDashboardPage.css';

function AdminDashboardPage() {
  const [departments, setDepartments] = useState([]);
  const [activeDept, setActiveDept] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDepartments = async () => {
    try {
      const res = await departmentAPI.getAll();
      setDepartments(res.data);
      if (!activeDept && res.data.length > 0) {
        setActiveDept(res.data[0].name);
        loadTokens(res.data[0].name);
      }
    } catch (err) {
      console.error('Failed to load departments', err);
    }
  };

  const loadTokens = async (deptName) => {
    try {
      const res = await tokenAPI.listByDepartment(deptName);
      setTokens(res.data);
    } catch (err) {
      console.error('Failed to load tokens', err);
    }
  };

  useEffect(() => {
    loadDepartments();

    socket.connect();

    const reload = (data) => {
      if (!data || !data.department) return;
      loadDepartments();
      if (data.department === activeDept) {
        loadTokens(activeDept);
      }
    };

    socket.on('queue_update', reload);
    socket.on('token_generated', reload);

    return () => {
      socket.off('queue_update', reload);
      socket.off('token_generated', reload);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDept]);

  const handleNext = async () => {
    if (!activeDept) return;
    setLoading(true);
    try {
      await tokenAPI.adminNext(activeDept);
      await Promise.all([loadDepartments(), loadTokens(activeDept)]);
    } catch (err) {
      console.error('Failed to advance queue', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!activeDept) return;
    if (!window.confirm(`Reset queue for ${activeDept}?`)) return;
    setLoading(true);
    try {
      await tokenAPI.resetDepartment(activeDept);
      await Promise.all([loadDepartments(), loadTokens(activeDept)]);
    } catch (err) {
      console.error('Failed to reset queue', err);
    } finally {
      setLoading(false);
    }
  };

  const activeDeptInfo =
    departments.find((d) => d.name === activeDept) || null;

  return (
    <div className="admin-page">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2 className="admin-title">Admin Panel</h2>
          <p className="admin-subtitle">
            Manage queues for each department.
          </p>

          <div className="dept-list">
            {departments.map((dept) => (
              <button
                key={dept.id}
                className={
                  'dept-pill ' +
                  (dept.name === activeDept ? 'active' : '')
                }
                onClick={() => {
                  setActiveDept(dept.name);
                  loadTokens(dept.name);
                }}
              >
                {dept.name}
                <span className="pill-count">
                  {dept.current_token - dept.serving_token}
                </span>
              </button>
            ))}
          </div>

          {activeDeptInfo && (
            <div className="admin-stats">
              <p>
                <strong>Now serving:</strong>{' '}
                {activeDeptInfo.serving_token}
              </p>
              <p>
                <strong>Last token:</strong>{' '}
                {activeDeptInfo.current_token}
              </p>
            </div>
          )}

          <div className="admin-actions">
            <button
              className="btn-primary"
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? 'Updating…' : 'Call Next Token'}
            </button>
            <button
              className="btn-danger"
              onClick={handleReset}
              disabled={loading}
            >
              Reset Queue
            </button>
          </div>
        </aside>

        <section className="admin-main">
          <h3 className="table-title">
            {activeDept ? `${activeDept} Queue` : 'Select a department'}
          </h3>
          <div className="table-wrapper">
            <table className="token-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Patient</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tokens.length === 0 && (
                  <tr>
                    <td colSpan="3" className="empty-row">
                      No tokens yet. Generate one to get started.
                    </td>
                  </tr>
                )}
                {tokens.map((t) => (
                  <tr key={t.id}>
                    <td>#{t.token_number}</td>
                    <td>{t.patient_name}</td>
                    <td className={'status ' + t.status}>{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
