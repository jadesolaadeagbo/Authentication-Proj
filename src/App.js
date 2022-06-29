import './App.css';
import Nav from './Nav'
import Main from "./Main"
import Verify from './routes/verify/Verify'
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from './routes/register/Register';
import Products from './routes/products/Products';

function App(text) {
  // eslint-disable-next-line 
  const [src, setSrc] = useState('');

  useEffect(() => {
    QRCode.toDataURL(text).then((data) => {
      setSrc(data);
    })
  }, [])
  return (
    <Router>
    <div className="App">
      <div className="nav">
        <Nav/>
      </div>
      <div className="display">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/products/:id" element={<Products />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
