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

exports.readListOfUrls = function(urlList, callback){
	// loop through sites.txt
var urlList = [];
	// have a container with all the url's.
	fs.open(archSites, 'r',function(err, fd){
		// console.log("fsopen");
		fs.readFile(archSites, function(err, data){
			urlList.push(data.toString('utf-8')); 
			// console.log("urlList - RLURL",urlList);
			// urlList = results;
			callback(urlList);
			fs.close(fd);
		});
	});
};

exports.isUrlInList = function(url, callback){
	// loop through list of url's.
	// if url is in there, then return true;
    exports.readListOfUrls(urlList, function(urlList){
    	// console.log("isUrl inside readList");
    	// console.log("url, urlList isURL",url, urlList);
    	callback(urlList);
    	if(urlList.indexOf(url+'\n') !== -1){
    		//return true;
    		return true;
    	}
		// console.log("urlList",urlList);
		// console.log("url",url)
		// console.log('here', callback(url));
    	// return (urlList.indexOf(url) === -1);
    });
};

exports.addUrlToList = function(url){
	exports.isUrlInList(url, function(urlList){
		console.log(urlList,url);
		if(urlList.indexOf(url + '\n') === -1){
			fs.open(exports.paths.list,'r+',function(err, fd){
				if(err){throw err;}
				fs.writeFile(archSites, (url + '\n'), function(err){
					if(err){throw err;}
				});
			});
		} 
		//console.log('app');
	});
	// console.log("")
};

exports.isUrlArchived = function(url){
	//loop through the sites directory
	//and check if site page is present return true
	// fs.exists(exports.paths, callback)
};

exports.downloadUrls = function(url){
	// render the content of sites/url
};
