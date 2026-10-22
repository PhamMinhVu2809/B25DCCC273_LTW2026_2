import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../data';

const QuestionBank = ({ questions, loading, error }) => {
  const [selectedLevel, setSelectedLevel] = useState('0');
  const [query, setQuery] = useState('');

  // Tên hàm bắt buộc theo đề bài.
  const handleQueryShift = (event) => setQuery(event.target.value);

  const filteredQuestions = useMemo(() => questions.filter((question) => {
    const matchesLevel = selectedLevel === '0' || question.level === Number(selectedLevel);
    const matchesQuery = question.question.toLocaleLowerCase('vi').includes(query.trim().toLocaleLowerCase('vi'));
    return matchesLevel && matchesQuery;
  }), [questions, selectedLevel, query]);

  if (loading) return <section className="panel"><p>Đang tải câu hỏi...</p></section>;
  if (error) return <section className="panel"><p className="error-text">Không tải được câu hỏi.</p></section>;

  return (
    <section className="panel">
      <h1>Ngân hàng câu hỏi</h1>
      <p className="muted">Tra cứu 15 câu hỏi kiến thức HTML, CSS, ES6 và React.</p>
      <div className="toolbar">
        <select aria-label="Lọc theo mức độ" value={selectedLevel} onChange={(event) => setSelectedLevel(event.target.value)}>
          <option value="0">Tất cả mức độ</option>
          <option value="1">Dễ</option>
          <option value="2">Trung bình</option>
          <option value="3">Khó</option>
        </select>
        <input type="search" value={query} onChange={handleQueryShift} placeholder="Tìm kiếm theo nội dung câu hỏi..." aria-label="Tìm kiếm câu hỏi" />
      </div>
      <p className="muted">Có {filteredQuestions.length} câu hỏi</p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>STT</th><th>Mức độ</th><th>Câu hỏi</th></tr></thead>
          <tbody>
            {filteredQuestions.map((question) => (
              <tr key={question.id}>
                <td>{question.id}</td><td>{LEVELS[question.level]}</td>
                <td><Link to={`/questions/${question.id}`}>{question.question}</Link></td>
              </tr>
            ))}
            {filteredQuestions.length === 0 && <tr><td colSpan="3">Không có câu hỏi phù hợp.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default QuestionBank;
