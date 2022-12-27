import React from 'react';
import Chat from '../component/chat';
import Sidebar from '../component/Sidebar';
import './Home.css';

import Navbar from '../component/Navbar';


const Home = () => {
  return (
    <div className='home'>
    <Navbar/>
    <div className='home-container'>
        <Sidebar/>
        <Chat/>
        {/* <View/> */}
    </div> 
    </div>
  )
}

export default Home;