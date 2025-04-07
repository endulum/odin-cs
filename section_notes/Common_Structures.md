# Common Data Structures and Algorithms

An **algorithm** is a step-by-step approach to solve a problem. For each step, the next step is the only correct step.

A **brute-force** is a naive, simple approach to a problem. Brute-force algorithms are typically inefficient, although okay on smaller datasets.

An algorithm designer should always be asking, can we do better? Minimize an inefficient brute-force or "obvious" solution into something more efficient.

### Binary search

Works on a sorted array, reduces the search area by half each time (best-case `O(1)`, worst-case `O(log N)`) by discarding search areas where the target cannot be found.

```
While subarray size is greater than 0
  Find middle point of subarray
  If target is at the middle,
    stop
  Else if target is less than middle,
    repeat using the left half of subarray
  Else if target is greater than middle,
    repeat using the right half of subarray
```

#### Constructing a binary tree from an unordered array

```
While array index is less than array length
  If there are no nodes,
    create root node using element at index
    continue

  If there is one or more nodes,
    start at root node
    If element at index is greater than node,
      If node has a right child,
        repeat with start at this child node
      Else,
        insert it as a node to the right of start node
    Else if element at index is less than node,
      If node has a left child,
        repeat with start at this child node
      Else,
        insert it as a node to the left of start node
```

The result is a property structured and searchable, albeit not properly balanced, tree.

### Stacks, queues

Stacks are LIFO - last element in is first out. Push and pop from the "top" of a stack.

`[ 1, 2, 3 ] <-> add or remove (push or pop)`

Queues are FIFO - first element in is first out. Enqueue an item to the "back", and dequeue an item from the "front".

`remove (unshift) <-- [ 1, 2, 3 ] <-- add (push)`

In both cases, elements do not have indexes and cannot be accessed directly.

### Tree traversal

#### Breadth-first

Visit all nodes of the same level before the next level ("level-order").

A pointer cannot work, so we use a queue.

```
Create queue
Enqueue root node

While queue length is greater than zero,
  Dequeue a node and set it to current node
  Invoke callback on data of current node
  Enqueue each of the node's children
```

#### Depth-first

Visit all left nodes/subtrees before right nodes/subtrees.

- Root data, then left, then right ("pre-order")
- Left, then root data, then right ("in-order")
- Left, then right, then root data ("post-order")

Only difference among these is _where_ you invoke the data-read callback.

```
If root is null,
  stop
Else,
  Invoke callback data of root node
  Repeat with left child as root
  Repeat with right child as root
```

In iteration, you could explicitly use a stack:

```
Create stack
Push root node

While stack length is greater than zero,
  Pop a node and set it to current node
  Invoke callback on data of current node
  Push left child node if not null
  Push right child node if not null
```
