import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    localStorage.setItem('qq_user', JSON.stringify(form));
    navigate('/user/app');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background:
          'radial-gradient(circle at top, #eef2ff 0%, #e0f2fe 40%, #fdf2ff 100%)'
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg,#6366f1,#a855f7)',
          padding: 2,
          borderRadius: 20,
          boxShadow: '0 18px 40px rgba(79,70,229,0.35)',
          maxWidth: 420,
          width: '100%'
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: 18,
            padding: '22px 24px'
          }}
        >
          <h1 style={{ marginBottom: 6, fontSize: 22, color: '#111827' }}>
            QuickQueue
          </h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
            Sign in to generate a hospital token.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'grid', gap: 10, fontSize: 14 }}
          >
            <label>
              Name
              <input
                style={{
                  width: '100%',
                  marginTop: 4,
                  padding: 9,
                  borderRadius: 10,
                  border: '1px solid #e5e7eb'
                }}
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>

            <label>
              Phone (optional)
              <input
                style={{
                  width: '100%',
                  marginTop: 4,
                  padding: 9,
                  borderRadius: 10,
                  border: '1px solid #e5e7eb'
                }}
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </label>

            <button
              type="submit"
              style={{
                marginTop: 8,
                padding: '10px 14px',
                borderRadius: 999,
                border: 'none',
                background: 'linear-gradient(135deg,#6366f1,#a855f7)',
                color: '#ffffff',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLoginPage;
