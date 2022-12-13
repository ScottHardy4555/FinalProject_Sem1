import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Header from './Components/Header';
import Footer from './Components/Footer';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='wrapper w-100 min-vh-100'>
      {/* <Header /> */}
        <App />
      <Footer />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
