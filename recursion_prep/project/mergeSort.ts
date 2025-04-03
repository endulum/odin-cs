function mergeSort(array: number[]): number[] {
  if (array.length === 1) return array;

  const leftUnsorted = mergeSort(array.slice(0, array.length / 2));
  const rightUnsorted = mergeSort(array.slice(array.length / 2, array.length));
  const sorted: number[] = [];
  let l = 0;
  let r = 0;

  while (sorted.length < leftUnsorted.length + rightUnsorted.length) {
    // if both l and r exist
    if (
      // gotcha: 0 is falsy
      typeof leftUnsorted[l] === 'number' &&
      typeof rightUnsorted[r] === 'number'
    ) {
      if (leftUnsorted[l] <= rightUnsorted[r]) {
        sorted.push(leftUnsorted[l]);
        l++;
      } else {
        sorted.push(rightUnsorted[r]);
        r++;
      }
    } else if (leftUnsorted[l] && !rightUnsorted[r]) {
      // only l exists
      sorted.push(leftUnsorted[l]);
      l++;
    } else if (rightUnsorted[r] && !leftUnsorted[l]) {
      // only r exists
      sorted.push(rightUnsorted[r]);
      r++;
    }
  }

  return sorted;
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])); // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(mergeSort([105, 79, 100, 110])); // [79, 100, 105, 110]
