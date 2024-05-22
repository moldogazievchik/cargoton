import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import './pages/SignUp.css';

const RegistrationForm = ({ onLoginClick }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    country: '',
    city: '',
    street: '',
    houseAndApartment: '',
    postalCode: '',
    hasCompany: false,
    companyName: '',
    companyType: '',
    inn: '',
    officialCompanyAddress: '',
    companyPhone: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
    captchaToken: '' // добавили поле для капчи
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleCaptchaChange = (token) => {
    setFormData({
      ...formData,
      captchaToken: token
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.captchaToken) {
      alert('Пожалуйста, пройдите проверку капчи.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data);
      alert('Вы успешно зарегистрированы!');
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error.message);
    }
  };
  

  return (
    <div className="registration-form-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Имя" required />
        <input type="text" className="form-input" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Фамилия" required />
        <input type="email" className="form-input" name="email" value={formData.email} onChange={handleChange} placeholder="Электронная почта" required />
        <input type="tel" className="form-input" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Номер телефона" required />
        <input type="date" className="form-input" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Дата рождения" required />

        <input type="text" className="form-input" name="country" value={formData.country} onChange={handleChange} placeholder="Страна" required />
        <input type="text" className="form-input" name="city" value={formData.city} onChange={handleChange} placeholder="Город" required />
        <input type="text" className="form-input" name="street" value={formData.street} onChange={handleChange} placeholder="Улица" required />
        <input type="text" className="form-input" name="houseAndApartment" value={formData.houseAndApartment} onChange={handleChange} placeholder="Дом и квартира" />
        <input type="text" className="form-input" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Почтовый индекс" required />

        <div className="form-checkbox-container">
          <label className="form-label">
            <input type="checkbox" className="form-checkbox" name="hasCompany" checked={formData.hasCompany} onChange={handleChange} />
            Есть ли у вас компания
          </label>
          {formData.hasCompany && (
            <div className="company-info-container">
              <input type="text" className="form-input" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Название компании" />
              <select className="form-input" name="companyType" value={formData.companyType} onChange={handleChange}>
                <option value="">Выберите тип компании</option>
                <option value="Физическое лицо">Физическое лицо</option>
                <option value="Юридическое лицо">Юридическое лицо</option>
              </select>
              <input type="text" className="form-input" name="inn" value={formData.inn} onChange={handleChange} placeholder="ИНН компании" />
              <input type="text" className="form-input" name="officialCompanyAddress" value={formData.officialCompanyAddress} onChange={handleChange} placeholder="Официальный адрес компании" />
              <input type="tel" className="form-input" name="companyPhone" value={formData.companyPhone} onChange={handleChange} placeholder="Телефон компании" />
            </div>
          )}
        </div>

        <input type="password" className="form-input" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" required />
        <input type="password" className="form-input" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Подтвердите пароль" required />

        <label className="form-label">
          <input type="checkbox" className="form-checkbox" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} required />
          Согласен с условиями использования
        </label>

        <ReCAPTCHA
          sitekey="6LenJuEpAAAAANdXBQTAGesldsg7hmu2UrDTsgXh" // Замените на ваш реальный Site Key
          onChange={handleCaptchaChange}
        />

        <button type="submit" className="form-button">Зарегистрироваться</button>
      </form>
      <div className="login-text-container">
        <p>Уже есть аккаунт? <button onClick={onLoginClick}>Войти</button></p>
      </div>
    </div>
  );
};

export default RegistrationForm;
