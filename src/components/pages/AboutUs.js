import React from 'react';
import CardItem from '../CardItem';
import '../Cards.css';
import './AboutUs.css'
import '../Footer.css'
// import Footer from '../Footer';

function AboutUs() {
  return (
    <div className='aboutus'>
      <h1>About Us</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/images/employees.jpg'
              text='Over 1000 dedicated professionals'
              label='Employees'
              path='/employees'
            />
            <CardItem
              src='/images/continents.jpg'
              text='North America, Europe, Asia, Australia'
              label='Continents'
              path='/continents'
            />
            <CardItem
              src='/images/vehicles.jpg'
              text='Trucks, Ships, Airplanes, Vans, Cranes'
              label='Vehicles'
              path='/vehicles'
            />
          </ul>
        </div>
      </div>
      <div className='aboutus-description'>
  <p>
    Компания Cargoton была основана в 2024 году и стала успешным участником сферы логистики. За время своего существования Cargoton прочно утвердилась на рынке благодаря высокому качеству предоставляемых услуг и инновационному подходу к логистике. Она обеспечивает широкий спектр услуг в области грузоперевозок, включая перевозку по всему миру с использованием различных видов транспорта, таких как грузовики, корабли, самолеты и другие.
  </p>
  <p>
    Основные характеристики компании Cargoton:
  </p>
  <ul>
    <li>Качество обслуживания: Cargoton стремится к высокому качеству обслуживания своих клиентов, предоставляя надежные и эффективные логистические решения.</li>
    <li>Глобальное присутствие: Компания охватывает множество регионов и стран, обеспечивая глобальную доступность для своих клиентов.</li>
    <li>Инновации: Cargoton активно внедряет новые технологии и инновационные подходы в свою работу, чтобы обеспечить более эффективные и экологически устойчивые решения.</li>
    <li>Профессионализм: Компания имеет команду высококвалифицированных специалистов, обладающих глубокими знаниями и опытом в области логистики.</li>
    <li>Устойчивое развитие: Cargoton стремится к устойчивому развитию, учитывая экологические аспекты и социальную ответственность в своей деятельности.</li>
  </ul>
  <p>
    Компания Cargoton продолжает развиваться и расширять свои возможности, чтобы удовлетворять потребности своих клиентов и оставаться лидером в сфере логистики.
  </p>
  </div>
</div>
  );

}
export default AboutUs;
