function power(base: number, exponent: number): number {
  if (exponent < 1) return 1;
  return base * power(base, exponent - 1);
}

console.log(power(2, 4)); // 16
console.log(power(2, 3)); // 8
console.log(power(2, 2)); // 4
console.log(power(2, 1)); // 2
console.log(power(2, 0)); // 1
