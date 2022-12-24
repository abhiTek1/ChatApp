import React from 'react';
import BussinessLogin from "./pages/BussinessLogin";
import BussinessSignUp from "./pages/BussinessSignUp";
import Home from './pages/Home'
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<LandingPage/>}/>
         <Route path="/SignUp" element={<BussinessSignUp/>}/>
         <Route path="/Login" element={<BussinessLogin/>}/>
         <Route path="/home" element={<Home/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
