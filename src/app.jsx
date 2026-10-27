import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Goals } from './goals/goals';
import { Notifications } from './notifications/notifications';
import { Rewards } from './rewards/rewards';
import { Tracker } from './tracker/tracker';

export default function App() {
  return (
  <BrowserRouter>
  <div>
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container py-2">
          <a className="navbar-brand fw-bold fs-3 d-flex align-items-center gap-3" href="index.html">
            <img src="bookstack.jpg" alt="" className="brand-image rounded" width="72" height="54"></img>
            <h1>Page Turners</h1>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto gap-lg-2">
              <li className="nav-item"><NavLink className='nav-link' to=''>Login</NavLink></li>
              <li className="nav-item"><NavLink className='nav-link' to='goals'>Goals</NavLink></li>
              <li className="nav-item"><NavLink className='nav-link' to='tracker'>Reading Tracker</NavLink></li>
              <li className="nav-item"><NavLink className='nav-link' to='notifications'>Notifications</NavLink></li>
              <li className="nav-item"><NavLink className='nav-link' to='rewards'>Rewards</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <Routes>
      <Route path='/' element={<Login />} exact />
      <Route path='/goals' element={<Goals />} />
      <Route path='/tracker' element={<Tracker />} />
      <Route path='/notifications' element={<Notifications />} />
      <Route path='/rewards' element={<Rewards />} />
      <Route path='*' element={<NotFound />} />
    </Routes>

    <footer className="footer text-white-50 py-3 mt-auto">
      <div className="container text-center small">Created by Kaylie Reinhart · <a className="link-light" href="https://github.com/kayliereinhart/w26_startup">GitHub repository</a></div>
    </footer>
  </div>
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}