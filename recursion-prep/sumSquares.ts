function sumSquares(arr: Array<any>): number {
    if (!arr.length) return 0;
    let sum = 0;
    let first = arr.shift();
    if (Array.isArray(first)) sum += sumSquares(first);
    else if (Number.isInteger(first)) sum += first * first;
    return sum + sumSquares(arr);
}

console.log(sumSquares([[1, 2], 3])); // returns 14
