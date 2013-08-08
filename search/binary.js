var assert = require('assert');

/**
 * Find a value in a sorted array.
 *
 * Takes a sorted array and a value to look for, and returns the index or null.
 * It recurses into itself with every-smaller halves of the original array until
 * it has an empty array or the value it needs.
 */
var search = function search(arr, val) {
  var pivot = Math.floor(arr.length / 2),
      pivotVal = arr[pivot];
  if (!arr.length) { return null; }
  if (val === pivotVal) { return pivot; }
  if (val < pivotVal) { return search(arr.slice(0, pivot), val); }
  if (val > pivotVal) {
    var res = search(arr.slice(pivot + 1), val);
    if (res === null) { return null; }
    return pivot + 1 + res;
  }
  return null;
};

assert.deepEqual(search([1,2,3,4], 1), 0);
assert.deepEqual(search([1,2,3,4], 2), 1);
assert.deepEqual(search([1,2,3,4], 4), 3);
assert.deepEqual(search([1,2,3,4,5,6], 4), 3);
assert.deepEqual(search([1,2,3,4], 5), null);
assert.deepEqual(search([], 1), null);