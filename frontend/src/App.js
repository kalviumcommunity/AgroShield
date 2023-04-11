import Home from './Components/Home';
import Footer from './Components/Footer';
import Form from './Components/Form';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landingpage from './Components/Landingpage';
import NoteState from './Context/NoteState';
import Data from './Components/Data';
import NotFoundPage from './Components/NotFoundpage';

function App() {
  return (
    <div className="App">
     <NoteState>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/' element={<Landingpage />} />
        <Route path='/form' element={<Form/>} />
        <Route path='/home/:id' element={<Data/>} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
     
      <Footer/>
      </NoteState>
      
      
    </div>
  );
}

export default App;
