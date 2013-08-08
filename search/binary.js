var assert = require('assert');

/**
 * Find a value in a sorted array.
 *
 * Takes a sorted array and a value to look for, and returns the index or null.
 * It recurses into itself with every-smaller halves of the original array until
 * it has an empty array or the value it needs.
 */
var search = function search(arr, val, min, max) {
  if (!min) { min = 0; }
  if (!max) { max = arr.length; }
  if (max - min === 0) { return null; }

  var mid = min + Math.floor((max - min) / 2),
      midVal = arr[mid];

  if (val < midVal) {
    return search(arr, val, min, mid);
  }
  if (val > midVal) {
    return search(arr, val, mid + 1, max);
  }
  return mid;
};

assert.deepEqual(search([1,2,3,4], 1), 0);
assert.deepEqual(search([1,2,3,4], 2), 1);
assert.deepEqual(search([1,2,3,4], 4), 3);
assert.deepEqual(search([1,2,3,4,5,6], 4), 3);
assert.deepEqual(search([1,2,3,4], 5), null);
assert.deepEqual(search([1,3,4,10,25,90], 5), null);
assert.deepEqual(search([1,3,4,10,25,90], 25), 4);
assert.deepEqual(search([], 1), null);