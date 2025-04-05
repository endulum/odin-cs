function numToDigits(x: number): number[] {
  return x
    .toString()
    .split('')
    .map((d: string) => parseInt(d, 10));
}

function digitsToNum(x: number[]): number {
  return parseInt(x.join(''), 10);
}

function add(...args: number[]) {
  let summands = args.map((a) => numToDigits(a));

  // find largest digit count of summands
  let largestDigitCount = 0;
  summands.forEach((summand) => {
    if (summand.length > largestDigitCount) largestDigitCount = summand.length;
  });

  // use the ldc to zero-pad the left ends of each summand
  summands = summands.map((summand) => {
    return [...Array(largestDigitCount - summand.length).fill(0), ...summand];
  });

  // perform vertical addition
  let carry = 0;
  let sumDigits: number[] = [];
  for (let i = largestDigitCount - 1; i >= 0; i--) {
    // get the temporary sum for the current vertical position
    let tempSum = carry;
    summands.forEach((summand) => {
      tempSum += summand[i];
    });

    // determine carry
    if (i === 0) {
      // no carry needed if no vertical positions remain
      sumDigits.unshift(...numToDigits(tempSum));
    } else {
      const tempSumDigits = numToDigits(tempSum);
      carry = digitsToNum(tempSumDigits.slice(0, -1)) || 0;
      sumDigits.unshift(tempSumDigits[tempSumDigits.length - 1]);
    }
  }

  return digitsToNum(sumDigits);
}

console.log(add(1234, 5678, 12345678)); // 12352590

function multiply(a: number, b: number) {
  const aDigits = numToDigits(a);
  const bDigits = numToDigits(b);
  const products: number[] = [];

  for (let i = aDigits.length - 1; i >= 0; i--) {
    let carry: number = 0;
    const product: number[] = [...Array(aDigits.length - i - 1).fill(0)];

    for (let j = bDigits.length - 1; j >= 0; j--) {
      const tempProduct = aDigits[i] * bDigits[j] + carry;

      if (j === 0) {
        product.unshift(...numToDigits(tempProduct));
      } else {
        const tempProductDigits = numToDigits(tempProduct);
        carry = digitsToNum(tempProductDigits.slice(0, -1)) || 0;
        product.unshift(tempProductDigits[tempProductDigits.length - 1]);
      }
    }
    products.push(digitsToNum(product));
  }

  return add(...products);
}

console.log(multiply(1234, 5678)); // 7006652
