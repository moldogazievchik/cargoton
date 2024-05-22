import React, { useState, useEffect } from 'react';
import LoginForm from '../LoginForm';
import RegistrationForm from '../RegistrationForm';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/profile', {
            headers: { Authorization: `Bearer ${token} `},
          });
          if (response.status === 200) {
            // Если пользователь авторизован
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Ошибка при проверке авторизации:', error.message);
      }
    };

    checkAuth();
  }, []);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  if (isAuthenticated) {
    return <div>Вы уже авторизованы. Перейдите в ваш профиль.</div>;
  }

  return (
    <div className="sign-up">
      {showLoginForm ? (
        <>
          <LoginForm onRegisterClick={toggleForm} /> {/* Передаем функцию toggleForm */}
        </>
      ) : (
        <>
          <RegistrationForm onLoginClick={toggleForm} /> {/* Передаем функцию toggleForm */}
        </>
      )}
    </div>
  );
};

export default SignUp;