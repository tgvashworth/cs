var assert = require('assert');

/**
 * Doubly-linked-list.
 *
 * Supports push, pop, unshift, shift, enqueue, dequeue, at, rm, last, first
 * and length, plus traverse for logging.
 */
var linkedList = (function () {
  var linkedList = {};

  /**
   * Push a node to the front of the list
   */
  linkedList.push = function (val) {
    var newNode = {};
    newNode.value = val;
    if (this.head) {
      this.head.next = newNode;
      newNode.prev = this.head;
    }
    if (!this.tail) { this.tail = newNode; }
    this.head = newNode;
    return this;
  };

  /**
   * Pop the last node off the end. Dequeue.
   */
  linkedList.pop = linkedList.dequeue = function () {
    if (!this.head) { return null; }
    var len = this.length();
    return this.rm(len - 1);
  };

  /**
   * Add an element to the start (tail) of the list. Enqueue.
   */
  linkedList.unshift = linkedList.enqueue = function (val) {
    if (!this.tail) { return this.push(val); }
    var newNode = {};
    newNode.value = val;
    newNode.next = this.tail;
    this.tail.prev = newNode;
    this.tail = newNode;
    return this;
  };

  /**
   * Remove an element from the start (tail) of the list.
   */
  linkedList.shift = function () {
    if (!this.tail) { return null; }
    return this.rm(0);
  };

  /**
   * Grab the first value from the list
   */
  linkedList.first = function (val) {
    if (!this.tail) { return null; }
    return this.tail.value;
  };

  /**
   * Grab the last value from the list
   */
  linkedList.last = function (val) {
    if (!this.head) { return null; }
    return this.head.value;
  };

  /**
   * Grab a value out from the list
   */
  linkedList.at = function (index) {
    if (!this.head) { this.head = this.tail; }
    if (!this.tail) { return null; }
    var visited = 0,
        current = this.tail;
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
    if (!this.tail) { return null; }
    var visited = 0,
        current = this.tail,
        last = null;
    while (current && visited < index) {
      last = current;
      current = current.next;
      visited++;
    }
    var next = current.next;
    if (last) {
      last.next = next;
      if (next) {
        next.prev = last;
      }
    }
    if (this.tail === current) { this.tail = next; }
    if (this.head === current) { this.head = last; }
    delete current.next;
    delete current.prev;
    return current.value;
  };

  /**
   * Get the list's length
   */
  linkedList.length = function () {
    if (!this.tail) { return 0; }
    var visited = 0,
        current = this.tail;
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
    if (!this.tail) { return; }
    var visited = 0,
        current = this.tail;
    assert.strictEqual(current.value, this.at(0));
    while (current.next) {
      console.log('%d: %d', visited++, current.value);
      if (current.next) {
        assert.strictEqual(current.next, current.next.prev);
      }
      current = current.next;
    }
    console.log('%d: %d', visited++, current.value);
    assert.strictEqual(current, this.head);
    return this;
  };

  return linkedList;
}());

module.exports = linkedList;

if (require.main === module) {

  console.log('running tests...');

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

  ll.unshift(2);

  assert.deepEqual(ll.first(), 2);
  assert.deepEqual(ll.length(), 2);

  assert.deepEqual(ll.shift(), 2);
  assert.deepEqual(ll.length(), 1);

  ll.traverse();

  console.log('done');

}