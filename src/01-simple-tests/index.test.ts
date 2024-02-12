import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const numbers = {
      a: 3,
      b: 5,
      action: Action.Add,
    };

    const output = simpleCalculator(numbers);
    expect(output).toBe(8);
  });

  test('should subtract two numbers', () => {
    const numbers = {
      a: 3,
      b: 5,
      action: Action.Subtract,
    };
    const output = simpleCalculator(numbers);
    expect(output).toBe(-2);
  });

  test('should multiply two numbers', () => {
    const numbers = {
      a: 4,
      b: 3,
      action: Action.Multiply,
    };
    const output = simpleCalculator(numbers);
    expect(output).toBe(12);
  });

  test('should divide two numbers', () => {
    const numbers = {
      a: 15,
      b: 3,
      action: Action.Divide,
    };
    const output = simpleCalculator(numbers);
    expect(output).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const numbers = {
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    };
    const output = simpleCalculator(numbers);
    expect(output).toBe(27);
  });

  test('should return null for invalid action', () => {
    const numbers = {
      a: 3,
      b: 'a',
      action: 'invalid',
    };
    const output = simpleCalculator(numbers);
    expect(output).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const numbers = {
      a: 3,
      b: 'a',
      action: Action.Divide,
    };
    const output = simpleCalculator(numbers);
    expect(output).toBe(null);
  });
});
