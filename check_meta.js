fetch('https://gamers-line.jp/')
  .then(res => res.text())
  .then(html => {
    const metaTags = html.match(/<meta[^>]*>/g);
    const ogTags = metaTags.filter(tag => tag.includes('og:image') || tag.includes('twitter:image'));
    console.log(ogTags.join('\n'));
  });
