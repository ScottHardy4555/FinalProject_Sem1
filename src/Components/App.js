/* eslint-disable react-hooks/exhaustive-deps */

// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WeaponManager from './WeaponManager';
import Home from './Home';
import Spar from './Spar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <header className="container w-100 mx-0">
          <nav className="navbar navbar-expand navbar-light bg-light w-100">
            <div>
              <ul className="navbar-nav">
                <li id="nav-home" className="nav-item">
                  <Link to='/'>Home</Link>
                </li>
                <li id="nav-manager" className="nav-item">
                  <Link to="/manager">Armory</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/spar" element={<Spar />}></Route>
            <Route exact path="/manager" element={<WeaponManager />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
