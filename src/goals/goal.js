export class Goal {
  constructor({ title, progress, target, finishDate }) {
    this.title = title;
    this.progress = progress;
    this.target = target;
    this.finishDate = finishDate;
  }

  get progressPercent() {
    if (this.target <= 0) return 0;
    return Math.min(100, Math.max(0, (this.progress / this.target) * 100));
  }

  suggestedPace(currentDate = new Date()) {
    const remaining = Math.max(0, this.target - this.progress);
    if (remaining === 0 || !this.finishDate) return 0;

    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);
    const finish = new Date(`${this.finishDate}T00:00:00`);
    const days = Math.max(1, Math.ceil((finish - today) / (1000 * 60 * 60 * 24)));
    return remaining / days;
  }
}
