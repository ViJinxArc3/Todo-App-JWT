import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();

//Register new User
const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: ''
  });

const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/user/register', registerForm);
      console.log(response.data); // Handle the response as needed

      navigate('/login');
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  return (
    <div className="container">
    <h2>Register</h2>
    <form onSubmit={handleRegisterSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={registerForm.name}
          onChange={handleRegisterChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registerForm.email}
          onChange={handleRegisterChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerForm.password}
          onChange={handleRegisterChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>

    <p>Already registered? <Link to="/login">Login Here</Link></p>
  </div>
);
};

export default RegisterForm