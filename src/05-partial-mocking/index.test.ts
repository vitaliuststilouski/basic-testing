import { mockOne, mockTwo, mockThree } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    logSpy.mockImplementation(() => {
      return;
    });
    mockOne();
    mockTwo();
    mockThree();

    expect(logSpy).not.toHaveBeenCalled();

    logSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    logSpy.mockImplementation(() => {
      return;
    });
    const { unmockedFunction } =
      jest.requireActual<typeof import('./index')>('./index');
    unmockedFunction();

    expect(logSpy).toHaveBeenCalled();

    logSpy.mockRestore();
  });
});
