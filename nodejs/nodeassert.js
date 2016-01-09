// http://rd.springer.com/chapter/10.1007/978-1-4302-6059-2_11/fulltext.html
// 11-2. Creating Tests with the Node.js assert Module

// The assert module is created in such a way that if a particular condition
// is not met for your testing needs, it will throw an assertion error.
// If all passes, the Node.js process will exit as expected.

// $ node nodeassert.js

var assert = require('assert');

// Listing 11-1. Node.js assert Basics

var three = 3;

assert.equal(three, '3', '3 equals "3"');

assert.strictEqual('3', three.toString(), '3 and "3" are not strictly equal');

assert.notEqual(three, 'three', '3 not equals three');

// assert.ok(false, 'not truthy ');

assert.ok(true, 'truthy');

// Listing 11-2. Testing Function to Square a Number Asynchronously

var squareAsync = function(a, cb) {
  result = a * a;
  cb(result);
}; 

squareAsync(three, function(result) {
  assert.equal(result, 9, '3 squared is nine');
}); 

squareAsync('three', function(result) {
  assert.ok(isNaN(result), '"Three squared is NaN');
});

// Listing 11-3. Synchronous with Node.js assert

var square = function(a) {
  if (typeof a !== 'number')
    return false;
  return a * a; 
}; 

assert.equal(square(three), 9, '3 squared equals 9');

assert.equal(square('three'),
             false,
             'should fail because "three" is not a number');
