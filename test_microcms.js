const { createClient } = require('microcms-js-sdk');
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

const client = createClient({
  serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
  apiKey: env.MICROCMS_API_KEY,
});

client.getList({ endpoint: 'columns', queries: { limit: 1 } })
  .then(res => {
    if (res.contents.length > 0) {
      console.log("TITLE:", res.contents[0].title);
      console.log("CONTENT:\n", res.contents[0].content);
    } else {
      console.log("No articles found.");
    }
  })
  .catch(console.error);
