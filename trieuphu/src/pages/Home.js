import React from 'react';
import { formatMoney } from '../data';

const Home = ({ playerName, setPlayerName, onStart, loading, error, history }) => {
  const record = history.reduce((best, item) => (!best || item.prize > best.prize ? item : best), null);
  return (
    <section className="panel">
      <p className="question-meta" style={{ color: '#1e4ba8' }}>TH02 · MINI GAME</p>
      <h1>Ai là triệu phú?</h1>
      <p>Trả lời 15 câu hỏi về HTML, CSS, ES6 và React để chinh phục giải thưởng cao nhất.</p>
      {record && <p className="stat-card"><strong>Kỷ lục:</strong> {formatMoney(record.prize)} – {record.name}</p>}
      <h2>Luật chơi</h2>
      <ul className="rules-list">
        <li>Mỗi câu hỏi có 30 giây để trả lời.</li>
        <li>Trả lời đúng để tiến tới câu tiếp theo và nâng mức tiền thưởng.</li>
        <li>Câu 5, 10 và 15 là các mốc an toàn.</li>
        <li>Trả lời sai hoặc hết giờ sẽ nhận tiền ở mốc an toàn cao nhất đã vượt qua.</li>
        <li>Có quyền trợ giúp 50:50, Hỏi khán giả và Dừng cuộc chơi; mỗi trợ giúp chỉ dùng một lần.</li>
      </ul>
      <form onSubmit={(event) => { event.preventDefault(); onStart(); }}>
        <label className="field"><span>Tên người chơi</span><input value={playerName} onChange={(event) => setPlayerName(event.target.value)} placeholder="Nhập tên của bạn" maxLength="40" /></label>
        {error && <p className="error-text">Không tải được câu hỏi. Hãy tải lại trang để thử lại.</p>}
        <button className="primary-btn" type="submit" disabled={!playerName.trim() || loading || error}>{loading ? 'Đang tải câu hỏi...' : 'Bắt đầu'}</button>
      </form>
    </section>
  );
};

export default Home;
