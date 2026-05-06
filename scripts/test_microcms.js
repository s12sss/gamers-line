require('dotenv').config({ path: '.env.local' });
const { createClient } = require('microcms-js-sdk');

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

async function main() {
  try {
    const data = await client.getList({ endpoint: 'columns' });
    console.log(JSON.stringify(data.contents[0], null, 2));
  } catch (e) {
    console.error(e);
  }
}
main();
