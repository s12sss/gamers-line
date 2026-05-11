const fs = require('fs');

const pages = [
  { file: 'src/app/page.tsx', path: '/' },
  { file: 'src/app/about/page.tsx', path: '/about' },
  { file: 'src/app/column/page.tsx', path: '/column' },
  { file: 'src/app/diagnosis/page.tsx', path: '/diagnosis' },
  { file: 'src/app/privacy/page.tsx', path: '/privacy' },
  { file: 'src/app/disclaimer/page.tsx', path: '/disclaimer' },
  { file: 'src/app/provider/page.tsx', path: '/provider' },
  { file: 'src/app/compare/page.tsx', path: '/compare' },
  { file: 'src/app/ranking/page.tsx', path: '/ranking' },
  { file: 'src/app/speedtest/page.tsx', path: '/speedtest' },
  { file: 'src/app/area/page.tsx', path: '/area' },
];

for (const p of pages) {
  let content = fs.readFileSync(p.file, 'utf-8');
  
  if (content.includes('export const metadata')) {
    console.log(`Skipping ${p.file} as it already has metadata.`);
    continue;
  }

  const importStr = `import type { Metadata } from "next";\n`;
  const metadataStr = `\nexport const metadata: Metadata = {\n  alternates: {\n    canonical: '${p.path}',\n  },\n};\n`;

  // Prepend import if not present
  if (!content.includes('import type { Metadata }') && !content.includes('import { Metadata }')) {
    // Insert at the beginning, but after 'use client' if it exists
    if (content.startsWith('"use client"') || content.startsWith("'use client'")) {
      const parts = content.split('\n');
      parts.splice(1, 0, importStr);
      content = parts.join('\n');
    } else {
      content = importStr + content;
    }
  }

  // Append metadata before default export
  const exportDefaultIndex = content.indexOf('export default function');
  if (exportDefaultIndex !== -1) {
    content = content.slice(0, exportDefaultIndex) + metadataStr + '\n' + content.slice(exportDefaultIndex);
  } else {
    // Fallback if no export default function found
    content += metadataStr;
  }

  fs.writeFileSync(p.file, content);
  console.log(`Added canonical to ${p.file}`);
}
