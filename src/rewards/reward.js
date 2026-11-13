export class Reward {
  constructor({ goal, description = '', status = 'locked', username }) {
    this.goal = goal;
    this.description = description;
    this.status = status;
    this.username = username;
  }
}
