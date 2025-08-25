const http = require('http');
const https = require('https');
const fs = require('fs');

// Self-signed certificate for HTTPS testing
let httpsOptions = {};
try {
  httpsOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };
} catch (e) {
  console.log('Certificate files not found. Please run: node generate-cert.js');
  console.log('Only HTTP server will be started.');
}

// Create HTTP server
const httpServer = http.createServer((req, res) => {
  console.log(`HTTP Request: ${req.method} ${req.url} from ${req.headers.host}`);
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Response from HTTP server',
    protocol: 'http',
    host: req.headers.host,
    url: req.url
  }));
});

// Start servers
httpServer.listen(3000, () => {
  console.log('HTTP server listening on port 3000');
});

// Only start HTTPS server if certificates are available
if (httpsOptions.key && httpsOptions.cert) {
  const httpsServer = https.createServer(httpsOptions, (req, res) => {
    console.log(`HTTPS Request: ${req.method} ${req.url} from ${req.headers.host}`);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Response from HTTPS server',
      protocol: 'https',
      host: req.headers.host,
      url: req.url
    }));
  });
  
  httpsServer.listen(3443, () => {
    console.log('HTTPS server listening on port 3443');
  });
  
  process.on('SIGINT', () => {
    console.log('\nShutting down...');
    httpServer.close();
    httpsServer.close();
    process.exit(0);
  });
} else {
  process.on('SIGINT', () => {
    console.log('\nShutting down...');
    httpServer.close();
    process.exit(0);
  });
}