var url = require('url');
var helpers = require('./http-helpers');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var pathtoHTML = path.join('web', 'public/index.html');

exports.headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": 'Content-Type, Authorization, Content-Length, X-Requested-With',
  "access-control-max-age": 10, // Seconds.
  'Content-Type': 'text/html'
};

var actions = {
  'GET': function(request, response){
    var parts = url.parse(request.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    helpers.serveAssets(response, urlPath);
  },
  'POST': function(request, response){
    helpers.collectData(request, function(data){
      var url = JSON.parse(data).url.replace('http://',"");
      console.log("POSTurl",url);
      archive.isUrlInList(url, function(target){
        if (target) {
          archive.isUrlArchived(url, function(found){
            if (found) {
          helpers.sendRedirect(response, '/'+url);
            } else {
          helpers.sendRedirect(reponse, data);
            }
          });
        } else {
          archive.addUrlToList(url, function(){
            helpers.send(response, '/loading.html');
          });
        }
      });
    }); //no // append
  } // archive.isUrlInList(url, function(found){
}

exports.handleRequest = function (request, response) {
  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    helpers.send(response, "Nope", 404);
  }
};

// ajax, servers servers .... dom span
