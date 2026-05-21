'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiHome, FiBookOpen, FiStar, FiBriefcase } from 'react-icons/fi';

const items = [
  { href: '/', label: 'Beranda', icon: FiHome },
  { href: '/tutorials', label: 'Tutorial', icon: FiBookOpen },
  { href: '/pro', label: 'Premium', icon: FiStar },
  { href: '/jobs', label: 'Lowongan', icon: FiBriefcase },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="relative flex flex-col items-center justify-center w-16 h-full">
              {isActive && (
                <motion.div layoutId="bottom-nav" className="absolute top-0 left-2 right-2 h-1 bg-blue-600 rounded-b-full" />
              )}
              <Icon size={20} className={`mb-1 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className={`text-xs ${isActive ? 'text-blue-600 font-medium' : 'text-slate-500'}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}