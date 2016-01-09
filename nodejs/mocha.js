// http://rd.springer.com/chapter/10.1007/978-1-4302-6059-2_11/fulltext.html
// 11-4. Creating Tests with Mocha

// $ npm install –g mocha
// $ mocha mocha.js

// Listing 11-8. Using the Mocha Framework

var assert = require('assert'); 

var three = 3; 

describe('11-8', function() {
  describe('#equal', function() {
    it('should return true that 3 equals "3"', function() {
      assert.equal(three, '3', '3 equals "3"'); 
    });
  });

  describe("#strictEqual", function() {
    it('"3" only strictly equals 3.toString()', function() {
      assert.strictEqual('3',
                         three.toString(),
                         '3 and "3" are not strictly equal');
    });
  });

  describe("#notEqual", function() {
    it('should be that 3 is not equal to three', function() {
      assert.notEqual(three, 'three', '3 not equals three');
    });
  });

  describe("#ok", function() {
    it('should return that false is not truthy', function() {
      assert.ok(false, 'not truthy ');
    });
  });

  describe("#ok", function() {
    it('should be true that true is truthy', function() {
      assert.ok(true, 'truthy');
    });
  });
});

// Listing 11-9. Mocha Asynchronous Tests

var squareAsync = function(a, cb) { 
  result = a * a; 
  cb(result); 
}; 

squareAsync(three, function(result) { 
  result.should.equal(9, 'three squared is nine'); 
}); 

squareAsync('three', function(result) { 
  // NaN !== NaN 
  result.should.not.equal(result); 
}); 

// Listing 11-10. Mocha Synchronous Test

var square = function(a) { 
  if (typeof a !== 'number')
    return false; 
  return a * a; 
}; 

describe('11-10 sync', function() {
  describe('square a number', function() {
    it('should do this syncronously', function() {
      square(three).should.equal(9);
    });

    it('should fail when the target is not a number', function() {
      square('three').should.be.false;
    });
  });
});

// Listing 11-11. Building a Test Suite with Mocha

describe('Test suite', function() {
  describe('test-case', function() {
    // tests go here
    // Listing 11-12. Test Failure Description
    it('should return true that 3 equals "3"', function() {
      assert.equal(three, '3', '3 equals "3"');
    });
  });
});
