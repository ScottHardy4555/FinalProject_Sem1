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
    <div className="">
      <WeaponManager/>
      {/* <BrowserRouter>
        <header className="container mx-0 align-self-center">
          <nav className="navbar navbar-expand navbar-light bg-light w-100 text-center">
            <div className="navbar-nav d-flex flex-row justify-content-around w-100">
              <div id="nav-home" className="nav-item">
                <Link to="/">Home</Link>
              </div>
              <div id="nav-manager" className="nav-item">
                <Link to="/manager">Armory</Link>
              </div>
              <div id="nav-spar" className="nav-item">
                <Link to="/spar">Sparring Ring</Link>
              </div>
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
      </BrowserRouter> */}
    </div>
  );
}

export default App;
