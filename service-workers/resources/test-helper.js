function service_worker_unregister(test, url, scope) {
  var absoluteScope = new URL(scope, window.location).href;
  return navigator.serviceWorker.getRegistration(scope)
    .then(function(registration) {
      if(registration && registration.scope == absoluteScope) {
        return registration.unregister();
      }
    })
    .catch(unreached_rejection(test, "unregister fails"));
}

function service_worker_unregister_and_register(test, url, scope) {
  return service_worker_unregister(test, url, scope)
    .then(function() {
      return navigator.serviceWorker.register(url, {scope: scope});
    })
    .catch(unreached_rejection(test, "unregister and register fail"));
}

function wait_for_state(test, worker, state) {
  if (!worker || worker.state == undefined) {
    return Promise.reject(new Error(
      'wait_for_state must be passed a ServiceWorker'));
  }
  if (worker.state === state)
    return Promise.resolve(state);

  if (state === 'installing') {
    switch (worker.state) {
      case 'installed':
      case 'activating':
      case 'activated':
      case 'redundant':
        return Promise.reject(new Error(
          'worker is ' + worker.state + ' but waiting for ' + state));
    }
  }

  if (state === 'installed') {
    switch (worker.state) {
      case 'activating':
      case 'activated':
      case 'redundant':
        return Promise.reject(new Error(
          'worker is ' + worker.state + ' but waiting for ' + state));
    }
  }

  if (state === 'activating') {
    switch (worker.state) {
      case 'activated':
      case 'redundant':
        return Promise.reject(new Error(
          'worker is ' + worker.state + ' but waiting for ' + state));
    }
  }

  if (state === 'activated') {
    switch (worker.state) {
      case 'redundant':
        return Promise.reject(new Error(
          'worker is ' + worker.state + ' but waiting for ' + state));
    }
  }

  return new Promise(test.step_func(function(resolve) {
    worker.addEventListener('statechange', test.step_func(function() {
      if (worker.state === state)
        resolve(state);
    }));
  }));
}

function wait_for_update(test, registration) {
  if (!registration || registration.unregister == undefined) {
    return Promise.reject(new Error(
      'wait_for_update must be passed a ServiceWorkerRegistration'));
  }

  return new Promise(test.step_func(function(resolve) {
      registration.addEventListener('updatefound', test.step_func(function() {
          resolve(registration.installing);
        }));
    }));
}

// Declare a test that runs entirely in the ServiceWorkerGlobalScope. The |url|
// is the service worker script URL. This function:
// - Instantiates a new test with the description specified in |description|.
//   The test will succeed if the specified service worker can be successfully
//   registered and installed.
// - Creates a new ServiceWorker registration with a scope unique to the current
//   document URL. Note that this doesn't allow more than one
//   service_worker_test() to be run from the same document.
// - Waits for the new worker to begin installing.
// - Imports tests results from tests running inside the ServiceWorker.
function service_worker_test(url, description) {
  // If the document URL is https://example.com/document and the script URL is
  // https://example.com/script/worker.js, then the scope would be
  // https://example.com/script/scope/document.
  var scope = new URL('scope' + window.location.pathname,
                      new URL(url, window.location)).toString();
  promise_test(function(test) {
      return service_worker_unregister_and_register(test, url, scope)
        .then(function(registration) {
            add_completion_callback(function() {
                registration.unregister();
              });
            return wait_for_update(test, registration)
              .then(function(worker) {
                  return fetch_tests_from_worker(worker);
                });
          });
    }, description);
}

function with_iframe(url) {
  return new Promise(function(resolve) {
    var frame = document.createElement('iframe');
    frame.src = url;
    frame.onload = function() { resolve(frame); };
    document.body.appendChild(frame);
  });
}

function unreached_rejection(test, prefix) {
  return test.step_func(function(error) {
    var reason = error.message || error.name || error;
    var error_prefix = prefix || 'unexpected rejection';
    assert_unreached(error_prefix + ': ' + reason);
  });
}

