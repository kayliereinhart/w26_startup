import React, { useState } from 'react';
import { Reward } from './reward';

const REWARDS_STORAGE_KEY = 'rewards';
const GOALS_STORAGE_KEY = 'goals';

function loadGoals() {
  try {
    const savedGoals = JSON.parse(localStorage.getItem(GOALS_STORAGE_KEY) || '[]');
    return Array.isArray(savedGoals) ? savedGoals : [];
  } catch {
    return [];
  }
}

export function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [goals] = useState(loadGoals);
  const [description, setDescription] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');

  async function loadRewards() {
      return fetch('/api/rewards')
        .then((response) => {
          if (!response.ok) throw new Error(`Could not load rewards: ${response.status}`);
          return response.json();
        })
        .then((data) => setRewards(data.map((reward) => new Reward(reward))))
        .catch((error) => {
          console.error(error);
          throw error;
        });
    }
  
    React.useEffect(() => {
      loadRewards().catch(() => {});
    }, []);

  function saveReward(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const reward = new Reward({
      goal: formData.get('reward-goal'),
      description: formData.get('reward-description').trim(),
    });
    const updatedRewards = [...rewards, reward];

    localStorage.setItem(REWARDS_STORAGE_KEY, JSON.stringify(updatedRewards));
    setRewards(updatedRewards);
    event.currentTarget.reset();
    setDescription('');
    setSelectedGoal('');
  }

  function markRewardEnjoyed(rewardIndex) {
    const updatedRewards = rewards.filter((_, index) => index !== rewardIndex);
    localStorage.setItem(REWARDS_STORAGE_KEY, JSON.stringify(updatedRewards));
    setRewards(updatedRewards);
  }

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
              <form className="row g-2" onSubmit={saveReward}>
                <div className="col-12">
                  <label htmlFor="reward-description" className="form-label fw-semibold">Reward description</label>
                  <input className="form-control" id="reward-description" name="reward-description" placeholder="Buy a new bookmark" value={description} onChange={(event) => setDescription(event.target.value)} required />
                </div>
                <div className="col-12">
                  <label htmlFor="reward-goal" className="form-label fw-semibold">Unlock when</label>
                  <select className="form-select" id="reward-goal" name="reward-goal" required disabled={goals.length === 0} value={selectedGoal} onChange={(event) => setSelectedGoal(event.target.value)}>
                    <option value="" disabled>Select a goal</option>
                    {goals.map((goal, index) => <option value={goal.title} key={`${goal.title}-${index}`}>{goal.title}</option>)}
                  </select>
                </div>
                <div className="col-12">
                  <button className="btn btn-forest btn-lg" type="submit" disabled={!description.trim() || !selectedGoal}>Save reward</button>
                  {goals.length === 0 && <p className="small text-body-secondary mt-2 mb-0">Create a goal before adding a reward.</p>}
                </div>
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
                {rewards.length === 0
                  ? <p className="mb-0">No rewards yet.</p>
                  : rewards.map((reward, index) => {
                    const unlocked = reward.status === 'unlocked';
                    return (
                      <article className="col-md-6" key={`${reward.goal}-${index}`}>
                        <div className={`reward-item${unlocked ? ' reward-unlocked' : ''} rounded-4 p-4 h-100`}>
                          <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                          <h3 className="h5 fw-bold mb-0">{reward.description}</h3>
                            <span className={`badge rounded-pill ${unlocked ? 'text-bg-success' : 'text-bg-secondary'}`}>
                              {unlocked ? 'Unlocked' : 'Locked'}
                            </span>
                          </div>
                          <p className="mb-0">{unlocked ? `Earned for completing “${reward.goal}.”` : `Unlock by completing “${reward.goal}.”`}</p>
                          {unlocked && (
                            <button className="btn btn-forest mt-3" type="button" onClick={() => markRewardEnjoyed(index)}>
                              Mark as enjoyed
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
