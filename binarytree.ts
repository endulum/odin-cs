class TreeNode {
    value: number;
    leftNode: TreeNode | null = null;
    rightNode: TreeNode | null = null;

    constructor (value: number) {
        this.value = value;
    }
}

class Tree {
    root: TreeNode | null;

    constructor (data: number[]) {
        this.root = this.build(data, 0, data.length - 1);
    }

    build (array: number[], leftIndex: number, rightIndex: number) {
        if (leftIndex > rightIndex) {
            return null;
        } else {
            const middleIndex: number = Math.ceil((leftIndex + rightIndex) / 2);
            const newNode = new TreeNode(array[middleIndex]);
            newNode.leftNode = this.build(array, leftIndex, middleIndex - 1);
            newNode.rightNode = this.build(array, middleIndex + 1, rightIndex);
            return newNode;
        }
    }
    
    add (value: number, node = this.root) {
        if (!node) {
            return;
        } else if (value > node.value) {
            if (node.rightNode) {
                this.add(value, node.rightNode);
            } else {
                node.rightNode = new TreeNode(value);
            }
        } else if (value < node.value) {
            if (node.leftNode) {
                this.add(value, node.leftNode);
            } else {
                node.leftNode = new TreeNode(value);
            }
        }
    }

    remove (value: number, node = this.root): TreeNode | null {
        if (!node) {
            return null;
        } else if (value > node.value) {
            node.rightNode = this.remove(value, node.rightNode);
            return node;
        } else if (value < node.value) {
            node.leftNode = this.remove(value, node.leftNode);
            return node;
        }

        if (!node.leftNode) {
            return node.rightNode;
        } else if (!node.rightNode) {
            return node.leftNode;
        }
        
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

    find (value: number, node = this.root): TreeNode | null {
        if (!node) {
            return null;
        } else if (value > node.value) {
            return this.find(value, node.rightNode);
        } else if (value < node.value) {
            return this.find(value, node.leftNode);
        } else {
            return node;
        }
    }

    inOrder(callback: Function | null = null, node = this.root) {
        if (node && callback) {
            this.inOrder(callback, node.leftNode);
            callback(node.value);
            this.inOrder(callback, node.rightNode);
        } else {
            if (node) {
                return [
                    ...this.inOrder(null, node.leftNode),
                    node.value,
                    ...this.inOrder(null, node.rightNode)
                ];
            } else {
                return [];
            }
        }
    }

    preOrder(callback: Function | null = null, node = this.root) {
        if (node && callback) {
            callback(node.value);
            this.preOrder(callback, node.leftNode);
            this.preOrder(callback, node.rightNode);
        } else {
            if (node) {
                return [
                    node.value,
                    ...this.preOrder(null, node.leftNode),
                    ...this.preOrder(null, node.rightNode)
                ];
            } else {
                return [];
            }
        }
    }

    postOrder(callback: Function | null = null, node = this.root) {
        if (node && callback) {
            this.postOrder(callback, node.leftNode);
            this.postOrder(callback, node.rightNode);
            callback(node.value);
        } else {
            if (node) {
                return [
                    ...this.postOrder(null, node.leftNode),
                    ...this.postOrder(null, node.rightNode),
                    node.value
                ];
            } else {
                return [];
            }
        }
    }

    prettyPrint (node = this.root, prefix = "", isLeft = true) {
        if (!node) return;

        if (node.rightNode) {
            this.prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

        if (node.leftNode) {
            this.prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

const MAX = 20;

const data = new Array(8).fill(1)
                 .map(v => v * Math.ceil(Math.random() * MAX))
                 .sort((a, b) => a - b)
                 .filter(function(value, index, array) {
                    return !index || value != array[index - 1];
                 });

console.log(data);
const myTree = new Tree(data);
myTree.prettyPrint();

console.log(myTree.inOrder());
console.log(myTree.preOrder());
console.log(myTree.postOrder());
