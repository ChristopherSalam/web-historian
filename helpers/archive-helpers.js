var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var sitePath = "../archives/sites.txt"//path.join('2015-06-web-historian','archives/sites.txt')
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

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

var archSites = exports.paths.list;

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
	var urlList = [];
	// loop through sites.txt
	// have a container with all the url's.
	function processArrayData(err, data){
		var results = data.toString('utf-8').replace(/\n/g," ").split(" "); 
		urlList = results;
	};

	function results(){
		fs.open(archSites, 'r',function(err, fd){
			fs.readFile(archSites, function(err, data){
				processArrayData(err,data);
				fs.close(fd);
				return urlList;
			});
		});
	};
	results();
	// console.log('ur', urlList);
	// return urlList;
};

exports.isUrlInList = function(url){
	// loop through list of url's.
	// if url is in there, then return true;

	// console.log('a',exports.readListOfUrls());
	var arrayOfUrls = exports.readListOfUrls();
	console.log('arrayOfUrls',arrayOfUrls);

    // console.log("newURL",url.replace(/\//,""));
    var cleanUrl = url.replace(/\//,"");
    if (arrayOfUrls.indexOf(cleanUrl)) { 
    	return true; 
    }
    return false;
};

exports.addUrlToList = function(url){

	var cleanUrl = url.replace(/\//,"");

	// if isUrlInList true, then
	if (exports.isUrlInList(cleanUrl)) { 
		console.log('not here');
	} else {
		fs.open(exports.paths.list,'w',function(err, fd){
			// console.log('data');
			fs.write(fd, cleanUrl, function(err, written ,buffer){
				// console.log('success');
				fs.close(fd);
			});
		});
	}
	// create url file and add it to sites
    // var fd = fs.openSync(exports.paths.archivedSites+url,'w');

};

exports.isUrlArchived = function(url){
	//loop through the sites directory
	//and check if site page is present return true
	// fs.exists(exports.paths, callback)
};

exports.downloadUrls = function(url){
	// render the content of sites/url
};
