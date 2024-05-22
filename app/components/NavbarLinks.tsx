'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const navbarLinks = [
  {
    id: 0,
    name: 'Home',
    href: '/',
  },
  {
    id: 1,
    name: 'Templates',
    href: '/products/template',
  },
  {
    id: 2,
    name: 'Ui Kits',
    href: '/products/uikit',
  },
  {
    id: 3,
    name: 'Icons',
    href: '/products/icon',
  },
];

export function NavbarLinks() {
  const location = usePathname();
  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2 font-bold text-xl">
      {navbarLinks.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            location === item.href
              ? 'bg-slate-300'
              : 'hover:bg-muted hover:bg-opacity-75',
            'group flex items-center px-2 py-2 font-extrabold text-violet-800 rounded-md'
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
