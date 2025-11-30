// src/pages/PatientPage.js
import { useEffect, useState } from 'react';
//import { useTranslation } from 'react-i18next';
import { departmentAPI, tokenAPI } from '../services/api';
import { socket } from '../socket';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';
import TokenCard from '../components/TokenCard';
import './PatientPage.css';

function PatientPage() {
  //const { t } = useTranslation();
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [result, setResult] = useState(null); // { token, serving, position, department }
  const [loading, setLoading] = useState(false);

  // load departments + last token from localStorage + setup socket
  useEffect(() => {
    const init = async () => {
      try {
        const res = await departmentAPI.getAll();
        setDepartments(res.data);
      } catch (e) {
        console.error('Failed to load departments', e);
      }

      const saved = localStorage.getItem('qq_last_token');
      if (saved) {
        const data = JSON.parse(saved);
        setResult(data);
        setDepartment(data.department);
      }
    };

    init();

    socket.connect();

    const handleQueueUpdate = (data) => {
      // update only if this page has a token for that department
      if (!result || !data || data.department !== result.department) return;
      setResult((prev) => {
        if (!prev) return prev;
        const serving = data.serving;
        return {
          ...prev,
          serving,
          position: Math.max(0, prev.token - serving)
        };
      });
    };

    socket.on('queue_update', handleQueueUpdate);

    return () => {
      socket.off('queue_update', handleQueueUpdate);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !department) return;
    setLoading(true);

    try {
      const res = await tokenAPI.generate(name, department, phone);
      const data = res.data; // { token, serving, position, department }
      setResult(data);
      localStorage.setItem('qq_last_token', JSON.stringify(data));
    } catch (err) {
      console.error(err);
      alert('Failed to generate token');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setName('');
    setPhone('');
    setDepartment('');
    localStorage.removeItem('qq_last_token');
  };

  const currentServing = result ? result.serving : 0;
  const currentPosition = result ? Math.max(0, result.token - currentServing) : 0;

  return (
    <div className="patient-page">
      <div className="patient-container">
        <header className="header">
          <h1>QuickQueue</h1>
          <p>Smart hospital token system</p>
        </header>

        {!result ? (
          <form className="token-form" onSubmit={handleGenerate}>
            <InputField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />

            <InputField
              label="Phone (optional)"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              required={false}
            />

            <Dropdown
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              options={departments.map((d) => d.name)}
            />

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Generating…' : 'Generate Token'}
            </Button>
          </form>
        ) : (
          <div className="token-result">
            <TokenCard
              token={result.token}
              serving={currentServing}
              position={currentPosition}
              department={result.department}
            />
            <p className="instruction">
              Keep this screen open to see live status changes.
            </p>
            <Button variant="secondary" onClick={handleReset}>
              Generate Another
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientPage;