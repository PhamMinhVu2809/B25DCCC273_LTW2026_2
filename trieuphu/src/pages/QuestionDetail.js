import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LETTERS, LEVELS } from '../data';

const QuestionDetail = ({ questions, loading, error }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = questions.find((item) => item.id === Number(id));

  if (loading) return <section className="panel"><p>Đang tải câu hỏi...</p></section>;
  if (error) return <section className="panel"><p className="error-text">Không tải được câu hỏi.</p></section>;
  if (!question) {
    return <section className="panel"><h1>Không tìm thấy câu hỏi</h1><button className="secondary-btn" onClick={() => navigate(-1)}>Quay lại</button></section>;
  }

  return (
    <section className="panel">
      <h1>Câu hỏi số {question.id} ({LEVELS[question.level]})</h1>
      <p>{question.question}</p>
      <ol type="A">
        {question.options.map((option, index) => (
          <li key={`${question.id}-${index}`} className={index === question.answer ? 'correct-answer' : ''} style={{ padding: '10px 12px', margin: '7px 0', borderRadius: 8 }}>
            {option}{index === question.answer ? ' (Đáp án đúng)' : ''}
          </li>
        ))}
      </ol>
      <button className="secondary-btn" onClick={() => navigate(-1)}>Quay lại</button>
    </section>
  );
};

export default QuestionDetail;
