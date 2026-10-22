import React from 'react';
export const Timer = ({ seconds }) => <div className={`timer ${seconds <= 10 ? 'low' : ''}`}>Còn {seconds} giây</div>;
