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

var archSites = exports.paths.archivedSites + '/sites.txt';

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
	//1.
	// loop through sites.txt
	// have a container with all the url's.
	fs.open(archSites, 'r',function(err, fd){
		fs.readFile(archSites, function(err, data){
			console.log('data inside readLIst', data.toString('utf-8'));
		})
	});

};

exports.isUrlInList = function(url){
	//2
	// loop through list of url's.
	// if url is in there, then return true;
};

exports.addUrlToList = function(url){
    // else if isUrlArchived is true, then return HTML content of file( www.google.com)
    
	// if(exports.isUrlArchived()){
	// 	// retrive file content
	// }else{
		fs.open(exports.paths.list,'w',function(err, fd){
			// console.log('data');
			fs.write(fd, url,function(err, written ,buffer){
				console.log('success');
				fs.close(fd);
			});
		});
	// }

	// create url file and add it to sites
    // var fd = fs.openSync(exports.paths.archivedSites+url,'w');

};

exports.isUrlArchived = function(url){
	//loop through the sites directory
	//and check if site page is present return true
	fs.exists(exports.paths, callback)
};

exports.downloadUrls = function(url){
	// render the content of sites/url
};
