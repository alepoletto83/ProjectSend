'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'ProjectSend' },
  { href: '/sessions', label: 'Sessões' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-3xl px-6 py-3 flex gap-4 text-sm">
        {LINKS.map(({ href, label }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={
                isActive
                  ? 'font-medium text-black'
                  : 'text-zinc-500 hover:text-black'
              }>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
