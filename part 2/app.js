/*
This file contains
1. basic server which responds wheather domain is root domain or not
2. reading and responsing server requests via filestreams
tutorial- https://www.youtube.com/watch?v=RLtyhwFtXQA  01:12:00 -- 01:24:00
*/


// 1. basic server which responds wheather domain is root domain or not

/*
const http = require('http');

const server = http.createServer((req,res)=>{
	if (req.url === '/') {
		res.write('On root domain');
		res.end();
	} else {
		res.write('Not on root domain');
		res.end();
	}
});

server.listen('3000');

*/

// 2. reading and responsing via file streams
const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
	const readstream = fs.createReadStream('./static/abc.html');
	res.writeHead(200,{'Content-type':'text/html'});  // for image : image/png
	readstream.pipe(res);
});

server.listen(3000);