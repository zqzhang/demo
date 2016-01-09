// http://rd.springer.com/chapter/10.1007/978-1-4302-6059-2_11/fulltext.html
// 11-3. Creating Tests with Nodeunit

// $ npm install –g nodeunit
// $ nodeunit nodeunit.js 

var test = require('nodeunit');

var three = 3;

var squareAsync = function(a, cb) {
  result = a * a;
  cb(result);
};

var square = function(a) {
  if (typeof a !== 'number') return false;
  return a * a;
};

module.exports = {
  // Listing 11-4. Using nodeunit for Testing
  '11-4': {
    'equal': function(test) {
      test.equal(3, '3', '3 equals "3"');
      test.done();
    },

    'strictEqual': function(test) {
      test.strictEqual('3', 3, '3 and "3" are not strictly equal');
      test.done();
    },

    'notEqual': function(test) {
      test.notEqual(3, 'three', '3 not equals three');
      test.done();
    },

    'ok': function(test) {
      test.ok(false, 'not truthy ');
      test.done();
    }
  },

  // Listing 11-5. Nodeunit Asynchronous Test
  '11-5': {
    'squareAsync': function(test) {
      test.expect(2);

      squareAsync(three, function(result) {
        test.equal(result, 9, 'three squared is nine');
      });

      squareAsync('three', function(result) {
        test.ok(isNaN(result), 'squaring a string returns NaN');
      });

      test.done();
    }
  },

  // Listing 11-6. Nodeunit Synchronous Test
  '11-6': {
    'squareSync': function(test) {
      test.equal(square(three), 9, 'three squared is nine');
      test.equal(square('three'), false, 'cannot square a non number');
      test.done();
    } 
  }
};