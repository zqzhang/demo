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

function with_iframe(url) {
  return new Promise(function(resolve) {
    var frame = document.createElement('iframe');
    frame.src = url;
    frame.onload = function() { resolve(frame); };
    document.body.appendChild(frame);
  });
}

function unreached_rejection(test, error) {
  return test.step_func(function(error) {
    var reason = error.message || error.name || error;
    var error_prefix = prefix || 'unexpected rejection';
    assert_unreached(error_prefix + ': ' + reason);
  });
}

