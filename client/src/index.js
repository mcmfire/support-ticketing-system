import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth';
import Panel from './pages/panel';
import Settings from './pages/settings';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='app'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/auth'/>} exact/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/panel' element={<Panel/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Routes>
    </BrowserRouter>
  </div>
);