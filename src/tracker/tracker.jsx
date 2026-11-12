import React, { useState } from 'react';

function loadGoalTitles() {
  try {
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    return Array.isArray(goals)
      ? goals.map((goal) => goal.title).filter((title) => typeof title === 'string' && title.trim())
      : [];
  } catch {
    return [];
  }
}

export function Tracker() {
  const [goalTitles] = useState(loadGoalTitles);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [readingAmount, setReadingAmount] = useState('');
  const canAddReading = selectedGoal && Number(readingAmount) > 0;

  function addReading() {
    if (!canAddReading) return;

    try {
      const savedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
      if (!Array.isArray(savedGoals)) return;

      const selectedGoalIndex = savedGoals.findIndex((goal) => goal.title === selectedGoal);
      if (selectedGoalIndex === -1) return;

      const goal = savedGoals[selectedGoalIndex];
      const updatedProgress = (Number(goal.progress) || 0) + Number(readingAmount);
      const isComplete = updatedProgress >= Number(goal.target);
      const updatedGoals = isComplete
        ? savedGoals.filter((_, index) => index !== selectedGoalIndex)
        : savedGoals.map((goal, index) => (
          index === selectedGoalIndex ? { ...goal, progress: updatedProgress } : goal
        ));

      if (isComplete) {
        const savedRewards = JSON.parse(localStorage.getItem('rewards') || '[]');
        if (Array.isArray(savedRewards)) {
          const updatedRewards = savedRewards.map((reward) => (
            reward.goal === goal.title ? { ...reward, status: 'unlocked' } : reward
          ));
          localStorage.setItem('rewards', JSON.stringify(updatedRewards));
        }
      }

      localStorage.setItem('goals', JSON.stringify(updatedGoals));
      setSelectedGoal('');
      setReadingAmount('');
    } catch {
      // Leave the form values intact if saved goals cannot be updated.
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
                    {goalTitles.length === 0
                      ? <option value="">No goals available</option>
                      : <>
                          <option value="">Select a goal</option>
                          {goalTitles.map((title, index) => <option key={`${title}-${index}`} value={title}>{title}</option>)}
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
