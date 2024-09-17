
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroTitle from './components/HeroTitle';
import CustomCard from './components/CustomCard';
import { useEffect, useState } from 'react';
import MailIcon from './icons/MailIcon';





function App() {



  return (
    <>
    <div className='app'>
      <HeroTitle></HeroTitle>
      <div className='container'>
        <div className='cardContainer'>
          <CustomCard></CustomCard>
        </div>
      </div>
      
    </div>
    
    </>
    
  );
}

export default App;
