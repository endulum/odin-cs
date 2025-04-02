function totalIntegers(array: any[]): number {
  let total = 0;
  array.map((v) => {
    if (Array.isArray(v)) total += totalIntegers(v);
    else if (typeof v === 'number') total++;
  });
  return total;
}

console.log(totalIntegers([[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]])); // 7
