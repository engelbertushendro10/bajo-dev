'use client';

import { useUser } from '@/lib/UserContext';
import Link from 'next/link';
import { FiPlay, FiClock, FiUser, FiLock, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const kelasData = [
  {
    id: 'next14',
    title: 'Full Stack Next.js 14',
    description: 'Bangun aplikasi web modern skala produksi menggunakan Next.js App Router, Prisma ORM, PostgreSQL, dan Tailwind CSS.',
    videoId: 'dQw4w9WgXcQ', // Rick Astley placeholder, or any tutorial video
    duration: '4 jam 30 menit',
    instructor: 'Bajo Dev Team',
    isPremium: true,
  },
  {
    id: 'react_pemula',
    title: 'React.js Dasar untuk Pemula',
    description: 'Kuasai library JavaScript terpopuler: pelajari konsep komponen, state, props, lifecycle, hooks, dan fetching data.',
    videoId: 'dQw4w9WgXcQ',
    duration: '3 jam',
    instructor: 'Bajo Dev Team',
    isPremium: false,
  },
  {
    id: 'node_express',
    title: 'Backend Node.js + Express API',
    description: 'Buat REST API tangguh lengkap dengan sistem otentikasi JWT tokens, validasi middleware, dan integrasi PostgreSQL database.',
    videoId: 'dQw4w9WgXcQ',
    duration: '5 jam',
    instructor: 'Bajo Dev Team',
    isPremium: true,
  },
];

export default function KelasPage() {
  const { user } = useUser();
  const isPremiumUser = user?.isPremium || false;

  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Kelas Online <span className="text-blue-600">Bajo Dev</span>
          </h1>
          <p className="text-sm md:text-base text-slate-650 dark:text-slate-400 max-w-2xl mx-auto">
            Pelajari keahlian programming langsung melalui rekaman video kurikulum industri terstruktur dengan praktik nyata.
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kelasData.map((kelas, index) => {
            const showLockedOverlay = kelas.isPremium && !isPremiumUser;

            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                key={kelas.id} 
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-850 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group"
              >
                {/* Visual Video Area / Iframe */}
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 relative flex items-center justify-center overflow-hidden">
                  {showLockedOverlay ? (
                    // Glassmorphic Locked Overlay
                    <div className="absolute inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center z-10">
                      <div className="w-11 h-11 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full flex items-center justify-center mb-3">
                        <FiLock size={20} className="animate-pulse" />
                      </div>
                      <h4 className="text-white text-xs font-extrabold flex items-center gap-1">
                        <FiStar size={12} className="fill-amber-500 text-amber-500" /> Kelas Premium Pro
                      </h4>
                      <p className="text-white/80 text-[10px] max-w-[200px] mt-1.5 mb-4">
                        Upgrade ke Premium untuk membuka video ini & materi eksklusif lainnya.
                      </p>
                      <Link 
                        href="/pro" 
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold rounded-lg transition-all shadow-md"
                      >
                        Buka Sekarang
                      </Link>
                    </div>
                  ) : null}

                  {/* Standard Video Player */}
                  {!showLockedOverlay ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${kelas.videoId}`}
                      title={kelas.title}
                      allowFullScreen
                      className="w-full h-full border-none"
                    />
                  ) : (
                    // Disabled static snapshot when locked
                    <div className="w-full h-full bg-slate-250 dark:bg-slate-850 flex items-center justify-center text-slate-400">
                      <FiPlay size={44} className="opacity-30" />
                    </div>
                  )}
                </div>

                {/* Content Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    {kelas.isPremium ? (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest leading-none bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/10">
                        <FiStar size={9} className="fill-amber-500 text-amber-500" /> Premium
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest leading-none bg-green-500/10 px-2 py-1 rounded-md">
                        Akses Gratis
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-extrabold text-base md:text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                    {kelas.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-450 line-clamp-3 mb-6 leading-relaxed">
                    {kelas.description}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-850/80 mt-auto">
                    <span className="flex items-center gap-1"><FiClock size={13} /> {kelas.duration}</span>
                    <span className="flex items-center gap-1"><FiUser size={13} /> {kelas.instructor}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}