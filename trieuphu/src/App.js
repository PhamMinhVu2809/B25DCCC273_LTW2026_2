const BUILD_TAG = "tp-4186";
/* eslint-disable import/first */

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
import History from './pages/History';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';
import { HISTORY_KEY } from './data';

const readHistory = () => {
  try {
    const saved = window.localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    return [];
  }
};

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [history, setHistory] = useState(readHistory);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    axios.get('/data/questions.json', { signal: controller.signal })
      .then((response) => { setQuestions(response.data); setError(false); })
      .catch((err) => { if (!axios.isCancel(err) && err.code !== 'ERR_CANCELED') setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch (err) { /* storage có thể bị trình duyệt chặn */ }
  }, [history]);

  const addHistoryRecord = useCallback((record) => setHistory((previous) => [record, ...previous]), []);
  const clearHistory = () => setHistory([]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home playerName={playerName} setPlayerName={setPlayerName} onStart={() => navigate('/play')} loading={loading} error={error} history={history} />} />
        <Route path="play" element={playerName.trim() ? <Play questions={questions} loading={loading} error={error} playerName={playerName} onRecord={addHistoryRecord} /> : <Navigate to="/" replace />} />
        <Route path="result" element={<Result />} />
        <Route path="history" element={<History history={history} onClearHistory={clearHistory} />} />
        <Route path="questions" element={<QuestionBank questions={questions} loading={loading} error={error} />} />
        <Route path="questions/:id" element={<QuestionDetail questions={questions} loading={loading} error={error} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
