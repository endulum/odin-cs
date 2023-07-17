class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;
    constructor(data: T) { this.data = data }
}

class Tree<T> {
    private _root: TreeNode<T> | null;

    constructor(data: T[]) {
        this._root = this.build(data, 0, data.length - 1);
    }

    build(data: T[], first: number, last: number) {
        if (first > last) return null;
        let middle: number = (first + last) / 2;
        let newNode = new TreeNode(data[middle]);
        newNode.left = this.build(data, first, middle - 1);
        newNode.right = this.build(data, middle + 1, last);
        return newNode;
    }

    search(data: T, node = this._root): null | TreeNode<T> {
        if (node!.data === data) return node;
        if (data > node!.data && node!.right) 
            return this.search(data, node!.right);
        if (data < node!.data && node!.left) 
            return this.search(data, node!.left);
        return null;
    }

    insert(data: T, node = this._root) {
        if (!node) node = new TreeNode(data);
        if (data > node!.data) 
            node.right = this.insert(data, node.right);
        if (data < node!.data) 
            node.left = this.insert(data, node.left);
        return node;
    }

    print(node = this._root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
}

const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
tree.print();
