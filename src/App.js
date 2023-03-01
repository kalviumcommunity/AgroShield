// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './Components/Navbar/Nav';
import Form from './Form/Form';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <>
      
      
      <Routes>
          <Route path="/" element={<Navbar/>} />
         <Route path="/form" element={<Form/>} />
          {/* <Route path="/2" element={<Forms />} />  */}
      </Routes>

    </>
  );
}

export default App;
