importScripts("../support/testharness.js");
importScripts("../support/testharnessreport.js");

promise_test(function(test) {
  return new Promise(function(resolve) {
      var expectedResources = ['/support/testharness.js', '/support/testharnessreport.js'];
      var resources = performance.getEntriesByType("resource");
      assert_equals(resources.length, expectedResources.length);
      for(var i=0; i< resources.length; i++) {
        assert_greater_than(resources[i].startTime, 0);
        assert_equals(resources[i].workerStart, 0);
        assert_greater_than(resources[i].responseEnd, resources[i].startTime);
      }

      performance.onresourcetimingbufferfull = test.step_func(function(evt) {
        performance.clearResourceTimings();
      });
      performance.setResourceTimingBufferSize(expectedResources.length);
    })
    .then(function() {
      performance.clearResourceTimings();
      assert_equals(performance.getEntriesByType('resource').length, 0);
    });
}, "Test Resource Timing for Web Workers");
