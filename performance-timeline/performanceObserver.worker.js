importScripts("../support/testharness.js");
importScripts("support/common.js");

promise_test(function(test) {

  return new Promise(function(resolve) {
    cleanup();

    var observer = new PerformanceObserver(function(list) {
      resolve(list);
      test.add_cleanup(function() {
        observer.disconnect();
      });
    });
    observer.observe({entryTypes: ["mark", "measure"]});

    performance.mark("markStart");
    doWork();
    performance.mark("markEnd");
    performance.measure("measure", "markStart", "markEnd");
    
  }).then(function(list) {

    var entries = list.getEntries();
    assert_equals(entries.length, 3,
    "Observed user timing entries should have three entries.");
  });
}, "Performance Observer for Web Workers");

promise_test(function(test) {

  return new Promise(function(resolve) {
    cleanup();

    var observer = new PerformanceObserver(function(list) {
      resolve(list);
      test.add_cleanup(function() {
        observer.disconnect();
      });
    });
    observer.observe({entryTypes: ["mark", "measure"]});
    observer.observe({entryTypes: ["measure"]});

    performance.mark("markStart");
    doWork();
    performance.mark("markEnd");
    performance.measure("measure", "markStart", "markEnd");
  }).then(function(list) {

    var entries = list.getEntries();

    assert_equals(entries.length, 1,
    "Observed user timing entries should have only one entry");
  });
}, "Observing filter is replaced by a new filter");
