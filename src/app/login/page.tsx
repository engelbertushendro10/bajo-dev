import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
          <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-2">Masuk ke Bajo Dev</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Gunakan akun GitHub untuk melanjutkan</p>
          
          <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors mb-4">
            <FiGithub size={20} />
            Masuk dengan GitHub
          </button>

          <p className="text-xs text-slate-500">
            Dengan masuk, kamu menyetujui{' '}
            <Link href="#" className="text-blue-600 hover:underline">Syarat & Ketentuan</Link>
          </p>
        </div>
      </div>
    </div>
  );
}