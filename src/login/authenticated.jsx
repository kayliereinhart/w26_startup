import React from 'react';
import { AuthState } from './authState';

export function Authenticated({ userName, onLogout }) {
  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        onLogout();
      });
  }

  return (
    <main className="container page-content d-flex flex-grow-1 align-items-center py-5">
      <section className="hero-panel p-4 p-md-5 w-100" aria-labelledby="welcome-heading">
        <p className="text-uppercase fw-semibold small text-forest mb-2">Make time for a good story</p>
        <h1 id="welcome-heading" className="h2 fw-bold mb-3">
          {userName ? `Welcome back, ${userName}.` : 'Welcome back, reader.'}
        </h1>
        <p className="fs-5 mb-0">Set reading goals, log your progress, and earn rewards that make reading feel even better.</p>
        <button
          className="btn btn-outline-success mt-4 align-self-start"
          type="button"
          onClick={() => logout()}
        >
          Log out
        </button>
      </section>
    </main>
  );
}
