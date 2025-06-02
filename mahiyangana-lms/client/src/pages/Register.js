import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the CSS

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', role: 'Student',
    grade: '', classSection: '', alStream: '', subject: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    if (form.role === 'Student') {
      if (!form.grade) {
        setMessage({ type: 'error', text: 'Please select a grade.' });
        return;
      }

      if (parseInt(form.grade) >= 6 && parseInt(form.grade) <= 11 && !form.classSection) {
        setMessage({ type: 'error', text: 'Please select a class section (A–F).' });
        return;
      }

      if ((form.grade === '12' || form.grade === '13') && !form.alStream) {
        setMessage({ type: 'error', text: 'Please select an AL stream.' });
        return;
      }
    }

    if (form.role === 'Teacher' && !form.subject) {
      setMessage({ type: 'error', text: 'Please enter the subject you teach.' });
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/users/register', form);
      setMessage({ type: 'success', text: 'Registered successfully!' });
      setForm({
        name: '', email: '', password: '', confirmPassword: '', role: 'Student',
        grade: '', classSection: '', alStream: '', subject: ''
      });
    } catch (err) {
      const error = err.response?.data?.message || 'Registration failed.';
      setMessage({ type: 'error', text: error });
    } finally {
      setLoading(false);
    }
  };

  const classSections = ['A', 'B', 'C', 'D', 'E', 'F'];
  const alStreams = ['Bio', 'Maths', 'Technology', 'Commerce', 'Art'];

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>

        {message.text && (
          <p className="register-message" style={{ color: message.type === 'error' ? 'red' : 'green' }}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="register-input"
            placeholder="Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="register-input"
            type="email" placeholder="Email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="register-input"
            type="password" placeholder="Password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            className="register-input"
            type="password" placeholder="Confirm Password" value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />
          <select
            className="register-input"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value, grade: '', classSection: '', alStream: '', subject: '' })}
          >
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>

          {/* Student-specific Fields */}
          {form.role === 'Student' && (
            <>
              <select
                className="register-input"
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value, classSection: '', alStream: '' })}
              >
                <option value="">Select Grade</option>
                {[6, 7, 8, 9, 10, 11, 12, 13].map(g => (
                  <option key={g} value={g}>{`Grade ${g}`}</option>
                ))}
              </select>

              {parseInt(form.grade) >= 6 && parseInt(form.grade) <= 11 && (
                <select
                  className="register-input"
                  value={form.classSection}
                  onChange={(e) => setForm({ ...form, classSection: e.target.value })}
                >
                  <option value="">Select Class (A–F)</option>
                  {classSections.map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              )}

              {(form.grade === '12' || form.grade === '13') && (
                <select
                  className="register-input"
                  value={form.alStream}
                  onChange={(e) => setForm({ ...form, alStream: e.target.value })}
                >
                  <option value="">Select AL Stream</option>
                  {alStreams.map(stream => (
                    <option key={stream} value={stream}>{stream}</option>
                  ))}
                </select>
              )}
            </>
          )}

          {form.role === 'Teacher' && (
            <input
              className="register-input"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          )}

          <button type="submit" disabled={loading} className="register-button">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
