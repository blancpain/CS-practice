/* eslint-disable max-classes-per-file */
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

  prepend(value) {
    this.head = new Node(value, this.head);
  }

  append(value) {
    if (this.head === null) this.prepend(value);
    else {
      let temp = this.head;
      while (temp.nextNode !== null) {
        temp = temp.nextNode;
      }
      temp.nextNode = new Node(value, null);
    }
  }

  get size() {
    if (this.head === null) return 0;
    let counter = 1;
    let temp = this.head;
    while (temp.nextNode !== null) {
      temp = temp.nextNode;
      counter += 1;
    }
    return counter;
  }

  get tail() {
    if (this.head === null) return null;
    let temp = this.head;
    while (temp.nextNode !== null) {
      temp = temp.nextNode;
    }
    return temp;
  }

  at(index) {
    if (this.head === null) return "List is empty!";
    if (index > this.size) return "Went beyond the end of the list!";
    let counter = 0;
    let temp = this.head;
    while (temp.nextNode !== null) {
      if (index === counter) break;
      temp = temp.nextNode;
      counter++;
    }
    return temp.value;
  }

  pop() {
    if (this.head === null) return "List is empty, nothing to pop!";
    if (this.size === 1) {
      this.head = null;
      return "List is now empty!";
    }
    const lastElem = this.tail;
    let temp = this.head;
    while (temp.nextNode !== lastElem) {
      temp = temp.nextNode;
    }
    temp.nextNode = null;
    return `${lastElem.value} removed`;
  }

  contains(value) {
    if (this.head === null) return "List is empty!";
    if (value === this.tail.value) return true;
    let temp = this.head;
    while (temp.nextNode !== null) {
      if (value === temp.value) return true;
      temp = temp.nextNode;
    }
    return false;
  }

  find(value) {
    if (this.head === null) return "List is empty!";
    let temp = this.head;
    let counter = 0;
    while (temp.nextNode !== null) {
      if (value === temp.value) break;
      temp = temp.nextNode;
      counter++;
    }

    if (value === temp.value) return counter;

    return null;
  }

  get toString() { }
}

const newLinkedList = new LinkedList();

newLinkedList.append("Poop 1");
newLinkedList.append("Poop 2");
newLinkedList.append("Poop 3");
newLinkedList.append("Poop 4");
newLinkedList.append("Poop 5");
newLinkedList.prepend("Poop 0");

console.log(newLinkedList.find("Poop 9"));
