class ListNode<T> {
    data: T;
    next: ListNode<T> | null = null;

    constructor(data: T) {
        this.data = data;
    }
}

class List<T> {
    private _head: ListNode<T> | null = null;
    private _tail: ListNode<T> | null = null;

    get head(): ListNode<T> | null { return this._head }
    get tail(): ListNode<T> | null { return this._tail }
    get size(): number {
        let nodes = 0;
        let currentNode = this._tail
        while (currentNode) {
            nodes++;
            currentNode = currentNode.next;
        }

        return nodes;
    }

    public prepend(value: T) {
        const tempNode = this._tail;
        this._tail = new ListNode(value);
        this._tail.next = tempNode;
        if (!this._head) this._head = this._tail;
    }

    public pop() {
        this._tail = this._tail!.next;
    }

    public append(value: T) {
        const tempNode = this._head;
        this._head = new ListNode(value);
        tempNode!.next = this._head;
        if (!this._tail) this._tail = this._head;
    }

    public atIndex(index: number) {
        if (index < 0 || index > this.size) return null;

        let currentNode = this._tail;
        while (index > 0) {
            index--;
            currentNode = currentNode!.next;
        }

        return currentNode;
    }

    public contains(value: T): boolean {
        let currentNode = this._tail;
        while (currentNode) {
            if (currentNode.data === value) return true;
            currentNode = currentNode!.next;
        }

        return false;
    }

    public find(value: T) {
        let index = 0;
        let currentNode = this._tail;
        while (currentNode) {
            if (currentNode.data === value) return index;
            index++
            currentNode = currentNode!.next;
        }

        return -1;
    }

    public print() {
        let toPrint: string = ``;
        let currentNode = this._tail;

        while (currentNode) {
            toPrint += `[ ${currentNode.data} ]`;
            currentNode = currentNode!.next;
            if (currentNode) toPrint += ` => `;
        }

        console.log(toPrint);
    }
}

const myList = new List;
myList.prepend(1);
myList.prepend(2);
myList.prepend(3);
myList.append(1);
myList.append(2);
myList.append(3);
myList.print();

