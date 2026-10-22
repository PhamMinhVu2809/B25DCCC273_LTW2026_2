import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import MoneyLadder from '../components/MoneyLadder';
import Lifelines from '../components/Lifelines';
import AudienceChart from '../components/AudienceChart';
import { LETTERS, TIME_PER_QUESTION } from '../data';
import { calcPrize, makeAudiencePercentages } from '../utils';

const Play = ({ questions, loading, error, playerName, onRecord }) => {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [status, setStatus] = useState('answering');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(TIME_PER_QUESTION);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [lifelinesUsed, setLifelinesUsed] = useState({ fifty: false, audience: false });
  const [audiencePercentages, setAudiencePercentages] = useState(null);
  const finishedRef = useRef(false);
  const secondsRef = useRef(TIME_PER_QUESTION);
  const currentQuestion = questions[questionIndex];
  secondsRef.current = secondsLeft;

  const finishGame = useCallback((reason, count = correctCount) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const prize = calcPrize(count, reason);
    const record = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: playerName,
      prize,
      correctCount: count,
      playedAt: new Date().toLocaleString('vi-VN'),
    };
    onRecord(record);
    navigate('/result', {
      replace: true,
      state: { name: playerName, prize, correctCount: count, reason },
    });
  }, [correctCount, navigate, playerName, onRecord]);
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
            setHiddenOptions([]);
            setAudiencePercentages(null);
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

  useEffect(() => {
    if (!currentQuestion) return;
    const handleKey = (event) => {
      if (status !== 'answering') return;
      const letter = event.key.toUpperCase();
      const optionIndex = LETTERS.indexOf(letter);
      if (optionIndex >= 0 && !hiddenOptions.includes(optionIndex)) {
        setSelectedAnswer(optionIndex);
        setStatus('locked');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, hiddenOptions, currentQuestion]);

  useEffect(() => {
    if (!currentQuestion) return undefined;
    document.title = `Câu ${questionIndex + 1}/15 – ${playerName}`;
    return () => { document.title = 'Ai là triệu phú'; };
  }, [questionIndex, playerName, currentQuestion]);

  const useFiftyFifty = () => {
    if (lifelinesUsed.fifty || status !== 'answering' || !currentQuestion) return;
    const wrongOptions = [0, 1, 2, 3].filter((index) => index !== currentQuestion.answer);
    const shuffled = [...wrongOptions].sort(() => Math.random() - 0.5);
    setHiddenOptions(shuffled.slice(0, 2));
    setLifelinesUsed((previous) => ({ ...previous, fifty: true }));
    setAudiencePercentages(null);
  };

  const useAudience = () => {
    if (lifelinesUsed.audience || status !== 'answering' || !currentQuestion) return;
    setAudiencePercentages(makeAudiencePercentages(currentQuestion, hiddenOptions));
    setLifelinesUsed((previous) => ({ ...previous, audience: true }));
  };

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
        <QuestionCard question={currentQuestion} questionIndex={questionIndex} status={status} selectedAnswer={selectedAnswer} onSelect={(index) => { if (status === 'answering') { setSelectedAnswer(index); setStatus('locked'); } }} hiddenOptions={hiddenOptions} />
        <Lifelines used={lifelinesUsed} status={status} onFiftyFifty={useFiftyFifty} onAudience={useAudience} onStop={() => finishGame('stop', correctCount)} />
        <AudienceChart percentages={audiencePercentages} correctAnswer={currentQuestion.answer} />
      </div>
      <MoneyLadder currentQuestion={questionIndex + 1} />
    </div>
  );
};

export default Play;
