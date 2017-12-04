var http = require('http');
var request = require('request');
var url = require('url');
var fs = require('fs');
var path = require("path");

var shared=[];
var hologram = 0;
var detailsObj = -1;
var detailsArr=[];

http.createServer(function (req, res) {
	var q = url.parse(req.url, true);
	//console.log(q.pathname);
	//console.log(q.search);
	var pathName = q.pathname;
	if (pathName.includes('resource')) {
	  var filename = '..'+pathName;

	  var contentTypesByExtension = {
		'.html': "text/html",
		'.css':  "text/css",
		'.js':   "text/javascript"
	  };

    //console.log("filename", filename);
	  fs.exists(filename, function(exists) {
		if(!exists) {
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404 Not Found\n");
			res.end();
			return;
		}

		if (fs.statSync(filename).isDirectory()) filename += '/index.html';

		fs.readFile(filename, "binary", function(err, file) {
			if(err) {        
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write(err + "\n");
			res.end();
			return;
			}

			var headers = {};
			var contentType = contentTypesByExtension[path.extname(filename)];
			if (contentType) headers["Content-Type"] = contentType;
			res.writeHead(200, headers);
			res.write(file, "binary");
			res.end();
		});
	  });
	} else if (pathName.includes("drag")) {
		shared.push({"item":q.search.charAt(1), "pos":q.search.charAt(3)});
		console.log("dragged", q.search, "::shared::", shared);
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end();

	} else if (pathName.includes("refresh")) {
		res.writeHead(200, {"Content-Type": "application/json"});
		if (detailsObj>=0) {
			//detailsArr.push({"item":detailsObj, "pos":-1});
			//console.log("returning",JSON.stringify(detailsArr[0]));
			res.end('[{"item":"'+detailsObj+'", "pos":"-1"}]');
		} else {
			console.log("returning",JSON.stringify(shared.slice(q.search.charAt(1))));
			res.end(JSON.stringify(shared.slice(q.search.charAt(1))));
		}

	} else if (pathName.includes("change3D")) {
		hologram = q.search.charAt(1)-1;
		console.log("hologram chnges to:", hologram);
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end();
		
	} else if (pathName.includes("get3D")) {
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end(hologram.toString());

	} else if (pathName.includes("postDetails")) {
		detailsObj = q.search.charAt(1);
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end();

	} else if (pathName.includes("resetDetails")) {
		detailsObj = -1;
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end();
	}
}).listen(9000);
