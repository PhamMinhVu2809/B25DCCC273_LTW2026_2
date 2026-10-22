import { MILESTONES, PRIZES } from './data';
export const calcPrize = (correctCount, reason) => {
  if (reason === 'win') return PRIZES[14];
  if (reason === 'stop') return correctCount > 0 ? PRIZES[correctCount - 1] : 0;
  const safe = MILESTONES.filter((milestone) => milestone <= correctCount);
  return safe.length ? PRIZES[safe[safe.length - 1] - 1] : 0;
};
export const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);
export const makeAudiencePercentages = (question, hidden = []) => {
  const visibleWrong = [0, 1, 2, 3].filter((i) => i !== question.answer && !hidden.includes(i));
  const correct = visibleWrong.length === 0 ? 100 : 40 + Math.floor(Math.random() * 31);
  const result = [0, 0, 0, 0]; result[question.answer] = correct;
  let remaining = 100 - correct;
  const maxWrongShare = correct - 1;
  visibleWrong.forEach((idx, i) => {
    const slots = visibleWrong.length - i;
    const minimum = Math.max(0, remaining - maxWrongShare * (slots - 1));
    const maximum = Math.min(maxWrongShare, remaining);
    const share = slots === 1 ? remaining : minimum + Math.floor(Math.random() * (maximum - minimum + 1));
    result[idx] = share; remaining -= share;
  });
  return result;
};
export const buildGameQuestions = (allQuestions) => [1, 2, 3].flatMap((level) => shuffle(allQuestions.filter((q) => q.level === level)).slice(0, 5));
export const shuffleOptions = (question) => {
  const options = shuffle(question.options.map((text, oldIndex) => ({ text, oldIndex })));
  return { ...question, options: options.map((item) => item.text), answer: options.findIndex((item) => item.oldIndex === question.answer) };
};
