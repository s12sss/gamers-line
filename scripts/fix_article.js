const fs = require('fs');
const { createClient } = require('microcms-js-sdk');

// Parse .env.local manually
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
  try {
    const data = await client.getList({
      endpoint: 'columns',
      queries: { filters: `slug[equals]10g-vs-1g` }
    });
    
    if (data.contents.length === 0) {
      console.log("Article not found.");
      return;
    }
    
    const article = data.contents[0];
    let contentHtml = article.content;
    
    console.log("--- ORIGINAL CONTENT SNIPPET ---");
    const snippetIndex = contentHtml.indexOf("1,500〜3,000円");
    if (snippetIndex !== -1) {
      console.log(contentHtml.substring(Math.max(0, snippetIndex - 50), snippetIndex + 100));
    } else {
      console.log("Text '1,500〜3,000円' not found!");
    }
    
    // Replace text
    contentHtml = contentHtml.replace(/1,500〜3,000円/g, "500〜1,000円");
    contentHtml = contentHtml.replace(/3〜7万円/g, "1.5〜3.5万円");
    
    // Check for tables
    if (contentHtml.includes("<table")) {
      console.log("\n--- FOUND TABLE ---");
      const tableStart = contentHtml.indexOf("<table");
      const tableEnd = contentHtml.indexOf("</table>") + 8;
      let tableHtml = contentHtml.substring(tableStart, tableEnd);
      console.log(tableHtml);
      
      // Fix table pricing!
      // Looking at common prices, if there are specific prices like "7,000円", we might need to fix them.
      // E.g., if there's "月額約6,500円" etc.
      // Let's just log it first before making blind replacements to the table.
    }

    // Patch the article
    const updateRes = await fetch(`https://${env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/columns/${article.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-MICROCMS-API-KEY': env.MICROCMS_API_KEY
      },
      body: JSON.stringify({
        content: contentHtml
      })
    });
    
    if (!updateRes.ok) {
      const err = await updateRes.text();
      console.error("Failed to patch:", updateRes.status, err);
      return;
    }
    
    console.log("Successfully updated the article!");
    
  } catch (e) {
    console.error(e);
  }
}
main();
