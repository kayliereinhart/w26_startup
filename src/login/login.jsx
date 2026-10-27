import React from 'react';

export function Login() {
  return (
    <main className="container page-content d-flex flex-grow-1 align-items-center py-5">
      <div className="row g-4 g-xl-5 align-items-stretch w-100 mx-auto">
        <div className="col-lg-6 d-flex flex-column gap-4">
          <section className="hero-panel p-4 p-md-5" aria-labelledby="welcome-heading">
            <p className="text-uppercase fw-semibold small text-forest mb-2">Make time for a good story</p>
            <h1 id="welcome-heading" className="h2 fw-bold mb-3">A little reading goes a long way.</h1>
            <p className="fs-5 mb-0">Set reading goals, log your progress, and earn rewards that make reading feel even better.</p>
          </section>
          <aside className="quote-card card shadow-sm" aria-labelledby="quote-heading">
            <div className="card-body p-4 p-md-5">
              <div className="quote-accent border-start border-3 ps-3">
                <h2 id="quote-heading" className="quote-heading h6 text-uppercase fw-bold">Today's reading inspiration</h2>
                <span className="quote-mark" aria-hidden="true">&ldquo;</span>
                <blockquote className="fs-5 fst-italic mb-1">A reader lives a thousand lives before he dies.</blockquote>
                <p className="quote-attribution mb-0">&mdash; George R. R. Martin</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="col-lg-6">
          <section className="login-card card shadow-sm h-100" aria-labelledby="login-heading">
            <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-center">
              <p className="text-uppercase fw-semibold small text-forest mb-2">Welcome back</p>
              <h2 id="login-heading" className="h2 fw-bold mb-2">Sign in or join us</h2>
              <form>
                <div className="mb-3">
                  <label for="email" className="form-label fw-semibold">Email</label>
                  <input className="form-control form-control-lg" id="email" name="email" type="email" placeholder="reader@example.com" autocomplete="email" required></input>
                </div>
                <div className="mb-4">
                  <label for="password" className="form-label fw-semibold">Password</label>
                  <input className="form-control form-control-lg" id="password" name="password" type="password" placeholder="Enter your password" autocomplete="current-password" required></input>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-forest btn-lg" type="button">Sign in</button>
                  <button className="btn btn-outline-success btn-lg" type="button">Create account</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}