function sumRange(number: number): number {
  if (number < 1) return 0;
  return number + sumRange(number - 1);
}

console.log(sumRange(3)); // 6
