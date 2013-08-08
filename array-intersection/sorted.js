var assert = require('assert');

/**
 * Find the intersection of two sorted arrays.
 *
 * This uses a kind of 'shuffle' starting with two pointers at the beginning of
 * each array. They are both incremented when the values match, otherwise the
 * smaller is matched.
 *
 * Worst case: O(m + n) where m = len(a), n = len(b)
 */
var intersection = function (a, b) {
  var ids = [],
      ai = 0, bi = 0;
  while (ai < a.length && bi < b.length) {
    if (a[ai] === b[bi]) {
      ids.push(a[ai]);
      ai++;
      bi++;
    } else {
      if (a[ai] > b[bi]) {
        bi++;
      } else {
        ai++;
      }
    }
  }
  return ids;
};

assert.deepEqual(intersection([1,2,3,4], [3,4,5,6]), [3,4]);
assert.deepEqual(intersection([1,5,10,12], [5,9,11,12]), [5,12]);
assert.deepEqual(intersection([1,5,10,12,15], [5,9,11,12]), [5,12]);
assert.deepEqual(intersection([], [1]), []);
assert.deepEqual(intersection([0], [0]), [0]);