import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userShipments, setUserShipments] = useState([]);
  const [showShipments, setShowShipments] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/sign-up'); // Перенаправление на страницу входа если токен отсутствует
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных профиля:', error.message);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/sign-up'); // Перенаправление на страницу входа если токен невалиден
        }
      }
    };
  
    fetchProfileData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      localStorage.removeItem('token');
      navigate('/sign-up');
    } catch (error) {
      console.error('Ошибка при выходе из профиля:', error.message);
    }
  };

  const toggleShipments = async () => {
    if (!showShipments) {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/sign-up');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/shipments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserShipments(response.data);
        setShowShipments(true);
      } catch (error) {
        console.error('Ошибка при загрузке данных о доставках:', error.message);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/sign-up');
        }
      }
    } else {
      setShowShipments(false);
    }
  };

  return (
    <div className="profile-container"> 
      <h2>Профиль</h2>
      {userData ? (
        <div className="profile-content">
           <p>Имя: {userData.first_name}</p>
           <p>Фамилия: {userData.last_name}</p>
           <p>Email: {userData.email}</p>
           <p>Телефон: {userData.phone_number}</p>
           <p>Дата рождения: {userData.date_of_birth}</p>
           <p>Страна: {userData.country}</p>
           <p>Город: {userData.city}</p>
           <p>Улица: {userData.street}</p>
           <p>Дом и квартира: {userData.house_and_apartment}</p>
           <p>Почтовый индекс: {userData.postal_code}</p>
           {userData.hascompany && (
             <>
               <p>Название компании: {userData.company_name}</p>
               <p>Тип компании: {userData.company_type}</p>
               <p>ИНН: {userData.inn}</p>
               <p>Официальный адрес компании: {userData.official_company_address}</p>
               <p>Телефон компании: {userData.company_phone}</p>
             </>
           )}
          <button onClick={toggleShipments}>
            {showShipments ? 'Скрыть мои отправки и доставки' : 'Мои отправки и доставки'}
          </button>
          {showShipments && (
            <div className="shipments-table">
              {userShipments.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>ID отправки</th>
                      <th>Дата отправки</th>
                      <th>Место отправления</th>
                      <th>Место назначения</th>
                      <th>Статус отправки</th>
                      <th>Тип груза</th>
                      <th>Вес груза</th>
                      <th>Информация о получателе</th>
                      <th>Информация о отправителе</th>
                      <th>Стоимость доставки</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userShipments.map((shipment, index) => (
                      <tr key={index}>
                        <td>{shipment.shipment_id}</td>
                        <td>{shipment.shipment_date}</td>
                        <td>{shipment.sender_location}</td>
                        <td>{shipment.destination_location}</td>
                        <td>{shipment.shipment_status}</td>
                        <td>{shipment.cargo_type}</td>
                        <td>{shipment.cargo_weight}</td>
                        <td>{shipment.recipient_info.name}, {shipment.recipient_info.phone}, {shipment.recipient_info.address}, Паспорт: {shipment.recipient_info.passport_number}</td>
                        <td>{shipment.sender_info.name}, {shipment.sender_info.phone}, {shipment.sender_info.address}, Паспорт: {shipment.sender_info.passport_number}</td>
                        <td>{shipment.delivery_cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>У вас пока нет отправок и доставок.</p>
              )}
            </div>
          )}
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <p>Загрузка данных профиля...</p>
      )}
    </div>
  );
};

export default Profile;
