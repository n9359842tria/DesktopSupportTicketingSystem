import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate('/tickets');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '5rem' }}>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <h1 className="text-center mb-4 fw-bold">Login</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label fw-semibold">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
