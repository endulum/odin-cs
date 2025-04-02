function sumIntegers(arr: Array<any>): number {
    if (!arr.length) return 0;
    let sum = 0;
    let first = arr.shift();
    if (Array.isArray(first)) sum += sumIntegers(first);
    else if (Number.isInteger(first)) sum += 1;
    return sum + sumIntegers(arr);
}

console.log(sumIntegers([[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]])); // returns 7
