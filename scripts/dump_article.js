const fs = require('fs');
const { createClient } = require('microcms-js-sdk');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
  }
});

const client = createClient({
  serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
  apiKey: env.MICROCMS_API_KEY,
});

async function main() {
  const data = await client.getList({
    endpoint: 'columns',
    queries: { filters: `slug[equals]10g-vs-1g` }
  });
  
  if (data.contents.length > 0) {
    fs.writeFileSync('article_dump.html', data.contents[0].content);
    console.log("Dumped to article_dump.html");
  }
}
main();
