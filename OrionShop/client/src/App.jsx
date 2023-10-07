import './App.scss';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage'
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={LandingPage}/>
        <Route path='/game/:id' Component={GamePage}/>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/signup' Component={SignupPage}/>
        <Route path='/account' Component={AccountPage}/>
        <Route path='/cart' Component={CartPage}/>
      </Routes>
    </div>
  );
}

export default App;
