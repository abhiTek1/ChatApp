import React from 'react';
import BussinessLogin from "./pages/BussinessLogin";
import BussinessSignUp from "./pages/BussinessSignUp";
import Home from './pages/Home'
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         <Route path="/SignUp" element={<BussinessSignUp/>}/>
         <Route path="/Login" element={<BussinessLogin/>}/>
         <Route path="/" element={<Home/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
