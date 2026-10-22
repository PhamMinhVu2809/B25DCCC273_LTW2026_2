import React from 'react';
import { LETTERS } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({ question, questionIndex, status, selectedAnswer, onSelect, hiddenOptions = [] }) => (
  <section className="game-panel">
    <div className="question-meta">Câu {questionIndex + 1}/15</div>
    <h2 className="question-prompt">{question.question}</h2>
    <div className="answer-grid">
      {question.options.map((option, index) => (
        <AnswerButton
          key={`${question.id}-${index}`}
          letter={LETTERS[index]}
          option={option}
          optionIndex={index}
          correctAnswer={question.answer}
          selectedAnswer={selectedAnswer}
          status={status}
          hidden={hiddenOptions.includes(index)}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  </section>
);

export default QuestionCard;
