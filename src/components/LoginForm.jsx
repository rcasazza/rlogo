import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import { log } from '../utils/logger';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setError('Invalid username or password.');
    } else {
      setError('');
      log('Submitted:', { userName, password });

      // Handle login logic here
      try {
        const res = await api.post('http://localhost:3000/api/login', {
          userName,
          password,
        });

        if (res.data?.token) {
          // Store access token
          localStorage.setItem('accessToken', res.data.token);

          // Redirect to main app
          navigate('/');
        } else {
          setError('Unexpected response from server.');
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setError('Invalid username or password.');
        } else {
          setError('Login failed. Please try again.');
        }
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <main>
        <form onSubmit={handleSubmit}>
          <fieldset className="bg-blue-100 border border-gray-300 rounded-lg p-6 w-80 shadow-md">
            <legend className="text-xl font-semibold mb-4">Login</legend>

            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

            <label htmlFor="userName" className="block mb-2">
              Username:
            </label>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A9.002 9.002 0 0112 15c2.27 0 4.34.847 5.879 2.241M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c-1.105 0-2 .895-2 2v2a2 2 0 104 0v-2c0-1.105-.895-2-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 11V7a5 5 0 00-10 0v4"
                  />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-16 p-2 border border-gray-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <label className="inline-flex items-center mb-6">
              <input type="checkbox" className="mr-2" name="remember" />
              Remember me
            </label>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
              Log In
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default LoginForm;
