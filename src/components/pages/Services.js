// import React from "react";
import React, { useState, useEffect } from 'react';
import '../../App.css';
import './Services.css';
// import { Link } from 'react-router-dom';
import { FaClock, FaShieldAlt, FaRoad, FaTruckLoading } from 'react-icons/fa';
import { Button } from '../Button';

export default function Services() {

  const [button, setButton] = useState(true)

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <div>
      <div className="services__container">
        <h1>Services</h1>
          <div className="services__description">
            <p>
            Welcome to Cargoton, your trusted partner in logistics solutions. 
            We offer an extensive array of services meticulously crafted to cater to your diverse logistical requirements. 
            Our services are meticulously designed to deliver:
            </p>
            
              <div className="services__features">
                <div className="services__feature">
                  <FaClock className="services__icon" />
                    <p>Speed</p>
                </div>
              <div className="services__feature">
                  <FaShieldAlt className="services__icon" />
                    <p>Safety</p>
              </div>
              <div className="services__feature">
                  <FaRoad className="services__icon" />
                    <p>No Barriers</p>
              </div>
              <div className="services__feature">
                  <FaTruckLoading className="services__icon" />
                    <p>Volume</p>
              </div>
            </div>
          <div className="services__wrapper">
  <div className="services__item">
    <h2>Грузоперевозки по всему миру </h2>
    <p>Наша компания предлагает полный спектр услуг, как в средней Азии, так и по всему миру.</p>
    {button && <Button buttonStyle='btn--outline btn-mobile'>Подробнее</Button>}
  </div>
  <div className="services__item">
    <h2>Консультация и аутсортинг</h2>
    <p>Рады предложить вам новую услугу: логистика на аутсортинге для торговых компаний.</p>
    {button && <Button buttonStyle='btn--outline btn-mobile'>Подробнее</Button>}
  </div>
  <div className="services__item">
    <h2>Таможенное оформление</h2>
    <p>Правильная последовательность действий обеспечит успешное и быстрое прохождение таможенного контроля.</p>
    {/* <Link to="/onlineform" className="services__link">Подробнее</Link> */}
    {button && <Button 
    buttonStyle='btn--outline btn-mobile' >
      Подробнее
    </Button>}
  </div>
</div>
        </div>
        </div>
      </div>
  );
}
