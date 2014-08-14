/**
 * Standalone proxy.
 * Started as a child process of the Express app.
 */
'use strict';

(function () {
  var httpProxy = require('http-proxy'),
      anyBody = require('body/any'),
      argv = require('minimist')(process.argv.slice(2)),
      _ = require('lodash'),
      _s = require('underscore.string'),
      port = argv.port || 4000,
      target = argv.target || 'http://localhost';

  // create proxy
  var proxy = httpProxy.createProxyServer({
    secure: false,
    xfwd: true
  });

  // To modify the proxy connection before data is sent, you can listen
  // for the 'proxyReq' event. When the event is fired, you will receive
  // the following arguments:
  // (http.ClientRequest proxyReq, http.IncomingMessage req,
  //  http.ServerResponse res, Object options). This mechanism is useful when
  // you need to modify the proxy request before the proxy connection
  // is made to the target.
  //
  proxy.on('proxyReq', function(proxyReq, req, res, options) {
    // proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');

    var log = _s.sprintf('[%s] %s%s -> %s',
      req.method,
      req.headers.host,
      req.url,
      '** proxified url **'
    );

    // stdout captured by the main app
    console.log(log);

    // decode body to json
    anyBody(req, res, function (__, json) {
      if (_.isObject(json)) {
        // console.log(json);
      }
    });
  });

  var server = require('http').createServer(function(req, res) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.
    proxy.web(req, res, {
      target: target
    });
  });

  console.log('Proxy listening on port ' + port + ' and proxying ' + target);
  server.listen(port);
})();
