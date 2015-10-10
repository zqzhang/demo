importScripts("../support/testharness.js");
importScripts("support/common.js");

promise_test(function(test) {

  return new Promise(function(resolve) {
    cleanup();

    performance.mark("startMark");
    doWork();
    performance.mark("endMark");
    performance.measure("measure", "startMark", "endMark");

    resolve();
  }).then(function() {

    var startMark = performance.getEntriesByName("startMark")[0];
    var endMark = performance.getEntriesByName("endMark")[0];
    var measure = performance.getEntriesByType("measure")[0];

    assert_equals(measure.name, "measure");
    assert_equals(measure.entryType, "measure");
    assert_equals(measure.startTime, startMark.startTime);
    //assert_approx_equals(endMark.startTime - startMark.startTime,
    //                     measure.duration, 0.001);

    assert_equals(performance.getEntriesByType("mark").length, 2);
    assert_equals(performance.getEntriesByType("measure").length, 1);
    performance.clearMarks("startMark");
    performance.clearMeasures("measure");
    assert_equals(performance.getEntriesByType("mark").length, 1);
    assert_equals(performance.getEntriesByType("measure").length, 0);
  });
}, "Performance for Web Workers");

