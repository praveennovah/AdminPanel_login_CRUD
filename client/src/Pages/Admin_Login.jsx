import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin_Login.css'; 
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/Logo.png";

function Admin_Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formData.username) {
      errors.username = 'Username is required.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post("http://localhost:7000/admin/login", formData);

        if (response.data.success) {
          // Store the username in localStorage 
          localStorage.setItem('username', formData.username);
          onLogin();
          navigate("list");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="row-12 w-100 top-bar">
        <div className="col-12 d-flex justify-content-start align-items-start">
          <img src={logo} alt="Logo" className="mr-3 logo text-white" />
        </div>
        <div className="col-12 d-flex justify-content-center align-items-start text-white">
          <h1>Admin Login</h1>
        </div>
      </div>
      <div className="row-12 w-100 top-bar">
        <div className="col-12 d-flex justify-content-center  vh-100 top-bar">
          <form onSubmit={handleSubmit} noValidate className="w-50 text-white fw-bold fs-4 mt-5">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.username}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Admin_Login;
