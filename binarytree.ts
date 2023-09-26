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

    levelOrder() {
        const queue: (TreeNode | null)[] = [];
        queue.push(this.root);
        const visited = [];

        while (queue.length > 0) {
            let currentNode = queue.shift();

            if (!currentNode) {
                break;
            } else {
                visited.push(currentNode.value);

                if (currentNode.leftNode) {
                    queue.push(currentNode.leftNode);
                }

                if (currentNode.rightNode) {
                    queue.push(currentNode.rightNode)
                }
            }
        }

        return visited;
        // https://blog.bitsrc.io/breadth-first-tree-traversal-explained-simply-for-binary-and-non-binary-trees-ca80dce038dc
    }

    height(node: TreeNode | null) {
        if (!node) {
            return -1;
        } else {
            const leftHeight: number = this.height(node.leftNode);
            const rightHeight: number = this.height(node.rightNode);
            const height = Math.max(leftHeight, rightHeight) + 1;
            return height;
        }
    }

    depth(node: TreeNode | null, root: TreeNode | null = this.root) {
        if (!root) {
            return -1;
        } else {
            let depth: number = -1;

            if (
                (node === root) ||
                (depth = this.depth(node, root.leftNode)) >= 0 ||
                (depth = this.depth(node, root.rightNode)) >= 0
            ) {
                return depth + 1
            }

            return depth;
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

const data = new Array(30).fill(1)
                 .map(v => v * Math.ceil(Math.random() * MAX))
                 .sort((a, b) => a - b)
                 .filter(function(value, index, array) {
                    return !index || value != array[index - 1];
                 });

console.log(data);
const myTree = new Tree(data);
myTree.prettyPrint();

// generate random existing number
let dataPoint = data[Math.floor(Math.random() * data.length)];

console.log(`Finding height of node ${dataPoint}...`);
console.log(`The height is ${myTree.height(myTree.find(dataPoint))} edges.`);
console.log(`Finding depth of node ${dataPoint}...`);
console.log(`The depth is ${myTree.depth(myTree.find(dataPoint))} edges.`);
