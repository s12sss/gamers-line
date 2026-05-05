const { createClient } = require('microcms-js-sdk');

const client = createClient({
  serviceDomain: 'gamers-line-blog',
  apiKey: 'iX8ZnvUWwwaPhQdWA6PjawROnNF44nPqHEMp',
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
