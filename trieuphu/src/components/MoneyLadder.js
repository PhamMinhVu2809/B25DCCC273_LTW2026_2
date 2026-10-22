import React from 'react';
import { MILESTONES, PRIZES, formatMoney } from '../data';

const MoneyLadder = ({ currentQuestion }) => (
  <aside className="money-ladder">
    <h3>Thang tiền thưởng</h3>
    <ol className="ladder-list">
      {PRIZES.map((prize, index) => {
        const questionNumber = PRIZES.length - index;
        const isMilestone = MILESTONES.includes(questionNumber);
        const isCurrent = currentQuestion === questionNumber;
        return (
          <li key={questionNumber} className={`ladder-item${isMilestone ? ' milestone' : ''}${isCurrent ? ' current' : ''}`}>
            <span>{questionNumber}</span><span>{formatMoney(prize)}</span>
          </li>
        );
      })}
    </ol>
  </aside>
);

export default MoneyLadder;
