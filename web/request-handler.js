var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!
var pathtoHTML = path.join('web', 'public/index.html'); 
var headers = {
	'Content-Type': 'text/html'
}

exports.handleRequest = function (req, res) {
  // console.log('res', Object.keys(res));
  	if (req.method === 'GET') {
  		if(req.url === '/'){
		  	fs.readFile(pathtoHTML, function(error, data){ //
		  		if(error){
		  			throw error;
		  		};
			  	res.writeHead(200, headers);
			  	res.write(data.toString('utf-8'));
			  	res.end();
		    });
  		}
  		else{
  			// if file requested doesn't exist, writeHead(404, ..);
  			var fullPath = archive.paths.archivedSites + req.url;
  			fs.exists(fullPath, function(exists){
  				console.log('exists', exists);
  				if(!exists){
  					res.writeHead(404, headers);
  					res.end();
  				}else{
  					// read file, return data. 
  					fs.readFile(fullPath, function(error, data){
					//console.log('data', data.toString('utf-8'));
						if(error){
							throw error;
						}
						// writeHead(200)
						res.writeHead(200, headers);
						res.write(data.toString('utf-8'));
						res.end();
  					});
  				}
  			});
  		}
    } else if(req.method === 'POST'){
    	// check if the url exists on sites.txt
    	archive.addUrlToList(req.url);
    	// check if file exists on archive/sites folder

    	// if so, return archived HTML info


    	// if not, add URL  to  site.txt file
    	// create the file on archive/sites with returned information. 
    }

};
