import './App.css';
import React from 'react';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import User from './Pages/User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Pages/Admin';

function App() {
  return (
    <Router>
     
      <div>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/User' element={<User/>} />
          <Route path='/SignUp' element={<SignUp/>} />
          <Route path='/Admin' element={<Admin/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
