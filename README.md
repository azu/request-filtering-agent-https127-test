# request-filtering-agent 127.0.0.1 Vulnerability Test

This repository demonstrates a vulnerability in `request-filtering-agent` v1.1.2 where requests to `127.0.0.1` are incorrectly allowed instead of being blocked.

## The Issue

In `request-filtering-agent` v1.1.2, URLs with `127.0.0.1` (localhost IP) bypass the security filter and are treated as safe, when they should be blocked like other local addresses. This affects both HTTP and HTTPS requests. This vulnerability has been silently fixed in later versions, but without security advisories or Dependabot alerts, users remain unaware and vulnerable.

## How to Test

### 1. Install dependencies
```bash
npm install
```

### 2. Start the test servers
In terminal 1:
```bash
npm run server
```
This starts both HTTP (port 3000) and HTTPS (port 3443) servers.

### 3. Test with vulnerable version (v1.1.2)
In terminal 2:
```bash
npm run test:old
```

Expected output:
- ✅ `http://127.0.0.1:3000/test` - ALLOWED (vulnerability present)
- ❌ `http://localhost:3000/test` - BLOCKED
- ✅ `https://127.0.0.1:3443/test` - ALLOWED (vulnerability present)
- ❌ `https://localhost:3443/test` - BLOCKED

### 4. Test with latest version
```bash
npm run test:latest
```

Expected output:
- ❌ `http://127.0.0.1:3000/test` - BLOCKED (vulnerability fixed)
- ❌ `http://localhost:3000/test` - BLOCKED
- ❌ `https://127.0.0.1:3443/test` - BLOCKED (vulnerability fixed)
- ❌ `https://localhost:3443/test` - BLOCKED

## Files

- `server.js` - HTTP/HTTPS test server
- `client.js` - Test client that uses `request-filtering-agent`
- `package.json` - Dependencies and test scripts
- `generate-cert.js` - Certificate generator for HTTPS testing

## Certificate Setup

For HTTPS testing, generate self-signed certificates:
```bash
# Option 1: Use OpenSSL
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout key.pem -out cert.pem -days 365

# Option 2: Use the included generator
node generate-cert.js
```
## Security Impact

Applications using `request-filtering-agent` v1.1.2 or earlier are vulnerable to SSRF attacks via `127.0.0.1` URLs. This could allow attackers to:
- Access internal services running on localhost
- Bypass security controls meant to prevent local network access
- Potentially escalate to more serious attacks

## Recommendation

Update `request-filtering-agent` to the latest version immediately if you're using v1.1.2 or earlier.