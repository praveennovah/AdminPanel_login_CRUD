import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './Pages/Admin_Login';
import Welcome_page from './Pages/Welcome_page';
import CreateEmployee from './Components/CreateEmployee';
import EmployeeList from './Components/EmployeeList';
import UpdateEmployee from './Components/UpdateEmployee';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <AdminLogin onLogin={handleLogin} />} />
        <Route path="/" element={isLoggedIn ? <Welcome_page onLogout={handleLogout} /> : <Navigate to="/login" />}>
          <Route path="create" element={<CreateEmployee />} />
          <Route path="list" element={<EmployeeList />} />
          <Route path="update/:id" element={<UpdateEmployee />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
