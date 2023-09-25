class Subtree {
    value: number;
    leftNode: Subtree | null = null;
    rightNode: Subtree | null = null;

    constructor (value: number) {
        this.value = value;
    }
}

class Tree {
    root: Subtree | null;

    constructor (data: number[]) {
        this.root = this.build(data, 0, data.length - 1);
    }

    build (array: number[], leftIndex: number, rightIndex: number) {
        // stop condition: if the leftmost index surpasses the right
        if (leftIndex > rightIndex) return null;

        // get the center of the array
        const middleIndex: number = Math.ceil((leftIndex + rightIndex) / 2);
        // make it the "root" of this subtree
        const newNode = new Subtree(array[middleIndex]);

        // make new subtrees by recursing into each half of the array
        newNode.leftNode = this.build(array, leftIndex, middleIndex - 1);
        newNode.rightNode = this.build(array, middleIndex + 1, rightIndex);

        // by the end, the subtrees will conjoin into a single-rooted tree
        return newNode;
    }

    prettyPrint (node = this.root, prefix = "", isLeft = true) {
        if (!node) return;

        if (node.rightNode)
            this.prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

        if (node.leftNode)
            this.prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}

// generate an array of random values
const data = new Array(15) // empties
                 .fill(1)  // set all to "1"
                 .map(v => v * Math.ceil(Math.random() * 100)) // multiply each by random number
                 .sort((a, b) => a - b) // sort ascending
                 .filter(function(value, index, array) {
                    return !index || value != array[index - 1]; // filter out dupes
                 });

console.log(data);

const myTree = new Tree(data);
myTree.prettyPrint();
