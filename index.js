const http = require('http');
const url = require('url');
const { getMarket } = require('./test');

// function start(route, handle) {
//     function onRequest(request, response) {
//         const urlObj = url.parse(request.url);
//         const pathname = urlObj.pathname;
//         const query = urlObj.query;
//         console.log('Request for ' + pathname + ' received.' + ' query: ' + query);
//         route(pathname, query, handle, response);
//     }
//     http.createServer(onRequest).listen(process.env.port);
//     console.log('Server has started.');
// }

// // exports.start = start;
// start();

const server = http.createServer(function(request, response) {});
server.listen(process.env.PORT);

setInterval(() => {
    getMarket();
}, 3000);
