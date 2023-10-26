import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './style.css';

const Auth = React.lazy(() => import('./pages/auth'));
const Panel = React.lazy(() => import('./pages/panel'));
const Settings = React.lazy(() => import('./pages/settings'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='app'>
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path='/' element={<Navigate to='/auth'/>} exact/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/panel' element={<Panel/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </div>
);