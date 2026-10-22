import React from 'react';

const Lifelines = ({ used, status, onFiftyFifty, onAudience, onStop }) => (
  <div className="lifelines" aria-label="Quyền trợ giúp">
    <button className="secondary-btn" disabled={used.fifty || status !== 'answering'} onClick={onFiftyFifty}>50:50{used.fifty ? ' (đã dùng)' : ''}</button>
    <button className="secondary-btn" disabled={used.audience || status !== 'answering'} onClick={onAudience}>Hỏi khán giả{used.audience ? ' (đã dùng)' : ''}</button>
    <button className="danger-btn" disabled={status !== 'answering'} onClick={onStop}>Dừng cuộc chơi</button>
  </div>
);

export default Lifelines;
