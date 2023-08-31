import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth/index';
import Panel from './pages/panel/index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to='/auth'/>} exact/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/panel' element={<Panel/>}/>
    </Routes>
  </BrowserRouter>
);