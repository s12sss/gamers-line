fetch('https://gamers-line.jp/opengraph-image?45e00c34ea9f5971')
  .then(res => console.log('Status:', res.status, res.statusText))
  .catch(err => console.error(err));
