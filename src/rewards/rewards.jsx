import React from 'react';

export function Rewards() {
  return (
    <main className="container page-content flex-grow-1 py-5">
      <section className="mb-4" aria-labelledby="rewards-heading">
        <p className="text-uppercase fw-semibold small text-forest mb-2">A little motivation goes a long way</p>
        <h1 id="rewards-heading" className="h2 fw-bold mb-0">Your reading rewards</h1>
      </section>
      <div className="row g-4 g-xl-5 align-items-stretch">
        <div className="col-lg-5">
          <section className="reward-intro p-4 p-md-5 h-100" aria-labelledby="reward-idea-heading">
            <p className="text-uppercase fw-semibold small mb-2">Celebrate every chapter</p>
            <h2 id="reward-idea-heading" className="h3 fw-bold mb-3">Make your next reading goal feel special.</h2>
            <p className="fs-5 mb-0">Choose a treat to look forward to, then enjoy it when you reach your goal.</p>
          </section>
        </div>
        <div className="col-lg-7">
          <section className="goal-panel reward-form-card card shadow-sm h-100" aria-labelledby="new-reward-heading">
            <div className="card-body p-4 p-md-4">
              <p className="text-uppercase fw-semibold small text-forest mb-2">A treat for your future self</p>
              <h2 id="new-reward-heading" className="h4 fw-bold mb-3">Add a personal reward</h2>
              <form className="row g-2">
                <div className="col-12">
                  <label for="reward-name" className="form-label fw-semibold">Reward</label>
                  <input className="form-control" id="reward-name" name="reward-name" placeholder="Buy a new bookmark" required></input>
                </div>
                <div className="col-12">
                  <label for="reward-goal" className="form-label fw-semibold">Unlock when</label>
                  <select className="form-select" id="reward-goal" name="reward-goal">
                    <option>Read The Hobbit</option>
                    <option>Read 3 books this month</option>
                  </select>
                </div>
                <div className="col-12"><button className="btn btn-forest btn-lg" type="button">Save reward</button></div>
              </form>
            </div>
          </section>
        </div>
        <div className="col-12">
          <section className="goal-panel card shadow-sm" aria-labelledby="reward-list-heading">
            <div className="card-body p-4 p-md-5">
              <p className="text-uppercase fw-semibold small text-forest mb-2">Your milestones</p>
              <h2 id="reward-list-heading" className="h4 fw-bold mb-4">Reward shelf</h2>
              <div className="row g-3">
                <article className="col-md-6">
                  <div className="reward-item rounded-4 p-4 h-100">
                    <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                      <h3 className="h5 fw-bold mb-0">New bookmark</h3>
                      <span className="badge rounded-pill text-bg-secondary">Locked</span>
                    </div>
                    <p className="mb-2">Unlock by completing “Read The Hobbit.”</p>
                    <p className="small text-body-secondary mb-0">190 pages to go</p>
                  </div>
                </article>
                <article className="col-md-6">
                  <div className="reward-item reward-unlocked rounded-4 p-4 h-100">
                    <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                      <h3 className="h5 fw-bold mb-0">Visit my favorite bookstore</h3>
                      <span className="badge rounded-pill text-bg-success">Unlocked</span>
                    </div>
                    <p className="mb-3">Earned for completing your April reading goal.</p>
                    <button className="btn btn-outline-success" type="button">Mark as enjoyed</button>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}