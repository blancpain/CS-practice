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

class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    return new Node(value, null);
  }
}

const linkedList = new LinkedList();

console.log(linkedList.head);

linkedList.append("poop");

console.log(linkedList.head);
