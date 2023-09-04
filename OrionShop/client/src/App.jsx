import './App.scss';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Routes,Route } from 'react-router-dom';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={LandingPage}/>
        <Route path='/game/:id' Component={GamePage}/>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/signup' Component={SignupPage}/>
        <Route path='/account' Component={AccountPage}/>
      </Routes>
    </div>
  );
}

export default App;
