/**
 * Simple HTTP server to serve remote bundles.
 * Run it with `node serve-remote-bundles.js`
 */

const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 3000;

http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  let pathname = `.${url.parse(req.url).pathname}`;

  fs.stat(pathname, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      return res.end(`File ${pathname} not found!`);
    }

    fs.readFile(pathname, (err, data) => {
      if (err) {
        res.statusCode = 500;
        return res.end(`Error reading the file: ${err}`);
      }

      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      });

      setTimeout(() => {
        res.end(data);
      }, 200);
    });
  });
}).listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
