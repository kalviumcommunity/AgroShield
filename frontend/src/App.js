import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Form from './Components/Form';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Landingpage from './Components/Landingpage';

function App() {
  return (
    <div className="App">
      {/* <Landingpage/> */}
      {/* <Navbar/> */}
      {/* <Home/> */}
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Landingpage />} />
        <Route path='/home' element={<Navbar/>} />
        <Route path='/form' element={<Form/>} />
      </Routes>
      <Footer/>
      
    </div>
  );
}

export default App;
