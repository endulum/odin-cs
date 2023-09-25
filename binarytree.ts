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
    
    add (value: number, node = this.root) {
        if (!node) return;
        // is the value greater than current node?
        if (value > node.value) {
            // does the current node have a right node to see? if so, recurse
            if (node.rightNode) this.add(value, node.rightNode);
            // if not, perform the addition
            else node.rightNode = new Subtree(value);
        } 
        
        // same thing in the other direction
        else if (value < node.value) {
            if (node.leftNode) this.add(value, node.leftNode);
            else node.leftNode = new Subtree(value);
        }
    }

    remove (value: number, node = this.root): Subtree | null {
        if (!node) return null;

        // use recursion to find the node
        if (value > node.value) {
            node.rightNode = this.remove(value, node.rightNode);
            return node;
        } else if (value < node.value) {
            node.leftNode = this.remove(value, node.leftNode);
            return node;
        }

        // if we've reached the node we want to remove,
        // neither of the conditions above should be met.
        // we proceed:

        if (!node.leftNode) {
            return node.rightNode;
        } else if (!node.rightNode) {
            return node.leftNode;
        } 

        // if the node we want to remove
        // has no or one child, our work is easy.
        // but if there are two children, we have some
        // more work to do...
        
        else {
            let parent = node;
            let successor = node.rightNode;
            while (successor.leftNode) {
                parent = successor;
                successor = successor.leftNode;
            }
            if (parent !== node) {
                parent.leftNode = successor.rightNode;
            } else {
                parent.rightNode = successor.rightNode;
            }
            node.value = successor.value;
            return node;
        }
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

const MAX = 20;

// generate an array of random values
const data = new Array(10) // empties
                 .fill(1)  // set all to "1"
                 .map(v => v * Math.ceil(Math.random() * MAX)) // multiply each by random number
                 .sort((a, b) => a - b) // sort ascending
                 .filter(function(value, index, array) {
                    return !index || value != array[index - 1]; // filter out dupes
                 });

console.log(data);

const myTree = new Tree(data);

// add() testing:
// generate random nonexisting number to add
let newNumber = Math.ceil(Math.random() * MAX);
while (data.includes(newNumber)) newNumber = Math.ceil(Math.random() * MAX);
myTree.prettyPrint();
console.log(`Adding new number "${newNumber}"...`);
myTree.add(newNumber);
myTree.prettyPrint();

console.log();

// remove() testing:
// generate random existing number to remove
let deleteNumber = data[Math.floor(Math.random() * data.length)];
myTree.prettyPrint();
console.log(`Deleting number "${deleteNumber}"...`);
myTree.remove(deleteNumber);
myTree.prettyPrint();
