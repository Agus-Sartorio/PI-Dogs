import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import CreateDog  from './components/CreateDog/CreateDog';
import DogDetail from './components/DogDetail/DogDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/home/dog' element={<CreateDog/>}/>
        <Route path='/home/dogs/:id' element={<DogDetail/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
