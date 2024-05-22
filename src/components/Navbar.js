import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faTruck } from '@fortawesome/free-solid-svg-icons';

import './Navbar.css';
import { Button } from './Button';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to="/" className='navbar-logo' onClick={closeMobileMenu}> 
            Cargo <FontAwesomeIcon icon={faTruck} />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <FontAwesomeIcon icon={click ? faTimes : faBars} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Главная
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/aboutus' className='nav-links' onClick={closeMobileMenu}>
                О нас
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                Услуги
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/tracking' className='nav-links' onClick={closeMobileMenu}>
                Трекинг
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link to='/onlineform' className='nav-links' onClick={closeMobileMenu}>
                Форма онлайн записи
              </Link>
            </li> */}
            <li className='nav-item'>
              <Link to='/contacts' className='nav-links' onClick={closeMobileMenu}>
                Контакты
              </Link>
            </li>
            <li>
              {/* <Link 
              to='/sign-up' 
              className='nav-links-mobile' 
              onClick={closeMobileMenu}
              >
                Профиль
              </Link> */}
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>Профиль</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
