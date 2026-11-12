import React from 'react';

const SHELF_BOOK_COUNT = 10;

export function GoalRow({ goal }) {
  const percentage = goal.progressPercent;
  const completedBooks = Math.round((percentage / 100) * SHELF_BOOK_COUNT);
  const pace = goal.suggestedPace();
  const finishDate = new Date(`${goal.finishDate}T00:00:00`);

  return (
    <tr>
      <td>{goal.title}</td>
      <td>
        <div
          className="book-shelf"
          role="progressbar"
          aria-label={`${goal.title} progress`}
          aria-valuenow={Math.round(percentage)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {Array.from({ length: SHELF_BOOK_COUNT }, (_, index) => (
            <span
              className={`shelf-book${index < completedBooks ? ' shelf-book-complete' : ''}`}
              key={index}
            />
          ))}
        </div>
        <span className="visually-hidden">{Math.round(percentage)}% complete.</span>
        {goal.progress} of {goal.target}<br />
        You are {Math.round(percentage)}% complete.
      </td>
      <td>{finishDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</td>
      <td>{pace.toLocaleString(undefined, { maximumFractionDigits: 1 })} pages per day</td>
    </tr>
  );
}
