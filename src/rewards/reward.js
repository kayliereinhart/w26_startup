export class Reward {
  constructor({ goal, status = 'locked' }) {
    this.goal = goal;
    this.status = status;
  }
}
