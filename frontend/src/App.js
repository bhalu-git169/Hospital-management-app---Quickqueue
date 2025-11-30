import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MdLocalHospital, MdDashboard, MdLiveTv, MdAdminPanelSettings } from 'react-icons/md';
import './App.css';
import PatientPage from './pages/PatientPage';
import DisplayPage from './pages/DisplayPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserLoginPage from './pages/UserLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';

function MainShell() {
  const [active, setActive] = useState('token');

  return (
    <div className="qq-app">
      {/* Sidebar */}
      <aside className="qq-sidebar">
        <div className="qq-logo-card">
          <div className="qq-logo-circle">
            <MdLocalHospital size={20} />
          </div>
          <div>
            <h1>QuickQueue</h1>
            <p>Smart hospital token system</p>
          </div>
        </div>

        <div className="qq-user-card">
          <div className="qq-avatar">U</div>
          <div>
            <p className="qq-user-name">@Guest</p>
            <p className="qq-user-sub">Welcome</p>
          </div>
        </div>

        <nav className="qq-nav">
          <button
            className={`qq-nav-item ${active === 'token' ? 'active' : ''}`}
            onClick={() => setActive('token')}
          >
            <MdDashboard size={18} style={{ marginRight: 8 }} />
            Get Token
          </button>
          <button
            className={`qq-nav-item ${active === 'display' ? 'active' : ''}`}
            onClick={() => setActive('display')}
          >
            <MdLiveTv size={18} style={{ marginRight: 8 }} />
            Live Queue Display
          </button>
          <button
            className={`qq-nav-item ${active === 'admin' ? 'active' : ''}`}
            onClick={() => setActive('admin')}
          >
            <MdAdminPanelSettings size={18} style={{ marginRight: 8 }} />
            Admin Panel
          </button>
        </nav>

        <div className="qq-progress-card">
          <p className="qq-progress-label">Queue load</p>
          <div className="qq-progress-bar">
            <div className="qq-progress-fill" style={{ width: '40%' }} />
          </div>
          <p className="qq-progress-value">40% busy</p>
        </div>
      </aside>

      {/* Main area */}
      <main className="qq-main">
        <header className="qq-main-header">
          <div>
            <h2>
              {active === 'token' && 'Get Token'}
              {active === 'display' && 'Live Queue Display'}
              {active === 'admin' && 'Admin Panel'}
            </h2>
            <p>Smart hospital token system</p>
          </div>
        </header>

        <section className="qq-main-body">
          {active === 'token' && (
            <div className="qq-card-large">
              <PatientPage />
            </div>
          )}
          {active === 'display' && (
            <div className="qq-card-large">
              <DisplayPage />
            </div>
          )}
          {active === 'admin' && (
            <div className="qq-card-row">
              <AdminDashboardPage />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/user/app" element={<MainShell />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
