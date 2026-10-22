import React from 'react';
import { PRIZES, MILESTONES, formatMoney } from '../data';
export const MoneyLadder = ({ questionIndex }) => <section className="panel"><h3>Tiền thưởng</h3><ol className="money-list">{PRIZES.map((prize, i) => { const n = i + 1; return <li key={prize} className={`${questionIndex === i ? 'current' : ''} ${MILESTONES.includes(n) ? 'milestone' : ''}`}>{n}. {formatMoney(prize)}</li>; }).reverse()}</ol></section>;
