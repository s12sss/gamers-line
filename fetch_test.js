const https = require('https');

const options = {
  hostname: 'gamers-line-blog.microcms.io',
  path: '/api/v1/columns?limit=1',
  method: 'GET',
  headers: {
    'X-MICROCMS-API-KEY': 'iX8ZnvUWwwaPhQdWA6PjawROnNF44nPqHEMp'
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(data), null, 2)));
});

req.on('error', e => console.error(e));
req.end();
