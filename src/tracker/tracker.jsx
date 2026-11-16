import React, { useState } from 'react';

export function Tracker() {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [readingAmount, setReadingAmount] = useState('');
  const canAddReading = selectedGoal && Number(readingAmount) > 0;

  React.useEffect(() => {
    fetch('/api/goals')
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load goals: ${response.status}`);
        return response.json();
      })
      .then((data) => setGoals(Array.isArray(data) ? data : []))
      .catch((error) => console.error(error));
  }, []);

  async function addReading() {
    if (!canAddReading) return;
    const goal = goals.find((savedGoal) => savedGoal._id === selectedGoal);
    if (!goal) return;

    try {
      const response = await fetch(`/api/goal/${encodeURIComponent(goal._id)}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ progress: (Number(goal.progress) || 0) + Number(readingAmount) }),
      });
      if (!response.ok) throw new Error(`Could not update goal: ${response.status}`);
      const updatedGoals = await response.json();
      setGoals(Array.isArray(updatedGoals) ? updatedGoals : []);
      setSelectedGoal('');
      setReadingAmount('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="container page-content tracker-page flex-grow-1 py-5">
      <section className="tracker-intro mb-4 mb-xl-5" aria-labelledby="tracker-heading">
        <h2 id="tracker-heading" className="h2 fw-bold mb-2">Log today&rsquo;s reading</h2>
        <p className="fs-5 mb-0">Add your progress and keep your momentum going.</p>
      </section>
      <div className="row tracker-layout g-4 g-xl-5 align-items-stretch">
        <div className="col-12">
          <section className="login-card card shadow-sm h-100" aria-labelledby="log-reading-heading">
            <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-center">
              <p className="text-uppercase fw-semibold small text-forest mb-2">Reading session</p>
              <h2 id="log-reading-heading" className="h3 fw-bold mb-4">Add to your tracker</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="reading-goal" className="form-label fw-semibold">Goal</label>
                  <select className="form-select form-select-lg" id="reading-goal" name="reading-goal" value={selectedGoal} onChange={(event) => setSelectedGoal(event.target.value)}>
                    {goals.length === 0
                      ? <option value="">No goals available</option>
                      : <>
                          <option value="">Select a goal</option>
                          {goals
                            .filter((goal) => typeof goal.title === 'string' && goal.title.trim())
                            .map((goal) => <option key={goal._id} value={goal._id}>{goal.title}</option>)}
                        </>}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="reading-amount" className="form-label fw-semibold">Pages read</label>
                  <div className="input-group input-group-lg">
                    <input className="form-control tracker-form-control" id="reading-amount" name="reading-amount" type="number" min="1" placeholder="25" value={readingAmount} onChange={(event) => setReadingAmount(event.target.value)}></input>
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn btn-forest btn-lg" type="button" disabled={!canAddReading} onClick={addReading}>Add reading</button>
                </div>
              </form>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}
