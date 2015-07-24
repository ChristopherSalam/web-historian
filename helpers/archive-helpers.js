var path = require('path');
var fs = require('fs');
var request = require('request');
var _= require('underscore');

var sitePath = "../archives/sites.txt"//path.join('2015-06-web-historian','archives/sites.txt')

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
		fs.readFile(exports.paths.list, function(err, sites){
			sitesData = sites.toString().split('\n');
      if (callback) { callback(sitesData); }
	});
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(sites){
    var found = _.any(sites, function(site, i){
      return site.match(url)
    });
    callback(found);
  });
};

exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.paths.list, url + '\n', function(err, file){
    callback();
  });
};

exports.isUrlArchived = function(url, callback){
	//loop through the sites directory
	//and check if site page is present return true
	// fs.exists(exports.paths, callback)
  var sitePath = path.join(exports.paths.archivedSites, url);
  fs.exists(sitePath, function(exists) {
    callback(exists);
  });
};

exports.downloadUrls = function(urls){
	// render the content of sites/url
    _.each(urls, function (url) {
    if (!url) { return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
  });
};
