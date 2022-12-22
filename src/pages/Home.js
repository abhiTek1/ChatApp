import React from 'react';
import Chat from '../component/chat';
import Sidebar from '../component/Sidebar';
import './Home.css';
import '../component/Component.css'

const Home = () => {
  return (
    <div className='home'>
    <div className='container'>
        <Sidebar/>
        <Chat/>
    </div> 
    </div>
  )
}

export default Home;
