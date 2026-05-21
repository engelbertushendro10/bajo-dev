import Link from 'next/link';
import { FiCheck, FiLock, FiArrowRight } from 'react-icons/fi';

const steps = [
  { title: 'HTML Dasar', done: true, link: '/tutorials/belajar-html-dasar' },
  { title: 'CSS Dasar', done: true, link: '/tutorials/css-flexbox-lengkap' },
  { title: 'JavaScript Dasar', done: false, link: '/tutorials/javascript-dom-manipulation' },
  { title: 'Git & GitHub', done: false, link: '#' },
  { title: 'React.js', done: false, link: '#' },
  { title: 'Next.js', done: false, link: '#' },
  { title: 'Backend (Node.js)', done: false, link: '#' },
  { title: 'Database (PostgreSQL)', done: false, link: '#' },
  { title: 'Full Stack Project', done: false, link: '#' },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">
          Roadmap Belajar <span className="text-blue-600">Bajo Dev</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 text-center mb-12">
          Ikuti jalur belajar yang terstruktur dari nol sampai menjadi Full Stack Developer.
        </p>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${step.done ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                {step.done ? <FiCheck size={20} /> : <FiLock size={16} />}
              </div>
              <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className={`font-semibold ${step.done ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                  {step.title}
                </span>
                {step.done ? (
                  <Link href={step.link} className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                    Mulai <FiArrowRight size={14} />
                  </Link>
                ) : (
                  <span className="text-xs text-slate-400">Segera</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}