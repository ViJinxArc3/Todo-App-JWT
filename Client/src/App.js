import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//Import components
import RegisterForm from './components/registerForm'
import LoginForm from './components/loginForm'
import TodoPage from './components/todoPage';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route
            path="/login"
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/todo" element={isLoggedIn ? <TodoPage /> : <Navigate to="/login" />} />
       </Routes>
      </Router>
    </div>
  )
}

export default App