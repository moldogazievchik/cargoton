import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './LoginForm.css';

const LoginForm = ({ onRegisterClick }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем наличие токена при загрузке компонента
    const token = localStorage.getItem('token');
    if (token) {
      // Если токен есть, перенаправляем пользователя на страницу профиля
      navigate('/profile');
    }
  }, [navigate]); // Пустой массив зависимостей для запуска useEffect только один раз при загрузке компонента

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/profile');
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error.message);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Электронная почта"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Пароль"
          required
        />
        <button type="submit">Войти</button>
      </form>
      <div className="register-text-container">
        <p>Ещё нет аккаунта? <button onClick={onRegisterClick}>Зарегистрируйтесь</button></p>
      </div>
    </div>
  );
};

export default LoginForm;