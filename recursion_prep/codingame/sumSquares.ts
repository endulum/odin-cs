type NumberArray = Array<number | NumberArray>;

function sumSquares(array: NumberArray): number {
  let total = 0;
  array.map((v) => {
    if (Array.isArray(v)) total += sumSquares(v);
    else total += v * v;
  });
  return total;
}

console.log(sumSquares([1, 2, 3])); // 14
console.log(sumSquares([[1, 2], 3])); // 14
console.log(sumSquares([[[[[[[[[1]]]]]]]]])); // 1
console.log(sumSquares([10, [[10], 10], [10]])); // 10
