import React, { useState } from 'react';
import { Goal } from './goal';
import { GoalRow } from './goalRow';

export function Goals({ userName }) {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');

  async function loadGoals() {
    return fetch('/api/goals')
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load goals: ${response.status}`);
        return response.json();
      })
      .then((data) => setGoals(data.map((goal) => new Goal(goal))))
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  React.useEffect(() => {
    loadGoals().catch(() => {});
  }, []);

  async function saveGoal(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newGoal = new Goal({
      title: formData.get('goal-title').trim(),
      progress: 0,
      target: Number(formData.get('goal-amount')),
      finishDate: formData.get('goal-date') || null,
      username: userName,
    });

    const response = await fetch('/api/goal', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newGoal),
    });
    if (!response.ok) throw new Error(`Could not save goal: ${response.status}`);
    await loadGoals();
  }

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
                    {goals.length === 0
                      ? <tr><td colSpan="4">No goals</td></tr>
                      : goals.map((goal, index) => <GoalRow goal={goal} key={`${goal.title}-${index}`} />)}
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
              <form className="row g-3" onSubmit={saveGoal}>
                <div className="col-md-6"><label htmlFor="goal-title" className="form-label fw-semibold">What do you want to read?</label><input className="form-control" id="goal-title" name="goal-title" placeholder="Finish The Hobbit" value={title} onChange={(event) => setTitle(event.target.value)} required /></div>
                <div className="col-md-6"><label htmlFor="goal-amount" className="form-label fw-semibold">Target amount of pages</label><input className="form-control" id="goal-amount" name="goal-amount" type="number" min="1" placeholder="310" value={target} onChange={(event) => setTarget(event.target.value)} required /></div>
                <div className="col-md-6"><label htmlFor="goal-date" className="form-label fw-semibold">Optional finish date</label><input className="form-control" id="goal-date" name="goal-date" type="date" /></div>
                <div className="col-12"><button className="btn btn-forest btn-lg" type="submit" disabled={!title.trim() || !target || Number(target) < 1}>Save goal</button></div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
