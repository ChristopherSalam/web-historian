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
var urlList = [];

exports.readListOfUrls = function(){
	// loop through sites.txt
	// have a container with all the url's.
	fs.open(archSites, 'r',function(err, fd){
		fs.readFile(archSites, function(err, data){
			urlList = data.toString('utf-8').replace(/\n/g," ").split(" "); 
			// urlList = results;
			fs.close(fd);
		});
	});
};

exports.isUrlInList = function(url){
	// loop through list of url's.
	// if url is in there, then return true;
    // var cleanUrl = url.replace(/\//,"");
    if( urlList.indexOf(url) === -1){
    	return false;
    }
    return true;
};

exports.addUrlToList = function(url){
	if (exports.isUrlInList(url)) { 
		// console.log('in list');
	} else {
		fs.open(exports.paths.list,'r+',function(err, fd){
			if(err){throw err;}
			fs.writeFile(archSites, (url + '\n'), function(err){
				if(err){throw err;}
				console.log('success');
			});
		});
	}
};

exports.isUrlArchived = function(url){
	//loop through the sites directory
	//and check if site page is present return true
	// fs.exists(exports.paths, callback)
};

exports.downloadUrls = function(url){
	// render the content of sites/url
};
