import React, { useState } from 'react';
import { Goal } from './goal';
import { GoalRow } from './goalRow';

// Keep the UI backed by goal-shaped data so this initializer can later be
// replaced with API-loaded goals without changing the progress display.
const localGoals = [
  new Goal({ title: 'Read The Hobbit', progress: 220, target: 310, finishDate: '2026-12-31' }),
  new Goal({ title: 'Read 3 books this month', progress: 1, target: 3, finishDate: '2026-11-30' }),
];

export function Goals() {
  const [goals, setGoals] = useState(localGoals);

  return (
    <main className="container goals-content py-5 flex-grow-1">
      <div className="mb-4">
        <p className="text-uppercase fw-semibold small text-forest mb-2">One page at a time</p>
        <h1 className="h2 fw-bold mb-0">Your reading goals</h1>
      </div>
      <div className="row g-4">
        <section className="col-12" aria-labelledby="active-goals-heading">
          <div className="goal-panel card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 id="active-goals-heading" className="h4 fw-bold mb-3">Active goals</h2>
              <div className="table-responsive">
                <table className="table align-middle goals-table mb-0">
                  <thead><tr><th scope="col">Goal</th><th scope="col">Progress</th><th scope="col">Finish date</th><th scope="col">Suggested pace</th></tr></thead>
                  <tbody>
                    {goals.map((goal) => <GoalRow goal={goal} key={goal.title} />)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <section className="col-12" aria-labelledby="new-goal-heading">
          <div className="goal-panel card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 id="new-goal-heading" className="h4 fw-bold mb-3">Set a new goal</h2>
              <form className="row g-3">
                <div className="col-md-6"><label htmlFor="goal-title" className="form-label fw-semibold">What do you want to read?</label><input className="form-control" id="goal-title" name="goal-title" placeholder="Finish The Hobbit" required /></div>
                <div className="col-md-6"><label htmlFor="goal-type" className="form-label fw-semibold">Measure progress by</label><select className="form-select" id="goal-type" name="goal-type"><option>Pages</option><option>Chapters</option><option>Books</option></select></div>
                <div className="col-md-6"><label htmlFor="goal-amount" className="form-label fw-semibold">Target amount</label><input className="form-control" id="goal-amount" name="goal-amount" type="number" min="1" placeholder="310" required /></div>
                <div className="col-md-6"><label htmlFor="goal-date" className="form-label fw-semibold">Optional finish date</label><input className="form-control" id="goal-date" name="goal-date" type="date" /></div>
                <div className="col-12"><button className="btn btn-forest btn-lg" type="button">Save goal</button></div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
