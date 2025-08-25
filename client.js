const http = require('http');
const https = require('https');
const { useAgent } = require('request-filtering-agent');

// Disable certificate validation for self-signed cert
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Test function
async function testRequest(url) {
  return new Promise((resolve) => {
    try {
      const agent = useAgent(url);
      const client = url.startsWith('https') ? https : http;
      
      client.get(url, { agent }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          console.log(`✅ ${url} - ALLOWED`);
          resolve(true);
        });
      }).on('error', (error) => {
        console.log(`❌ ${url} - BLOCKED: ${error.message}`);
        resolve(false);
      });
    } catch (error) {
      console.log(`❌ ${url} - BLOCKED: ${error.message}`);
      resolve(false);
    }
  });
}

// Run tests
async function runTests() {
  const packageJson = require('./package.json');
  const version = packageJson.dependencies['request-filtering-agent'];
  
  console.log(`\nTesting with request-filtering-agent: ${version}\n`);
  
  console.log('=== HTTP TESTS ===');
  const httpResults = {
    '127.0.0.1': await testRequest('http://127.0.0.1:3000/test'),
    'localhost': await testRequest('http://localhost:3000/test')
  };
  
  console.log('\n=== HTTPS TESTS ===');
  const httpsResults = {
    '127.0.0.1': await testRequest('https://127.0.0.1:3443/test'),
    'localhost': await testRequest('https://localhost:3443/test')
  };
  
  console.log('\n=== RESULT ===');
  if (httpResults['127.0.0.1'] || httpsResults['127.0.0.1']) {
    console.log('⚠️  VULNERABLE: 127.0.0.1 is ALLOWED (should be blocked)');
    if (httpResults['127.0.0.1']) console.log('  - HTTP 127.0.0.1 allowed');
    if (httpsResults['127.0.0.1']) console.log('  - HTTPS 127.0.0.1 allowed');
  } else {
    console.log('✅ SAFE: 127.0.0.1 is properly BLOCKED for both HTTP and HTTPS');
  }
}

// Wait for server and run
setTimeout(runTests, 1000);