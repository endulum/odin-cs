function all(arr: Array<number>, callback: Function): boolean {
    if (arr.length == 1 && callback(arr[0])) return true;
    if (!callback(arr[0])) return false;
    arr.shift();
    return true && all(arr, callback);
}

const dummy = (x: number): boolean => x < 5;
console.log(all([2, 4, 6], dummy)); // returns false
