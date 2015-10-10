var value = 0;

function doWork() {
  for(var i = 1; i < 10; i++) {
    value += i^2;
  }
}

function cleanup() {
  performance.clearMarks();
  performance.clearMeasures();
}

