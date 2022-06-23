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

function App(text) {
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
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
