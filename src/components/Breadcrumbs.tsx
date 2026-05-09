import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = {
  name: string;
  path?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path ? `https://gamers-line.jp${item.path}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto pb-2 -mb-2">
        <ol className="flex items-center gap-1.5 sm:gap-2 text-[0.7rem] sm:text-[0.78rem] text-text-dim font-mono tracking-[0.03em] whitespace-nowrap min-w-max">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.name} className="flex items-center gap-1.5 sm:gap-2">
                {isLast ? (
                  <span className="text-text-muted uppercase" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.path || '#'}
                      className="hover:text-text-muted transition-colors uppercase"
                    >
                      {item.name}
                    </Link>
                    <span className="opacity-40">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
