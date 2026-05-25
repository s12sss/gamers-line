const https = require('https');
const fs = require('fs');

function readEnvFile() {
  const env = {};
  const envFile = fs.readFileSync('.env.local', 'utf8');
  envFile.split('\n').forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
    }
  });
  return env;
}

const env = readEnvFile();

const options = {
  hostname: `${env.MICROCMS_SERVICE_DOMAIN}.microcms.io`,
  path: '/api/v1/columns?limit=1',
  method: 'GET',
  headers: {
    'X-MICROCMS-API-KEY': env.MICROCMS_API_KEY
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(data), null, 2)));
});

req.on('error', e => console.error(e));
req.end();
