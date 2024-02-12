import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const deposit = 80;
    const acc = getBankAccount(deposit);
    expect(acc.getBalance()).toBe(deposit);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const deposit = 80;
    const withdrawSum = 130;
    const acc = getBankAccount(deposit);
    try {
      acc.withdraw(withdrawSum);
    } catch (err) {
      if (err instanceof InsufficientFundsError) {
        expect(err.message).toBe(
          `Insufficient funds: cannot withdraw more than ${deposit}`,
        );
      }
    }
  });

  test('should throw error when transferring more than balance', () => {
    const deposit = 80;
    const transferSum = 200;
    const acc = getBankAccount(deposit);
    try {
      acc.transfer(transferSum, acc);
    } catch (err) {
      if (err instanceof InsufficientFundsError) {
        expect(err.message).toBe(
          `You saum is ${deposit}`,
        );
      }
    }
  });

  test('should throw error when transferring to the same account', () => {
    const deposit = 50;
    const acc = getBankAccount(deposit);
    try {
      acc.transfer(deposit, acc);
    } catch (err) {
      if (err instanceof TransferFailedError) {
        expect(err.message).toBe('Transfer failed');
      }
    }
  });

  test('should deposit money', () => {
    const deposit = 100;
    const depositSum = 50;
    const acc = getBankAccount(deposit);
    acc.deposit(depositSum);
    expect(acc.getBalance()).toBe(deposit + depositSum);
  });

  test('should withdraw money', () => {
    const deposit = 80;
    const withdrawSum = 30;
    const acc = getBankAccount(deposit);
    acc.withdraw(withdrawSum);
    expect(acc.getBalance()).toBe(deposit - withdrawSum);
  });

  test('should transfer money', () => {
    const firstAccount = getBankAccount(50);
    const secondAccount = getBankAccount(300);
    const transferAmount = 40;
    firstAccount.transfer(transferAmount, secondAccount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(40);
    acc.fetchBalance = jest.fn().mockResolvedValue(35);
    const deposit = await acc.fetchBalance();
    expect(typeof deposit).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(100);
    acc.fetchBalance = jest.fn().mockResolvedValue(200);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(80);
    acc.fetchBalance = jest.fn().mockResolvedValue(null);
    try {
      await acc.synchronizeBalance();
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).toBe('Synchronization failed');
      }
    }
  });
});
