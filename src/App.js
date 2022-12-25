import React from 'react';
import BussinessLogin from "./pages/BussinessLogin";
import BussinessSignUp from "./pages/BussinessSignUp";
import Home from './pages/Home'
import { BrowserRouter, Route, Routes,Navigate  } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import LandingPage from './pages/LandingPage';
import './App.css';

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }

    return children
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage/>}/>
         <Route path="/SignUp" element={<BussinessSignUp/>}/>
         <Route path="/Login" element={<BussinessLogin/>}/>
         <Route path="/home" index element={
               <ProtectedRoute>
                <Home />
              </ProtectedRoute>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
