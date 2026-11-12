export class Reward {
  constructor({ goal, description = '', status = 'locked' }) {
    this.goal = goal;
    this.description = description;
    this.status = status;
  }
}
