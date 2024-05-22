import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Shipments = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Получаем токен из локального хранилища
    const fetchShipments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/shipments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setShipments(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке отправок:', error.message);
      }
    };
  
    fetchShipments();
  }, []);

  return (
    <div>
      <h2>Мои отправки</h2>
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
            <th>Информация об отправителе</th>
            <th>Стоимость доставки</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.id}</td>
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
    </div>
  );
};

export default Shipments;
