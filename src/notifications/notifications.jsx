import React, { useEffect, useState } from 'react';

export function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNotifications((currentNotifications) => [
        ...currentNotifications,
        { id: Date.now(), username: 'user', goal: 'goal' },
      ]);
    }, 10000);
    const timeoutId = setTimeout(() => clearInterval(intervalId), 60000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="container page-content d-flex flex-grow-1 align-items-center py-5">
      <div className="row g-4 g-xl-5 align-items-stretch w-100 mx-auto">
        <div className="col-lg-5 d-flex flex-column gap-4">
          <section className="celebrations-card p-4 p-md-5" aria-labelledby="celebrations-heading">
            <p className="text-uppercase fw-semibold small mb-2">Growing together, one page at a time</p>
            <h1 id="celebrations-heading" className="h2 mb-3">Reader celebrations</h1>
            <p className="celebrations-description fs-5 mb-0">See when fellow Page Turners reach a goal and share in the joy of a good book.</p>
          </section>
        </div>

        <div className="col-lg-7">
          <section className="login-card card shadow-sm h-100" aria-labelledby="feed-heading">
            <div className="card-body p-4 p-md-5">
              <p className="text-uppercase fw-semibold small text-forest mb-2">Your community</p>
              <h2 id="feed-heading" className="h2 fw-bold mb-4">Activity feed</h2>
              {notifications.map(({ id, username, goal }) => (
                <article className="notification-item rounded-4 p-4 mb-3" key={id}>
                  <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mb-2">
                    <h3 className="h5 fw-bold mb-0">{username} completed a goal!</h3>
                  </div>
                  <p className="mb-0">They completed <cite>{goal}</cite>.</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
