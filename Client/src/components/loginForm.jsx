import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn }) => {
  //error state to throw out errors
  const [error, setError] = useState('');
  const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
      });
    
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  //handle api
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/user/login', loginForm);
      console.log(response.data); // Handle the response as needed

      // Redirect to '/todo' upon successful login
      setIsLoggedIn(true);
      navigate('/todo');
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Email or Password is invalid');
      }
    }
  };


  // Clear the error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

 

  return (
    <div className="container">
        <h2>Login</h2>
        
      <form onSubmit={handleLoginSubmit}>
         <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={handleLoginChange}
          required
        />
        </div>
        <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={handleLoginChange}
          required
        />
        </div>
        
       
        <button type="submit">
          Login
        </button>
        
      </form>
      {error && <p className='error'>{error}</p>}
      <p>Not Registered? <Link to="/">Register Here</Link></p>
    </div>
  )
}

export default LoginForm