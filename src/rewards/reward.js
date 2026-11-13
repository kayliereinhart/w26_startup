export class Reward {
  constructor({ id = globalThis.crypto.randomUUID(), goal, description = '', status = 'locked', username }) {
    this.id = id;
    this.goal = goal;
    this.description = description;
    this.status = status;
    this.username = username;
  }
}
