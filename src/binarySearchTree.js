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
        deleteRecursive(this.root, replacementNode.data);
        temp.left = replacementNode;
        replacementNode.left = this.root.left;
        replacementNode.right = this.root.right;
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
            // eslint-disable-next-line no-param-reassign
            node.left = nextBiggest;
          } else {
            nextBiggest.left = node.left.left;
            // eslint-disable-next-line no-param-reassign
            node.left = nextBiggest;
          }
          // eslint-disable-next-line no-param-reassign
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
            // eslint-disable-next-line no-param-reassign
            node.right = nextBiggest;
          } else {
            // eslint-disable-next-line no-param-reassign
            node.right = replacementNode;
            // eslint-disable-next-line no-param-reassign
            node.right.right = nextBiggest;
          }
          // eslint-disable-next-line no-param-reassign
          node.right.left = tempLeft;
        } else {
          deleteRecursive(node.right, value);
        }
      }
    };
    deleteRecursive(this.root, val);
  }

  find(value) {
    const findRecursive = (node, val) => {
      if (val === node.data) {
        return node;
      }
      if (val < node.data) {
        if (node.left && node.left.data === val) return node.left;
        if (node.left) return findRecursive(node.left, val);
      }
      if (val > node.data) {
        if (node.right && node.right.data === val) return node.right;
        if (node.right) return findRecursive(node.right, val);
      }
      return null;
    };
    return findRecursive(this.root, value);
  }

  // levelOrder implementation using iteration
  // levelOrder(cb) {
  //   if (this.root === null) return;
  //   const queue = [this.root];
  //   const finalArr = [];
  //
  //   while (queue.length >= 1) {
  //     const currentNode = queue[0];
  //     if (cb) cb(currentNode.data);
  //     finalArr.push(currentNode.data);
  //     if (currentNode.left) {
  //       queue.push(currentNode.left);
  //     }
  //     if (currentNode.right) {
  //       queue.push(currentNode.right);
  //     }
  //     queue.shift();
  //   }
  //   if (!cb) return finalArr;
  // }

  // levelOrder implementation using recursion
  levelOrder(cb) {
    const queue = [this.root];
    const finalArr = [];
    const levelOrderRecursive = (queue, finalArr, callback) => {
      if (queue.length < 1) {
        return;
      }
      const currentNode = queue.shift();
      finalArr.push(currentNode.data);
      // if cb is provided use that...
      if (callback) callback(currentNode.data);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      levelOrderRecursive(queue, finalArr, callback);
    };

    levelOrderRecursive(queue, finalArr, cb);

    if (!cb) return finalArr;
  }

  preorder(cb) {
    const finalArr = [];

    const preorderRecursive = (node, finalArr, cb) => {
      finalArr.push(node.data);
      if (cb) cb(node.data);
      if (node.left) preorderRecursive(node.left, finalArr, cb);
      if (node.right) preorderRecursive(node.right, finalArr, cb);
    };

    preorderRecursive(this.root, finalArr, cb);

    if (!cb) return finalArr;
  }

  inorder(cb) {
    const finalArr = [];

    const inorderRecursive = (node, finalArr, cb) => {
      if (node.left) inorderRecursive(node.left, finalArr, cb);
      finalArr.push(node.data);
      if (cb) cb(node.data);
      if (node.right) inorderRecursive(node.right, finalArr, cb);
    };

    inorderRecursive(this.root, finalArr, cb);

    if (!cb) return finalArr;
  }

  postorder(cb) {
    const finalArr = [];

    const postorderRecursive = (node, finalArr, cb) => {
      if (node.left) postorderRecursive(node.left, finalArr, cb);
      if (node.right) postorderRecursive(node.right, finalArr, cb);
      finalArr.push(node.data);
      if (cb) cb(node.data);
    };

    postorderRecursive(this.root, finalArr, cb);

    if (!cb) return finalArr;
  }

  height(node) {
    if (!node) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(givenNode) {
    const depthRecursive = (targetNode, node) => {
      if (!node) return -1;
      if (targetNode === node) return 1;

      const leftDepth = depthRecursive(targetNode, node.left);
      const rightDepth = depthRecursive(targetNode, node.right);

      if (leftDepth === -1 && rightDepth === -1) {
        return -1;
      }
      return 1 + Math.max(leftDepth, rightDepth);
    };

    return depthRecursive(givenNode, this.root);
  }

  isBalanced() {
    const isBalancedRec = (root) => {
      if (!root) return true;

      const leftH = this.height(root.left);
      const rightH = this.height(root.right);

      if (Math.abs(leftH - rightH) > 1) {
        return false;
      }
      return isBalancedRec(root.left) && isBalancedRec(root.right);
    };

    return isBalancedRec(this.root);
  }

  rebalance() {
    const newArray = this.inorder();
    const newArrayLen = newArray.length;
    this.root = this.buildTree(newArray, 0, newArrayLen - 1);
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

// DRIVER

// construct array, sort it and remove duplicates to prepare BST
// const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const sortedArr = mergeSort(arr);
// const sortedArrUnique = [...new Set(sortedArr)];
// const tr = new Tree(sortedArrUnique);

// test it
// console.log(tr.isBalanced()); // true
// tr.insert(200);
// tr.insert(201);
// tr.insert(203);
// tr.insert(204);
// tr.insert(206);
// tr.insert(202);
// tr.insert(208);
// tr.insert(230);
// console.log("-------------------------------");
// tr.prettyPrint(tr.root);
// console.log(tr.isBalanced()); // false
// console.log("-------------------------------");
// tr.rebalance();
// tr.prettyPrint(tr.root);
// console.log(tr.isBalanced()); // true
//
// console.log(tr.levelOrder());
// console.log(tr.preorder());
// console.log(tr.postorder());
// console.log(tr.inorder());
//
// console.log(tr.find(208));
