import Link from 'next/link';
import { FiBookOpen, FiCode, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Belajar Coding Gratis untuk Semua
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Dari Nol Sampai{' '}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Mahir Coding
            </span>
            {' '}dalam Bahasa Indonesia
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Tutorial lengkap dari HTML, CSS, JavaScript, React, Next.js, hingga backend. 
            Disusun secara terstruktur untuk pemula. Gratis selamanya.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/tutorials"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5"
            >
              Mulai Belajar
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pro"
              className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              Lihat Premium
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-2xl mx-auto">
            {[
              { number: '100+', label: 'Tutorial' },
              { number: 'Gratis', label: 'Akses' },
              { number: 'Pemula', label: 'Friendly' },
              { number: '24/7', label: 'Akses' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Kenapa Belajar di <span className="text-blue-600">Bajo Dev</span>?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Platform belajar coding yang fokus pada kualitas dan kemudahan akses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: FiBookOpen,
                title: 'Tutorial Terstruktur',
                desc: 'Materi disusun dari dasar hingga mahir dengan alur belajar yang jelas.',
              },
              {
                icon: FiCode,
                title: 'Project-Based',
                desc: 'Belajar sambil membangun proyek nyata yang bisa masuk portfolio.',
              },
              {
                icon: FiTrendingUp,
                title: 'Selalu Update',
                desc: 'Konten selalu diperbarui mengikuti tren teknologi terbaru.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100 dark:border-slate-700"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Jadi Developer Profesional?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Mulai perjalanan coding kamu sekarang. Gratis, tanpa syarat.
          </p>
          <Link
            href="/tutorials"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
          >
            Mulai Belajar Gratis 🚀
          </Link>
        </div>
      </section>
    </div>
  );
}