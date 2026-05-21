import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="hidden md:block bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BD</span>
              </div>
              <span className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Bajo<span className="text-blue-600">Dev</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Platform belajar coding berbahasa Indonesia. Dari nol sampai mahir.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li><Link href="/tutorials" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600">Tutorial</Link></li>
              <li><Link href="/pro" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600">Premium</Link></li>
              <li><Link href="/projects" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600">Projek</Link></li>
              <li><Link href="/jobs" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600">Lowongan</Link></li>
            </ul>
          </div>

          {/* Belajar */}
          <div>
            <h3 className="font-semibold mb-4">Mulai Belajar</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>HTML Dasar</li>
              <li>CSS Modern</li>
              <li>JavaScript</li>
              <li>React & Next.js</li>
              <li>Backend API</li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-semibold mb-4">Bajo Dev</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>📧 itbajo.dev@gmail.com</li>
              <li>📱 0813-3973-1979</li>
              <li>🌐 bajo-dev.vercel.app</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Bajo Dev. All rights reserved.
        </div>
      </div>
    </footer>
  );
}