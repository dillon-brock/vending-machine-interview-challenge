import path from 'node:path'
import process from 'node:process'

export function getChange(args: Array<string>): number {
  let arg = null
  let cost = null
  let payment = null

  while((arg = args.shift())) {
    if(arg == '--item-cost') {
      const costInput = args.shift()
      cost = Math.round(Number(costInput || '0') * 100)
    } else if(arg == '--payment') {
      const paymentInput = args.shift()
      payment = Math.round(Number(paymentInput || '0') * 100)
    }
  }
  
  if(cost == null) {
    console.error('--item-cost is required but not provided. Exiting.')
    process.exit(1)
  }
  if(payment == null) {
    console.error('--payment is required but not provided. Exiting.')
    process.exit(2)
  }

  return payment - cost;
}

const coinValues = {
  'Quarters': 25,
  'Dimes': 10,
  'Nickels': 5,
  'Pennies': 1
}

export function sortCoinValues(values: typeof coinValues): Array<[keyof typeof coinValues, number]> {
  return Object.entries(values)
    .sort((a, b) => b[1] - a[1]) as Array<[keyof typeof coinValues, number]>
}

export function getChangeInCoins(change: number, sortedCoinValues: Array<[keyof typeof coinValues, number]>): Record<keyof typeof coinValues, number> {
  let changeInCoins: Record<keyof typeof coinValues, number> = {
    'Quarters': 0,
    'Dimes': 0,
    'Nickels': 0,
    'Pennies': 0
  }

  for (const [k, v] of sortedCoinValues) {
    while (change >= v) {
      changeInCoins[k]++;
      change -= v;
    }
  }

  return changeInCoins;
}

export function logCoins(sortedCoinValues: Array<[keyof typeof coinValues, number]>, changeInCoins: Record<keyof typeof coinValues, number>): void {
  for (const [k, v] of sortedCoinValues) {
    const padding = 'Quarters'.length - k.length + 1
    if (changeInCoins[k]) {
      console.log(`${k}: ${changeInCoins[k].toString().padStart(padding)}`);
    }
  }
} 

if(path.basename(__filename) == process.argv[0]) {
  const sortedCoinValues = sortCoinValues(coinValues);
  let change = getChange(process.argv);
  const changeInCoins = getChangeInCoins(change, sortedCoinValues);
  logCoins(sortedCoinValues, changeInCoins);
}
