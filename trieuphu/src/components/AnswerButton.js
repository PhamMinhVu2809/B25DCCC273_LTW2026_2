import React from 'react';

const AnswerButton = ({ letter, option, optionIndex, correctAnswer, selectedAnswer, status, hidden = false, onClick }) => {
  const isSelected = selectedAnswer === optionIndex;
  let stateClass = '';
  if (status === 'locked' && isSelected) stateClass = 'selected';
  if (status === 'revealed') {
    if (optionIndex === correctAnswer) stateClass = 'correct';
    else if (isSelected) stateClass = 'wrong';
  }
  return (
    <button type="button" className={`answer-btn ${stateClass}${hidden ? ' hidden' : ''}`} disabled={status !== 'answering' || hidden} onClick={onClick} aria-label={hidden ? `Đáp án ${letter} đã ẩn` : `Đáp án ${letter}: ${option}`}>
      {hidden ? '' : `${letter}. ${option}`}
    </button>
  );
};

export default AnswerButton;
