class LinkedList {}

class Node {
  constructor(value = null, nextNode = null) {
    this._value = value;
    this._nextNode = nextNode;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }

  get nextNode() {
    return this._nextNode;
  }

  set nextNode(newNode) {
    this._nextNode = newNode;
  }
}

const nodeOne = new Node();

console.log(nodeOne.value);
