const { calculateMathOperation } = require('../public/js/math');

describe('Math operations', () => {
  it('adds and divides numbers correctly', () => {
    expect(calculateMathOperation('add', 10, 4)).toBe(14);
    expect(calculateMathOperation('subtract', 10, 4)).toBe(6);
    expect(calculateMathOperation('divide', 20, 4)).toBe(5);
    expect(calculateMathOperation('multiply', 3, 4)).toBe(12);
    expect(calculateMathOperation('percent', 15, 200)).toBe(30);
  });
});
