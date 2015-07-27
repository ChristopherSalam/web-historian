var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

exports.headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": 'Content-Type, Authorization, Content-Length, X-Requested-With',
  "access-control-max-age": 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.send = function(response, data, statusCode) {
  statusCode = statusCode || 200
  response.writeHead(statusCode, exports.headers);
  response.end(data);
}

exports.collectData = function (request, callback) {
    var fullBody = '';
    request.on('data', function (chunk) {
      fullBody += chunk;
    });
    request.on('end',  function () {
      callback(fullBody);
    });
  }

exports.serveAssets = function (response, asset, callback) {
  var encoding = {encoding: 'utf-8'};

  fs.readFile(archive.paths.siteAssets + asset, encoding, function(err, data){
    if (err){
      fs.readFile(archive.paths.archivedSites + asset, encoding, function(err, data){
        if (err){
          callback ? callback() : exports.send404(response);
        } else {
          exports.send(response, data);
        }
      });
    } else {
      exports.send(response, data)
    }
  });
};

exports.sendRedirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {location: location});
  response.end();
};

exports.send404 = function(response){
  exports.send(response, '404: Page not found', 404);
}