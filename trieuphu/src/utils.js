import { MILESTONES, PRIZES, LETTERS } from './data';

// correctCount là số câu đã trả lời đúng trước khi lượt chơi kết thúc.
export const calcPrize = (correctCount, reason) => {
  if (reason === 'win') return PRIZES[PRIZES.length - 1];
  if (reason === 'stop') return correctCount > 0 ? PRIZES[correctCount - 1] : 0;
  const safeMilestones = MILESTONES.filter((milestone) => milestone <= correctCount);
  const highestMilestone = safeMilestones.length ? safeMilestones[safeMilestones.length - 1] : 0;
  return highestMilestone ? PRIZES[highestMilestone - 1] : 0;
};

export const makeAudiencePercentages = (question, hiddenOptions = []) => {
  const visibleWrongAnswers = LETTERS.map((_, index) => index)
    .filter((index) => index !== question.answer && !hiddenOptions.includes(index));

  if (visibleWrongAnswers.length === 0) {
    return LETTERS.map((_, index) => (index === question.answer ? 100 : 0));
  }

  // Khi chỉ còn một đáp án sai hiển thị, giữ đáp án đúng cao hơn đáp án sai.
  const correctPercent = visibleWrongAnswers.length === 1
    ? 51 + Math.floor(Math.random() * 20)
    : 40 + Math.floor(Math.random() * 31);
  let remaining = 100 - correctPercent;
  const maxWrongShare = correctPercent - 1;
  const shares = visibleWrongAnswers.map((_, index) => {
    const slotsLeft = visibleWrongAnswers.length - index;
    if (slotsLeft === 1) return remaining;
    const minimum = Math.max(0, remaining - maxWrongShare * (slotsLeft - 1));
    const maximum = Math.min(maxWrongShare, remaining);
    const share = minimum + Math.floor(Math.random() * (maximum - minimum + 1));
    remaining -= share;
    return share;
  });
  const result = [0, 0, 0, 0];
  result[question.answer] = correctPercent;
  visibleWrongAnswers.forEach((optionIndex, index) => { result[optionIndex] = shares[index]; });
  return result;
};
