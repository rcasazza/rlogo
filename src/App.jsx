import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'; // ✅ Create this if you haven't

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      {/* Optional: redirect unknown routes to login */}
      <Route path="*" element={<LoginForm />} />
    </Routes>
  );
};

export default App;
