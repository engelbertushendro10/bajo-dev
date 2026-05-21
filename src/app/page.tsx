'use client';

import Link from 'next/link';
import { FiBookOpen, FiCode, FiTrendingUp, FiArrowRight, FiZap, FiCheckCircle, FiPlay } from 'react-icons/fi';
import { useUser } from '@/lib/UserContext';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function Home() {
  const { user } = useUser();

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 pt-24 pb-32">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-100/50 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/70 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs md:text-sm font-semibold border border-blue-200/50 dark:border-blue-900/30"
          >
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
            Platform Belajar Coding Gratis & Terstruktur
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white"
          >
            Kuasai Coding dari Nol <br />
            Sampai{' '}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Mahir & Kerja
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-xl text-slate-650 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Belajar secara terstruktur dengan kurikulum industri. Lengkap dengan tutorial, roadmap interaktif, coding playground, dan program penempatan kerja.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link
              href="/tutorials"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:scale-[1.01] active:scale-99 transition-all shadow-xl shadow-blue-500/20"
            >
              Mulai Belajar
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-md active:scale-99"
            >
              <FiPlay className="text-blue-400" /> Coba Sandbox Editor
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-3xl mx-auto"
          >
            {[
              { number: '100+', label: 'Modul Belajar', desc: 'HTML hingga Backend' },
              { number: '100% Free', label: 'Akses Selamanya', desc: 'Tanpa kartu kredit' },
              { number: 'Interactive', label: 'Roadmap & Sandbox', desc: 'Praktik langsung' },
              { number: 'Job Connect', label: 'Hiring Network', desc: 'Siap kerja' },
            ].map((stat) => (
              <motion.div 
                variants={itemVariants}
                key={stat.label} 
                className="bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 dark:border-slate-850"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
              Kenapa Belajar di <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Bajo Dev</span>?
            </h2>
            <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Kami merancang sistem belajar yang fokus pada efisiensi waktu, keterbukaan kurikulum, dan praktik langsung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiBookOpen,
                title: 'Kurikulum Terarah (Roadmap)',
                desc: 'Tidak perlu bingung harus mulai dari mana. Ikuti timeline roadmap belajar yang terintegrasi dengan kemajuan belajar Anda.',
                color: 'from-orange-500 to-amber-500',
                link: '/roadmap'
              },
              {
                icon: FiCode,
                title: 'Eksperimen Langsung (Sandbox)',
                desc: 'Tulis kode dan lihat hasilnya secara instan di browser. Playground kami mendukung HTML, CSS, dan JavaScript secara real-time.',
                color: 'from-blue-500 to-cyan-500',
                link: '/playground'
              },
              {
                icon: FiTrendingUp,
                title: 'Hiring Network & Karir',
                desc: 'Masukkan portofolio proyek buatan Anda ke Showcase Member agar dapat dilirik oleh partner perusahaan di Job Board kami.',
                color: 'from-indigo-500 to-violet-500',
                link: '/jobs'
              },
            ].map((feature) => (
              <motion.div
                whileHover={{ y: -6 }}
                key={feature.title}
                className="p-8 bg-slate-55 dark:bg-slate-800/50 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 hover:shadow-2xl hover:shadow-blue-500/[0.03] transition-all flex flex-col h-full"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-500/5`}>
                  <feature.icon size={26} />
                </div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-450 text-sm leading-relaxed mb-6">
                  {feature.desc}
                </p>
                <Link 
                  href={feature.link}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-auto"
                >
                  Buka Fitur Ini <FiArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Siap Memulai Karir <br />Sebagai Developer Profesional?
          </h2>
          <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
            Gabung dengan ribuan pembelajar lainnya. Mulai perjalanan belajar coding Anda hari ini secara gratis, terstruktur, dan interaktif.
          </p>
          <div className="pt-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-xl active:scale-98"
            >
              Mulai Gabung Sekarang 🚀
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}