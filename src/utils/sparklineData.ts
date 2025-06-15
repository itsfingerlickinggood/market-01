
export const generateSparklineData = (trend: 'up' | 'down' | 'stable') => {
  const baseValue = 50;
  return Array.from({ length: 12 }, (_, i) => {
    let value = baseValue;
    if (trend === 'up') {
      value += i * 2 + Math.random() * 10;
    } else if (trend === 'down') {
      value -= i * 1.5 + Math.random() * 8;
    } else {
      value += Math.sin(i * 0.5) * 5 + Math.random() * 6;
    }
    return { value };
  });
};
