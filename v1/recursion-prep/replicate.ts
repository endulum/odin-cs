function replicate(x: number, n: number): Array<number> {
    if (n <= 0) return [];
    return [x, ...replicate(x, n - 1)];
}

console.log(replicate(3, 3)); // returns [3, 3, 3] 
