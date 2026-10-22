import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const RESULT_MESSAGES = {
  win: 'Chúc mừng! Bạn đã trở thành triệu phú',
  wrong: 'Rất tiếc, bạn đã trả lời sai',
  timeout: 'Hết giờ!',
  stop: 'Bạn đã dừng cuộc chơi',
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;
  if (!result) return <Navigate to="/" replace />;

  return (
    <section className="panel">
      <p className="question-meta" style={{ color: '#1e4ba8' }}>KẾT QUẢ LƯỢT CHƠI</p>
      <h1>{RESULT_MESSAGES[result.reason] || 'Kết thúc lượt chơi'}</h1>
      <p>Người chơi: <strong>{result.name}</strong></p>
      <p>Số câu trả lời đúng: <strong>{result.correctCount}</strong></p>
      <p>Tiền thưởng</p><div className="result-prize">{formatMoney(result.prize)}</div>
      <div className="button-row">
        <button className="primary-btn" onClick={() => navigate('/play')}>Chơi lại</button>
        <button className="secondary-btn" onClick={() => navigate('/')}>Về trang chủ</button>
      </div>
    </section>
  );
};

export default Result;
