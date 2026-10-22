import React from 'react';
import { LETTERS } from '../data';

const AudienceChart = ({ percentages, correctAnswer }) => {
  if (!percentages) return null;
  return (
    <section className="audience-chart" aria-label="Kết quả hỏi khán giả">
      <strong>Ý kiến khán giả</strong>
      {percentages.map((percent, index) => (
        <div className="audience-row" key={LETTERS[index]}>
          <span>{LETTERS[index]}</span>
          <div className="audience-track"><div className={`audience-bar${index === correctAnswer ? ' correct-bar' : ''}`} style={{ width: `${percent}%` }} /></div>
          <span>{LETTERS[index]}: {percent}%</span>
        </div>
      ))}
    </section>
  );
};

export default AudienceChart;
