function fibonacci(index: number, array: number[] = [0, 1]): number[] {
  if (index < 2) return array.slice(0, index);
  return [
    ...array,
    ...fibonacci(index - 1, [array[1], array[0] + array[1]]).slice(1),
  ];
}

console.log('\n');
[
  0, // []
  1, // [0]
  2, // [0, 1]
  3, // [0, 1, 1]
  4, // [0, 1, 1, 2]
  5, // [0, 1, 1, 2, 3]
  6, // [0, 1, 1, 2, 3, 5]
  7, // [0, 1, 1, 2, 3, 5, 8]
  8, // [0, 1, 1, 2, 3, 5, 13]
].forEach((num) => console.log(num, fibonacci(num)));
