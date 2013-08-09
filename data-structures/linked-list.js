var assert = require('assert');

/**
 * Linked-list.
 *
 * Supports push, at, last and first.
 */
var linkedList = (function () {
  var linkedList = {},
      node = {};

  /**
   * Push an object to the front of the list
   */
  linkedList.push = function (val) {
    var newNode = Object.create(node);
    newNode.value = val;
    if (this.tail) { this.tail.next = newNode; }
    if (!this.head) { this.head = newNode; }
    this.tail = newNode;
  };

  /**
   * Grab the first value from the list
   */
  linkedList.first = function (val) {
    if (!this.head) { return null; }
    return this.head.value;
  };

  /**
   * Grab the last value from the list
   */
  linkedList.last = function (val) {
    if (!this.tail) { return null; }
    return this.tail.value;
  };

  /**
   * Grab a value out from the list
   */
  linkedList.at = function (index) {
    if (!this.tail) { this.tail = this.head; }
    if (!this.head) { return null; }
    var visited = 0,
        current = this.head;
    while (current && visited < index) {
      current = current.next;
      visited++;
    }
    return current.value;
  };

  /**
   * Log out the list
   * TODO get rid of the duplication here
   */
  linkedList.traverse = function () {
    if (!this.head) { return; }
    var visited = 0,
        current = this.head;
    while (current.next) {
      console.log('%d: %d', visited++, current.value);
      current = current.next;
    }
    console.log('%d: %d', visited++, current.value);
  };

  return linkedList;
}());


var ll = Object.create(linkedList);
ll.push(1);
ll.push(2);
ll.push(3);
ll.push(0);
ll.push(5);
ll.traverse();
assert.deepEqual(ll.at(0), 1);
assert.deepEqual(ll.at(1), 2);
assert.deepEqual(ll.at(2), 3);
assert.deepEqual(ll.first(), 1);
assert.deepEqual(ll.last(), 5);