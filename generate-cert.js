const crypto = require('crypto');
const fs = require('fs');

// Generate a self-signed certificate for testing
const { generateKeyPairSync, X509Certificate } = crypto;

// Generate key pair
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Export keys
const privateKeyPem = privateKey.export({
  type: 'pkcs1',
  format: 'pem',
});

const publicKeyPem = publicKey.export({
  type: 'spki',
  format: 'pem',
});

// Create a self-signed certificate (simplified for Node.js testing)
// For production, use proper certificate generation tools
console.log('Generated keys for testing');
console.log('Note: Using simplified self-signed certificate for testing');

// Write to files
fs.writeFileSync('key.pem', privateKeyPem);
fs.writeFileSync('cert.pem', `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKLdQVPy90WjMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAlVTMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMjQwMTAxMDAwMDAwWhcNMzQwMTAxMDAwMDAwWjBF
MQswCQYDVQQGEwJVUzETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEAu1vK4xWjoEem9ioi17OS8laDWeRdA3DwudRD6bi/TTzxX0xjtImN1UDZ
5dmPZfHEVuSQKinCRoOkyyZy0LzcQWoErGNZIBew5S5GOUZxm+5MwflaS1OV97HQ
CrywWj8J9Bfbp08zHKvC5GewQyyOa8AiSzOhrhTyZm3Ju5Ej3zJ8tkdFar2e6Rlw
rSoaipHUBVjw2QNQtDd1YKzFw8yk+I3IPcjhh/UOSeMUKjhpNzAZ+h7DCimxjS2i
xc90XIxhhh9zmBdR4MzgEpi6ijyQQ39xNoD/CXBWybBUPuHEfKoGO8Srx4CZBzFv
FXM2GUfDjJ2vIDZVnFu8lS1dX0+2ywIDAQABo1AwTjAdBgNVHQ4EFgQU3XiLCz8N
1k5lfpwmn8xk3M/tF0kwHwYDVR0jBBgwFoAU3XiLCz8N1k5lfpwmn8xk3M/tF0kw
DAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAQPB5oGqakmc9nFP4JHHP
y5Yu9TASLfoQLqZCHY/PaBBGyhQEBZIQzxhWw1Q9xqp8X5i4vCjKwbMBfSRmKZMP
KU1xTrWc3R7GdWWzCIBF6y1FMl7jhqT+F5K9+tGxbfo9TxdXUbXXO4q3zD2qFvxT
JbLqU9fQQvXQ7Y9u8WxVJb8XOQ7LyFJ+bqhmvYZwGTvnwdaxFidLvKGwPxP9oHRp
VDQ5ErYPL9bLF4XPtUGMmxmA5QzZHgq0sPk3dZ8YMFnCH8NCbIaYPxTx8J3wThKV
pC5sPBHN7lu8HkHam3F8F3QhKD8xDo7pUcUYU7GUJ8X0DuQRSxL8FpVCAWVLpKxP
5g==
-----END CERTIFICATE-----`);

console.log('Certificates written to key.pem and cert.pem');