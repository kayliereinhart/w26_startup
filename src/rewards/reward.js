export class Reward {
  constructor({ _id, goal, description = '', status = 'locked', username }) {
    this._id = _id;
    this.goal = goal;
    this.description = description;
    this.status = status;
    this.username = username;
  }
}
