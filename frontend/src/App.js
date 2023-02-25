// import logo from './logo.svg';
// import Navbar from './Components/Navbar';
// import Footer from './Components/Footer';
import Home from './Components/Home';
import Form from './Components/Form';
import inputvalue from './Components/Navbar'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Startpage from './Components/Startpage';

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <Routes>
        <Route path='/home' element={<Home anmol={inputvalue} />} />
        <Route path='/form' element={<Form/>} />
        <Route path='/' element={<Startpage/>} />
      </Routes>
      {/* <Footer/> */}
      
    </div>
  );
}

export default App;
