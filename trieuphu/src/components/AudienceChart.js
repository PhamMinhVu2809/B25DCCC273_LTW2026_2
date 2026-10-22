import React from 'react';
import { LETTERS } from '../data';
export const AudienceChart = ({ percentages }) => !percentages ? null : <div className="panel"><h3>Ý kiến khán giả</h3><div className="audience">{percentages.map((value, i) => <div className="aud-col" key={LETTERS[i]}><div className="aud-bar" style={{height:`${value}%`}}>{value}%</div><strong>{LETTERS[i]}</strong></div>)}</div></div>;
