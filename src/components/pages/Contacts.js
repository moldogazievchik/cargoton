import React, { useState } from 'react';
import './Contacts.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Здесь вы можете отправить сообщение на сервер для обработки
      // Например, с помощью fetch или Axios
      // После успешной отправки сообщения, вы можете выполнить дополнительные действия, например, очистить форму или показать уведомление об успешной отправке
      console.log('Сообщение отправлено:', formData);
      alert('Сообщение успешно отправлено!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: ''
      });
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      alert('Ошибка при отправке сообщения. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className="contacts">
      <div className="form-container">
        <div className="title-container">
          <h1>Contact Us</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Имя"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Фамилия"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Телефон"
              required
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Введите ваше сообщение..."
            required
          />
          <button type="submit">Отправить</button>
        </form>
      </div>
      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.2676702616263!2d74.58411531191182!3d42.84608097103158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec9dbdc3d4eef%3A0x6a75a5244d9c79f8!2sI.%20Razzakov%20Kyrgyz%20State%20Polytechnic%20University!5e0!3m2!1sen!2skg!4v1711877709231!5m2!1sen!2skg" 
          width="600" 
          height="450" 
          style={{ border: "0" }}
          allowFullScreen="true"
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps">
        </iframe>
      </div>
    </div>
  );
};

export default Contacts;
