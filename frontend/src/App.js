import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Form from './Components/Form';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Landingpage from './Components/Landingpage';
import Data from './Components/Data';

function App() {
  return (
    <div className="App">
      {/* <ImageCarousel/> */}
     <Navbar/>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        
        <Route path='/home' element={<></>} />
        <Route path='/form' element={<Form/>} />
        <Route path='/home/:id' element={<Data/>} />
      </Routes>
      <Footer/>
      
      
    </div>
  );
}

export default App;
