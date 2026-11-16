export class Reward {
  constructor({ _id, goalId, goalTitle = '', description = '', status = 'locked', username }) {
    this._id = _id;
    this.goalId = goalId;
    this.goalTitle = goalTitle;
    this.description = description;
    this.status = status;
    this.username = username;
  }
}
