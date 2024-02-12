import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValue = 'test';
    const output = await resolveValue(testValue);
    expect(output).toBe(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const notification = 'test';
    try {
      throwError(notification);
    } catch (err) {
      if (err instanceof Error) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe(notification);
      }
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (err) {
      if (err instanceof Error) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Oops!');
      }
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (err) {
      if (err instanceof MyAwesomeError) {
        expect(err).toBeInstanceOf(MyAwesomeError);
        expect(err.message).toBe('This is my awesome custom error!');
      }
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      await rejectCustomError();
    } catch (err) {
      if (err instanceof MyAwesomeError) {
        expect(err).toBeInstanceOf(MyAwesomeError);
        expect(err.message).toBe('This is my awesome custom error!');
      }
    }
  });
});
