import React from 'react';
export const AnswerButton = ({ letter, text, onClick, disabled, state, hidden, flashing }) => <button className={`answer ${state || ''} ${flashing ? 'flash' : ''}`} onClick={onClick} disabled={disabled || hidden}>{hidden ? '' : `${letter}. ${text}`}</button>;
