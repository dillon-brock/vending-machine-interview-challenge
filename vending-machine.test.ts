import { expect, test } from '@jest/globals';
import { getChange, getChangeInCoins, sortCoinValues } from './vending-machine';

const coinValues = {
  'Nickels': 5,
  'Quarters': 25,
  'Dimes': 10,
  'Pennies': 1
}

test('gets total change amount from arguments', () => {
  expect(getChange(['--item-cost', '0.95', '--payment', '1.25'])).toBe(30);
  expect(getChange(['--item-cost', '0.50', '--payment', '1.00'])).toBe(50);
});

test('sorts array of coins by value', () => {

  expect(sortCoinValues(coinValues)).toEqual([
    ['Quarters', 25],
    ['Dimes', 10],
    ['Nickels', 5],
    ['Pennies', 1]
  ]);
})

test('builds object of coins with corresponding number for correct change', () => {
  const sortedCoinValues = sortCoinValues(coinValues);
  expect(getChangeInCoins(25, sortedCoinValues)).toEqual({
    'Quarters': 1,
    'Dimes': 0,
    'Nickels': 0,
    'Pennies': 0
  });
  expect(getChangeInCoins(39, sortedCoinValues)).toEqual({
    'Quarters': 1,
    'Dimes': 1,
    'Nickels': 0,
    'Pennies': 4
  });
});