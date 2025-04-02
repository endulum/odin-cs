function all<T>(
  array: T[],
  callback: (element: T) => boolean,
  index = 0
): boolean {
  if (array.length <= index) return true;
  if (!callback(array[index])) return false;
  return all(array, callback, index + 1);
}

var allAreLessThanSeven = all([1, 2, 9], function (num) {
  return num < 7;
});

console.log(allAreLessThanSeven); // false
