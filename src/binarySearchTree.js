/* eslint-disable max-classes-per-file */
import mergeSort from "./mergeSort.js";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1);
  }

  buildTree(array, start, end) {
    // base case
    if (start > end) {
      return null;
    }

    // recursive case
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  }

  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return;
    }
    // helper function so that we can use this.root
    const insertRecursive = (node, value) => {
      if (value < node.data) {
        // if the value is less than the current node's data, go left
        if (!node.left) {
          // if there is no left child, create a new node here

          // eslint-disable-next-line no-param-reassign
          node.left = new Node(value);
        } else {
          // otherwise, recursively call insertRecursive on the left child
          insertRecursive(node.left, value);
        }
      } else if (value > node.data) {
        // if the value is greater than the current node's data, go right
        if (!node.right) {
          // if there is no right child, create a new node here

          // eslint-disable-next-line no-param-reassign
          node.right = new Node(value);
        } else {
          // otherwise, recursively call insertRecursive on the right child
          insertRecursive(node.right, value);
        }
      } else {
        // if the value is equal to the current node's data, do nothing (no duplicates allowed)
        console.log("Value already exists. Try again!");
      }
    };
    // start the recursion at the root node
    insertRecursive(this.root, val);
  }

  delete(val) {
    // helper function to check if node has children
    // returns 0 if no children, 1 if one child and
    // 2 if two children
    const countChildren = (node) => (node.left ? 1 : 0) + (node.right ? 1 : 0);

    // helper function to find minimum value given a root node
    const minValue = (node) => {
      // if the node doesn't have any children
      // or no children to the left then it's the smallest
      if (countChildren(node) === 0) return node;
      if (node.left === null) return node;

      let smallest = node.left;
      while (smallest.left !== null) {
        smallest = smallest.left;
      }
      return smallest;
    };

    // helper function so that we can use this.root
    const deleteRecursive = (node, value) => {
      // handle case where node to be deleted is the root
      if (value === node.data) {
        const temp = new Node(null);
        temp.left = this.root;
        const replacementNode =
          countChildren(this.root) === 2
            ? minValue(this.root.right)
            : this.root.right || this.root.left;
        if (replacementNode !== null) {
          deleteRecursive(this.root, replacementNode.data);
          temp.left = replacementNode;
          replacementNode.left = this.root.left;
          replacementNode.right = this.root.right;
        }
        this.root = temp.left;
      }
      if (value < node.data) {
        if (node.left.data === value && countChildren(node.left) === 0) {
          // eslint-disable-next-line no-param-reassign
          node.left = null;
        } else if (node.left.data === value && countChildren(node.left) === 1) {
          // eslint-disable-next-line no-param-reassign
          node.left =
            node.left.left === null ? node.left.right : node.left.left;
        } else if (node.left.data === value && countChildren(node.left) === 2) {
          const nextBiggest = node.left.right;
          const replacementNode = minValue(nextBiggest);
          const tempLeft = node.left.left;

          if (nextBiggest === replacementNode) {
            node.left = nextBiggest;
          } else {
            nextBiggest.left = node.left.left;
            node.left = nextBiggest;
          }
          node.left.left = tempLeft;
        } else {
          deleteRecursive(node.left, value);
        }
      } else if (value > node.data) {
        if (node.right.data === value && countChildren(node.right) === 0) {
          // eslint-disable-next-line no-param-reassign
          node.right = null;
        } else if (
          node.right.data === value &&
          countChildren(node.right) === 1
        ) {
          // eslint-disable-next-line no-param-reassign
          node.right =
            node.right.right === null ? node.right.left : node.right.right;
        } else if (
          node.right.data === value &&
          countChildren(node.right) === 2
        ) {
          const nextBiggest = node.right.right;
          const replacementNode = minValue(nextBiggest);
          const tempLeft = node.right.left;

          if (nextBiggest === replacementNode) {
            node.right = nextBiggest;
          } else {
            node.right = replacementNode;
            node.right.right = nextBiggest;
          }
          node.right.left = tempLeft;
        } else {
          deleteRecursive(node.right, value);
        }
      }
    };
    deleteRecursive(this.root, val);
  }

  // utility function to display tree
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

// construct array, sort it and remove duplicates to prepare BST
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedArr = mergeSort(arr);
const sortedArrUnique = [...new Set(sortedArr)];
const tr = new Tree(sortedArrUnique);

tr.prettyPrint(tr.root);
tr.delete(8);
console.log(" ");
console.log("-------------------------");
console.log(" ");
tr.prettyPrint(tr.root);
