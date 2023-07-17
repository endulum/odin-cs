function allProduct(arr: Array<number>): number {
    return arr.length ? arr.shift() * allProduct(arr) : 1 ;
}

console.log(allProduct([2, 3, 5])); // returns 30
