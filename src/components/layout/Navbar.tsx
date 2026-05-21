'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut, FiUser, FiStar, FiChevronDown } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { useUser } from '@/lib/UserContext';
import toast from 'react-hot-toast';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/tutorials', label: 'Tutorial' },
  { href: '/kelas', label: 'Kelas' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/showcase', label: 'Showcase' },
  { href: '/pro', label: 'Premium' },
  { href: '/jobs', label: 'Lowongan' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUser();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    toast.success('Berhasil keluar akun');
    router.push('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-md shadow-slate-100/10' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-lg">BD</span>
            </div>
            <span className="font-heading text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Bajo<span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Dev</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-indicator" 
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" 
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700/80"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700"
                  />
                  <div className="hidden sm:block text-left max-w-[100px]">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{user.name}</p>
                    {user.isPremium ? (
                      <span className="inline-flex items-center text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest leading-none">
                        <FiStar size={8} className="fill-amber-500 mr-0.5 text-amber-500" /> Pro
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-400 font-medium">Free Member</span>
                    )}
                  </div>
                  <FiChevronDown size={14} className={`text-slate-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1 z-50"
                    >
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-400">Masuk sebagai</p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">@{user.username}</p>
                      </div>

                      {user.isPremium && (
                        <div className="px-4 py-2 bg-amber-500/10 border-b border-slate-100 dark:border-slate-700 flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-400 font-semibold">
                          <FiStar className="fill-amber-500 text-amber-500" size={14} /> Member Premium Pro
                        </div>
                      )}

                      <Link
                        href="/roadmap"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors"
                      >
                        <FiUser size={14} /> Progress Belajar
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left border-t border-slate-100 dark:border-slate-700 mt-1"
                      >
                        <FiLogOut size={14} /> Keluar Akun
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="hidden md:inline-flex px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-500/15 hover:shadow-blue-500/25 active:scale-98"
              >
                Masuk
              </Link>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800"
            >
              <div className="py-3 px-2 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-blue-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {!user && (
                  <Link 
                    href="/login" 
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl mt-3 shadow-md"
                  >
                    Masuk Akun
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}