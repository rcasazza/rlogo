import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/api/register', {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        // Optionally show success or redirect directly
        navigate('/login');
      }
    } catch (err) {
      if (err.response?.status === 409 || err.response?.status === 400) {
        setError(err.response.data.error);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <main>
        <form onSubmit={handleSubmit}>
          <fieldset className="bg-blue-100 border border-gray-300 rounded-lg p-6 w-80 shadow-md">
            <legend className="text-xl font-semibold mb-4">Register</legend>

            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

            <label htmlFor="username" className="block mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-6 border border-gray-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
              Register
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>
            </p>
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default RegisterForm;
