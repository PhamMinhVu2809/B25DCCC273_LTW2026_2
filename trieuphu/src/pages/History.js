import React from 'react';
import { formatMoney } from '../data';

const History = ({ history, onClearHistory }) => {
  const sortedHistory = [...history].sort((a, b) => b.prize - a.prize);
  const totalPrize = history.reduce((sum, item) => sum + item.prize, 0);
  const highestPrize = history.reduce((highest, item) => Math.max(highest, item.prize), 0);

  return (
    <section className="panel">
      <h1>Lịch sử các lượt chơi</h1>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">Số lượt chơi</div><div className="stat-value">{history.length}</div></div>
        <div className="stat-card"><div className="stat-label">Tiền thưởng cao nhất</div><div className="stat-value">{formatMoney(highestPrize)}</div></div>
        <div className="stat-card"><div className="stat-label">Tổng tiền thưởng</div><div className="stat-value">{formatMoney(totalPrize)}</div></div>
      </div>
      <div className="history-actions">
        <p className="muted" style={{ margin: 0 }}>Lượt chơi được sắp xếp theo tiền thưởng giảm dần.</p>
        <button className="danger-btn" disabled={history.length === 0} onClick={onClearHistory}>Xóa lịch sử</button>
      </div>
      {sortedHistory.length === 0 ? <p>Chưa có lượt chơi nào.</p> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Người chơi</th><th>Số câu đúng</th><th>Tiền thưởng</th><th>Thời gian</th></tr></thead>
            <tbody>{sortedHistory.map((item) => (
              <tr key={item.id}><td>{item.name}</td><td>{item.correctCount}</td><td>{formatMoney(item.prize)}</td><td>{item.playedAt}</td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default History;
