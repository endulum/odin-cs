function productOfArray(numbers: number[], index = 0): number {
  if (numbers.length <= index) return 1;
  return numbers[index] * productOfArray(numbers, index + 1);
}

console.log(productOfArray([1, 2, 3])); // 6
console.log(productOfArray([1, 2, 3, 10])); // 60
