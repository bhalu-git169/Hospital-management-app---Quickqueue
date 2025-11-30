// src/pages/AdminLoginPage.js
function AdminLoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div
        style={{
          background: '#ffffff',
          padding: '24px 28px',
          borderRadius: 16,
          boxShadow: '0 16px 32px rgba(148,163,184,0.35)',
          maxWidth: 380,
          width: '100%'
        }}
      >
        <h1 style={{ marginBottom: 8 }}>Admin PIN Login</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 12 }}>
          Placeholder screen. Later: PIN input, save qq_admin=true, go to /admin.
        </p>
      </div>
    </div>
  );
}

export default AdminLoginPage;
