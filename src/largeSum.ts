import * as fs from 'fs';

console.time('test');
const results = largeSum();
console.timeEnd('test');
console.log(results);
console.log(results.slice(0, 10));

function largeSum() {
  let numberStrings = prepareNumbers();
  let results = '';
  while (true) {
    const { sum, newStrings } = addStrings(numberStrings);
    numberStrings = newStrings;
    const stringSum = sum.toString();
    const lastNumber = getLastNumber(stringSum);
    results = lastNumber + results;
    const newNumbers = chopLast(stringSum);
    if (!numberStrings.length) {
      return newNumbers + results
    }
    numberStrings.push(newNumbers);
  }
}

function addStrings(numberStrings: string[]) {
  return numberStrings.reduce((results, numberString) => {
    const lastNumber = getLastNumber(numberString);
    const newString = chopLast(numberString);
    if (newString) {
      results.newStrings.push(newString);
    }
    results.sum += lastNumber;
    return results;
  }, { sum: 0, newStrings: [] });
}

function chopLast(numberString: string): string {
  return numberString.slice(0, -1) || '';
}

function getLastNumber(numberString: string): number {
  if (!numberString.length) {
    return 0;
  }
  return parseInt(numberString[numberString.length - 1]);
}

function prepareNumbers(): string[] {
  const fileString = fs.readFileSync('./nums.txt', { encoding: 'utf8' });
  return fileString.split('\n');
}