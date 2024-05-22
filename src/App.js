import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Products from './components/pages/Products';
import Services from './components/pages/Services';
import Tracking from './components/pages/Tracking';
import Onlineform from './components/pages/OnlineForm';
import Contacts from './components/pages/Contacts';
import AboutUs from './components/pages/AboutUs';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Shipments from './components/Shipments';


function App() {
  return (
  <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={ <Home/> } />
        <Route path='/services' exact element={ <Services/> } />
        <Route path='/products' exact element={ <Products/> } />
        <Route path='/sign-up' exact element={ <SignUp/> } />
        <Route path='/tracking' exact element={ <Tracking/> } />
        <Route path='/onlineform' exact element={ <Onlineform/> } />
        <Route path='/contacts' exact element={ <Contacts/> } />
        <Route path='/aboutus' exact element={ <AboutUs/> } />
        <Route path='/profile' exact element={<Profile/>}/>
        <Route path='/shipments' exact element={<Shipments/>}/>

      </Routes>
      <Footer />
    </Router>
  </>
  );
}

export default App;
