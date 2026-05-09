const cheerio = require('cheerio');

const content = `<p>実測ではPingが約9ms上昇しましたが、34msという数値はFPS・TPSのゲームプレイに支障が出るレベルではありません。</p>
<a href="https://px.a8.net/svt/ejp?a8mat=4B3LMN+BLYBG2+3YFI+61Z81" target="_blank" rel="noopener noreferrer">[btn]NordVPNでラグとDDoS対策を始める</a>`;

const $ = cheerio.load(content, null, false);

$('a').each((_, element) => {
  const $el = $(element);
  const text = $el.text();
  console.log("Found A tag with text:", text);
  if (text.includes('[btn]')) {
    $el.text(text.replace('[btn]', '').trim());
    $el.addClass('btn-signup');
    $el.append('<svg class="btn-icon"></svg>');
  }
});

console.log($.html());
