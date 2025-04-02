function replicate(repeat: number, number: number): number[] {
  if (repeat < 1) return [];
  return [number, ...replicate(repeat - 1, number)];
}

console.log(replicate(3, 5)); // [5, 5, 5]
console.log(replicate(1, 69)); // [69]
console.log(replicate(-2, 6)); // []
