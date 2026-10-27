import React from 'react';

export function Tracker() {
  return (
    <main className="container page-content tracker-page flex-grow-1 py-5">
      <section className="tracker-intro mb-4 mb-xl-5" aria-labelledby="tracker-heading">
        <h2 id="tracker-heading" className="h2 fw-bold mb-2">Log today&rsquo;s reading</h2>
        <p className="fs-5 mb-0">Add your progress and keep your momentum going.</p>
      </section>
      <div className="row tracker-layout g-4 g-xl-5 align-items-stretch">
        <div className="col-lg-7">
          <section className="login-card card shadow-sm h-100" aria-labelledby="log-reading-heading">
            <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-center">
              <p className="text-uppercase fw-semibold small text-forest mb-2">Reading session</p>
              <h2 id="log-reading-heading" className="h3 fw-bold mb-4">Add to your tracker</h2>
              <form>
                <div className="mb-3">
                  <label for="reading-goal" className="form-label fw-semibold">Goal</label>
                  <select className="form-select form-select-lg" id="reading-goal" name="reading-goal">
                    <option>Read The Hobbit</option>
                    <option>Read 3 books this month</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label for="reading-date" className="form-label fw-semibold">Date</label>
                  <input className="form-control form-control-lg" id="reading-date" name="reading-date" type="date"></input>
                </div>
                <div className="mb-4">
                  <label for="reading-amount" className="form-label fw-semibold">Amount read</label>
                  <div className="input-group input-group-lg">
                    <input className="form-control tracker-form-control" id="reading-amount" name="reading-amount" type="number" min="1" placeholder="25"></input>
                    <select className="form-select tracker-form-control" name="reading-unit" aria-label="Reading unit">
                      <option>pages</option>
                      <option>chapters</option>
                      <option>books</option>
                    </select>
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn btn-forest btn-lg" type="button">Add reading</button>
                </div>
              </form>
            </div>
          </section>
        </div>

        <div className="col-lg-5 d-flex flex-column gap-4">
          <section className="hero-panel card border-0" aria-labelledby="recent-heading">
            <div className="card-body p-4 p-md-5">
              <p className="text-uppercase fw-semibold small text-forest mb-2">Your progress</p>
              <h2 id="recent-heading" className="h4 fw-bold mb-3">Recent reading</h2>
              <ul className="list-group list-group-flush bg-transparent">
                <li className="list-group-item bg-transparent border-forest">May 12 <span className="text-body-secondary">&middot; 25 pages</span></li>
                <li className="list-group-item bg-transparent border-forest">May 11 <span className="text-body-secondary">&middot; 18 pages</span></li>
                <li className="list-group-item bg-transparent border-forest">May 10 <span className="text-body-secondary">&middot; 22 pages</span></li>
              </ul>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}