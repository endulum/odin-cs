function quick(arr: number[]): number[] {
    if (arr.length < 2) return arr;

    const pivot = arr[0];
    const leftHalf = [];
    const rightHalf = [];

    let position = 1;
    while (position < arr.length) {
        if (arr[position] < pivot) leftHalf.push(arr[position]);
        else rightHalf.push(arr[position]);
        position++;
    }

    return [...quick(leftHalf), pivot, ...quick(rightHalf)];
};
