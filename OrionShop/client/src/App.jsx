import './App.scss';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={LandingPage}/>
        <Route path='/:id' Component={GamePage}/>
      </Routes>
    </div>
  );
}

export default App;
