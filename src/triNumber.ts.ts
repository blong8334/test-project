const primes = [2, 3, 5, 7];

console.time('test');
const result = triNum(500);
console.timeEnd('test');
console.log(result);

function triNum(factors) {
  let num = 1;
  let sum = 0;
  while (true) {
    sum += num;
    const primeFactor = getPrimeFactors(sum);
    const numFactors = Object.values(primeFactor).reduce((total: number, num: number) => total * (num + 1), 1);
    if (numFactors > factors) {
      return sum;
    }
    num += 1;
  }
}

function getPrimeFactors(number: number, results = {}) {
  if (number <= 0) {
    throw new Error('INVALID NUMBER');
  }
  if (number === 1) {
    return results;
  }
  for (const prime of primes) {
    if (number % prime === 0) {
      if (!results[prime]) {
        results[prime] = 0;
      }
      results[prime] += 1;
      return getPrimeFactors(number / prime, results);
    }
    if (prime === primes[primes.length - 1]) {
      getNextPrime();
    }
  }
}

function getNextPrime() {
  let testNumber = primes[primes.length - 1];
  while (true) {
    testNumber += 1;
    const isNotPrime = primes.some((prime: number) => !(testNumber % prime));
    if (!isNotPrime) {
      primes.push(testNumber);
      return testNumber;
    }
  }
}