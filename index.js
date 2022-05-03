var http = require('http');
const app = require('./app');


var server = http.createServer(app);

server.listen(9090, () => {
    console.info(`server started on port 9090)`);
});