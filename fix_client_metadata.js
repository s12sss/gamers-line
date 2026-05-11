const fs = require('fs');
const path = require('path');

const dirs = ['area', 'compare', 'provider', 'ranking', 'speedtest'];

for (const dir of dirs) {
  const pageFile = path.join('src/app', dir, 'page.tsx');
  const layoutFile = path.join('src/app', dir, 'layout.tsx');

  // 1. Revert page.tsx
  let content = fs.readFileSync(pageFile, 'utf-8');
  content = content.replace(/import type { Metadata } from "next";\n?/g, '');
  content = content.replace(/import { Metadata } from "next";\n?/g, '');
  content = content.replace(/\nexport const metadata: Metadata = \{\n  alternates: \{\n    canonical: '.*?',\n  \},\n\};\n?/g, '');
  fs.writeFileSync(pageFile, content);
  console.log(`Reverted ${pageFile}`);

  // 2. Create layout.tsx
  const layoutContent = `import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  alternates: {
    canonical: '/${dir}',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
`;
  fs.writeFileSync(layoutFile, layoutContent);
  console.log(`Created ${layoutFile}`);
}
