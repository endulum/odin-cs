class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null;

  constructor() {
    this.head = null;
  }

  get tail() {
    if (!this.head) return null;
    let currentNode = this.head;
    while (currentNode.next) currentNode = currentNode.next;
    return currentNode;
  }

  get size() {
    let currentNode = this.head;
    let count = 0;
    while (currentNode) {
      count++;
      currentNode = currentNode.next;
    }
    return count;
  }

  forEach(callback: (node: ListNode<T>, index?: number) => void) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      callback(currentNode, index);
      currentNode = currentNode.next;
      index++;
    }
  }

  prepend(value: T) {
    const node = new ListNode(value);
    node.next = this.head;
    this.head = node;
  }

  append(value: T) {
    const node = new ListNode(value);
    const tail = this.tail;
    if (tail) tail.next = node;
    else this.head = node;
  }

  at(index: number) {
    let currentNode = this.head;
    let tempIndex = 0;
    while (currentNode) {
      if (tempIndex === index) return currentNode;
      currentNode = currentNode.next;
      tempIndex++;
    }
    return null;
  }

  pop() {
    if (!this.head) return;
    if (!this.head.next) {
      this.head = null;
      return;
    }
    let currentNode: ListNode<T> | null = this.head;
    while (currentNode) {
      if (currentNode.next && !currentNode.next.next) {
        currentNode.next = null;
        break;
      } else currentNode = currentNode.next;
    }
  }

  contains(value: T) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.next;
    }
    return false;
  }

  find(value: T) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.next;
      index++;
    }
    return false;
  }

  toString() {
    let string = '';
    let currentNode = this.head;
    while (currentNode) {
      if (!currentNode.next) {
        string += `( ${currentNode.value} )`;
      } else {
        string += `( ${currentNode.value} ) -> `;
      }
      currentNode = currentNode.next;
    }
    return string;
  }

  insertAt(value: T, index: number) {
    if (index === 0) {
      this.prepend(value);
      return;
    }
    let currentNode = this.head;
    let tempIndex = 0;
    while (currentNode) {
      if (tempIndex === index - 1) {
        const node = new ListNode(value);
        if (currentNode.next) node.next = currentNode.next;
        currentNode.next = node;
        break;
      } else {
        currentNode = currentNode.next;
        tempIndex++;
      }
    }
  }

  removeAt(index: number) {
    if (index === 0) {
      this.head = this.head ? this.head.next : null;
      return;
    }
    let currentNode = this.head;
    let tempIndex = 0;
    while (currentNode) {
      if (tempIndex === index - 1) {
        console.log(currentNode);
        if (currentNode.next) currentNode.next = currentNode.next.next;
        break;
      } else {
        currentNode = currentNode.next;
        tempIndex++;
      }
    }
  }
}

const list = new LinkedList();
list.append('dog');
list.append('cat');
list.append('parrot');
list.append('hamster');
list.append('snake');
list.append('turtle');
console.log(list.toString());

console.log();
