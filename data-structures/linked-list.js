var assert = require('assert');

/**
 * Linked-list.
 *
 * Supports push, pop, at, rm, last, first and length, plus traverse for logging.
 */
var linkedList = (function () {
  var linkedList = {},
      node = {};

  /**
   * Push a node to the front of the list
   */
  linkedList.push = function (val) {
    var newNode = Object.create(node);
    newNode.value = val;
    if (this.tail) { this.tail.next = newNode; }
    if (!this.head) { this.head = newNode; }
    this.tail = newNode;
  };

  /**
   * Pop the last node off the end
   */
  linkedList.pop = function () {
    if (!this.tail) { return null; }
    var len = this.length();
    return this.rm(len - 1);
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
   * Remove a node from the list at index
   */
  linkedList.rm = function (index) {
    if (!this.head) { return null; }
    var visited = 0,
        current = this.head,
        last = null;
    while (current && visited < index) {
      last = current;
      current = current.next;
      visited++;
    }
    if (last) { last.next = current.next; }
    if (this.head === current) { this.head = current.next; }
    if (this.tail === current) { this.tail = last; }
    return current.value;
  };

  /**
   * Get the list's length
   */
  linkedList.length = function () {
    if (!this.head) { return 0; }
    var visited = 0,
        current = this.head;
    while (current.next) {
      current = current.next;
      visited++;
    }
    return visited + 1;
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

assert.deepEqual(ll.at(0), 1);
assert.deepEqual(ll.at(1), 2);
assert.deepEqual(ll.at(2), 3);
assert.deepEqual(ll.first(), 1);
assert.deepEqual(ll.last(), 5);
assert.deepEqual(ll.length(), 5);

ll.rm(0);
assert.deepEqual(ll.at(0), 2);
assert.deepEqual(ll.length(), 4);

ll.rm(3);
assert.deepEqual(ll.last(), 0);
assert.deepEqual(ll.length(), 3);

ll.pop();
assert.deepEqual(ll.last(), 3);
assert.deepEqual(ll.length(), 2);

ll.pop();
assert.deepEqual(ll.last(), 2);
assert.deepEqual(ll.length(), 1);

ll.pop();
assert.deepEqual(ll.last(), null);
assert.deepEqual(ll.length(), 0);

ll.push(1);
assert.deepEqual(ll.last(), 1);
assert.deepEqual(ll.length(), 1);