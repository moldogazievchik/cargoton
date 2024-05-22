import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Dstination! </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'> 
            <CardItem 
              src="/images/img-1.jpg"
              text="Shipping via Air"
              label="AIR FREIGHT"
              path='/services'
            />
            <CardItem 
              src="/images/ship.jpg"
              text="Shipping via Ship"
              label="AIR FREIGHT"
              path='/tracking'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='/images/truck.jpg'
              text='Shipping via Truck'
              label='Mystery'
              path='/onlineform'
            />
            <CardItem
              src='/images/train.jpg'
              text='Shipping via Train'
              label='Adventure'
              path='/onlineform'
            />
            <CardItem
              src='/images/img-8.jpg'
              text='We can deliver cargo across the desert'
              label='Adrenaline'
              path='/onlineform'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards
