import React from 'react';
const Timer = ({ secondsLeft }) => <div className={`timer${secondsLeft <= 10 ? ' low' : ''}`} aria-live="polite">⏱ Còn {secondsLeft} giây</div>;
export default Timer;
