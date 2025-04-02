function merge(arr: number[]) {
    if (arr.length < 2) return;

    const leftHalf: number[] = arr.slice(0, arr.length / 2);
    const rightHalf: number[] = arr.slice(arr.length / 2, arr.length);

    merge(leftHalf);
    merge(rightHalf);

    let leftIndex: number = 0;
    let rightIndex: number = 0;

    let sortedIndex: number = 0;

    while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
        if (leftHalf[leftIndex] < rightHalf[rightIndex]) {
            arr[sortedIndex] = leftHalf[leftIndex];
            leftIndex++;

            if (leftIndex == leftHalf.length) {
                while (rightIndex < rightHalf.length) {
                    sortedIndex++;
                    arr[sortedIndex] = rightHalf[rightIndex];
                    rightIndex++;
                }
            }
        } else {
            arr[sortedIndex] = rightHalf[rightIndex]
            rightIndex++;

            if (rightIndex == rightHalf.length) {
                while (leftIndex < leftHalf.length) {
                    sortedIndex++;
                    arr[sortedIndex] = leftHalf[leftIndex];
                    leftIndex++;
                }
            }
        }

        sortedIndex++;
    }

    return arr;
}
