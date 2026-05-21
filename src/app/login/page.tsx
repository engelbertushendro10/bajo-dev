'use client';

import { useState } from 'react';
import { useUser } from '@/lib/UserContext';
import { useRouter } from 'next/navigation';
import { FiGithub, FiUser, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [usernameInput, setUsernameInput] = useState('');
  const { login, user } = useUser();
  const router = useRouter();

  const handleGithubLogin = () => {
    // Generate a random developer handle
    const devNames = ['Wira_Dev', 'LombokCoder', 'BajoCoder', 'NusaTech', 'RinjaniGeek', 'KartiniJS'];
    const randomName = devNames[Math.floor(Math.random() * devNames.length)];
    login(randomName);
    toast.success(`Selamat datang kembali, ${randomName}! (Simulated)`);
    router.push('/');
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      toast.error('Masukkan username terlebih dahulu');
      return;
    }
    login(usernameInput.trim());
    toast.success(`Selamat datang, ${usernameInput}!`);
    router.push('/');
  };

  if (user) {
    return (
      <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-3xl">
            👋
          </div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">Anda Sudah Masuk</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Sebagai <span className="font-bold text-blue-600">@{user.username}</span></p>
          <button 
            onClick={() => router.push('/')}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            Kembali ke Beranda <FiArrowRight />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16 flex items-center justify-center bg-gradient-to-tr from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20">
      <div className="max-w-md w-full mx-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-blue-500/25">
              <span className="text-white font-bold text-lg">BD</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-2">Masuk ke Bajo Dev</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Pelajari coding terstruktur & bangun karir dev kamu</p>
          </div>

          <div className="space-y-4 relative z-10">
            <button 
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium rounded-xl transition-all shadow-md active:scale-98"
            >
              <FiGithub size={20} />
              Masuk dengan GitHub (Instan)
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
              <span className="px-3 text-xs text-slate-400 uppercase font-semibold">Atau tulis username</span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
            </div>

            <form onSubmit={handleCustomLogin} className="space-y-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <FiUser size={18} />
                </span>
                <input 
                  type="text" 
                  placeholder="Contoh: budi_dev" 
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 dark:text-white transition-all text-sm"
                />
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98 text-sm"
              >
                Lanjutkan <FiArrowRight />
              </button>
            </form>
          </div>

          <div className="text-center mt-6 text-xs text-slate-400/80 relative z-10">
            Dengan masuk, kamu menyetujui{' '}
            <a href="#" className="text-blue-500 hover:underline">Syarat & Ketentuan</a> kami.
          </div>
        </motion.div>
      </div>
    </div>
  );
}