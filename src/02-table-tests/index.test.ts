import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 7, b: 2, action: Action.Divide, expected: 3.5 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 3, b: 2, action: 'invalid', expected: null },
  { a: 3, b: 2, action: 'invalid', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases.map(Object.values))(
    'simpleCalculator(1: %i, 2: %i, %s)',
    (a, b, action, expected) => {
      const input = { a, b, action };
      const output = simpleCalculator(input);
      expect(output).toBe(expected);
    },
  );
});
