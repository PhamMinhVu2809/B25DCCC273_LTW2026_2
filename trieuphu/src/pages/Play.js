import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import MoneyLadder from '../components/MoneyLadder';
import { TIME_PER_QUESTION } from '../data';
import { calcPrize } from '../utils';

const Play = ({ questions, loading, error, playerName }) => {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [status, setStatus] = useState('answering');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(TIME_PER_QUESTION);
  const finishedRef = useRef(false);
  const secondsRef = useRef(TIME_PER_QUESTION);
  const currentQuestion = questions[questionIndex];
  secondsRef.current = secondsLeft;

  const finishGame = useCallback((reason, count = correctCount) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    navigate('/result', {
      replace: true,
      state: { name: playerName, prize: calcPrize(count, reason), correctCount: count, reason },
    });
  }, [correctCount, navigate, playerName]);
  const finishRef = useRef(finishGame);
  finishRef.current = finishGame;

  useEffect(() => {
    if (!currentQuestion) return undefined;
    if (status === 'locked') {
      const timeout = window.setTimeout(() => setStatus('revealed'), 1000);
      return () => window.clearTimeout(timeout);
    }
    if (status === 'revealed') {
      const timeout = window.setTimeout(() => {
        if (selectedAnswer === currentQuestion.answer) {
          const nextCount = correctCount + 1;
          setCorrectCount(nextCount);
          if (questionIndex === questions.length - 1) {
            finishGame('win', nextCount);
          } else {
            setQuestionIndex((index) => index + 1);
            setSelectedAnswer(null);
            setSecondsLeft(TIME_PER_QUESTION);
            setStatus('answering');
          }
        } else {
          finishGame('wrong', correctCount);
        }
      }, 2000);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [status, currentQuestion, selectedAnswer, correctCount, questionIndex, questions.length, finishGame]);

  useEffect(() => {
    if (status !== 'answering' || !currentQuestion) return undefined;
    const interval = window.setInterval(() => {
      const nextSeconds = secondsRef.current - 1;
      secondsRef.current = nextSeconds;
      setSecondsLeft(nextSeconds);
      if (nextSeconds <= 0) {
        window.clearInterval(interval);
        finishRef.current('timeout');
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [status, currentQuestion]);

  if (!playerName.trim()) return <Navigate to="/" replace />;
  if (loading) return <section className="panel">Đang tải câu hỏi...</section>;
  if (error) return <section className="panel"><p className="error-text">Không tải được câu hỏi.</p></section>;
  if (!currentQuestion) return <section className="panel"><p>Không có câu hỏi để chơi.</p></section>;

  return (
    <div className="game-layout">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
          <p style={{ margin: 0, fontWeight: 800 }}>Người chơi: {playerName}</p><Timer secondsLeft={secondsLeft} />
        </div>
        <QuestionCard question={currentQuestion} questionIndex={questionIndex} status={status} selectedAnswer={selectedAnswer} onSelect={(index) => { if (status === 'answering') { setSelectedAnswer(index); setStatus('locked'); } }} />
      </div>
      <MoneyLadder currentQuestion={questionIndex + 1} />
    </div>
  );
};

export default Play;
