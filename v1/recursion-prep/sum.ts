function sum(x: number): number {
    if (x == 1) return 1;
    return x + sum(x - 1);
}

console.log(sum(3)); // returns 6
