var url = require('url');
var helpers = require('./http-helpers');
var path = require('path');
var archive = require('../helpers/archive-helpers');
// var fs = require('fs');
// require more modules/folders here!
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
    //console.log(urlPath);
    helpers.serveAssets(response, urlPath, function(){
      if (urlPath[0] === '/') { urlPath = urlPath.slice(1); }
      archive.isUrlInList(urlPath, function(found){
        if (found) { helpers.sendRedirect(response, '/loading.html'); }
        else { helpers.send404(response); }
      })
    });
  },
  'POST': function(request, response){
    helpers.collectData(request, function(data){
      var url = JSON.parse(data).url.replace('http://',"");
      // console.log("POSTurl",url);
      archive.isUrlInList(url, function(exists){ //inSites.txt
        if (exists) {
          archive.isUrlArchived(url, function(found){ //is archived
            if (found) {
          helpers.sendRedirect(response, '/' + url);
            } else {
          helpers.sendRedirect(reponse, '/loading.html');
            }
          });
        } else {
          archive.addUrlToList(url, function(){
            helpers.sendRedirect(response, '/loading.html');
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

// exports.handleRequest = function (req, res) {
//   // console.log('res', Object.keys(res));
//     if (req.method === 'GET') {
//       if(req.url === '/'){
//         fs.readFile(pathtoHTML, function(error, data){ //
//           if(error){
//             throw error;
//           };
//           res.writeHead(200, headers);
//           res.write(data.toString('utf-8'));
//           res.end();
//         });
//       }
//       else{
//         // if file requested doesn't exist, writeHead(404, ..);
//         var fullPath = archive.paths.archivedSites + req.url;
//         fs.exists(fullPath, function(exists){
//           // console.log('exists', exists);
//           if(!exists){
//             res.writeHead(404, headers);
//             res.end();
//           }else{
//             // read file, return data.
//             fs.readFile(fullPath, function(error, data){
//           //console.log('data', data.toString('utf-8'));
//             if(error){
//               throw error;
//             }
//             // writeHead(200)
//             res.writeHead(200, headers);
//             res.write(data.toString('utf-8'));
//             res.end();
//             });
//           }
//         });
//       }
//     } else if(req.method === 'POST'){
//       // remember in chatterbox how you get the data.
//       // .send() is sending data with post
//       req.on('data', function(chunks){
//         var urlOn = JSON.parse(chunks);
//         archive.addUrlToList(urlOn['url']);
//         res.writeHead(302, headers);
//         res.end();
//       });
//    }

//   };