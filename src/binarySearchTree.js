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
}

// sort array and remove duplicates to prepare BST
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedArr = mergeSort(arr);
const sortedArrUnique = [...new Set(sortedArr)];
const tr = new Tree(sortedArrUnique);

// utility function to display tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

tr.insert(6);
tr.insert(6);
prettyPrint(tr.root);
