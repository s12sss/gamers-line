const fs = require('fs');
const path = './src/data/isps.json';
let content = fs.readFileSync(path, 'utf8');

// replace "10ギガ" with "10G"
content = content.replace(/10ギガ/g, '10G');

fs.writeFileSync(path, content);
console.log("Renamed 10ギガ to 10G in isps.json!");
