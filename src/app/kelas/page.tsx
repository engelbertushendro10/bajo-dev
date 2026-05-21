import { FiPlay, FiClock, FiUser } from 'react-icons/fi';

const kelasData = [
  {
    title: 'Full Stack Next.js 14',
    description: 'Bangun web modern dengan Next.js App Router, Tailwind, dan database.',
    videoId: 'dQw4w9WgXcQ', // ganti dengan ID YouTube yang asli
    duration: '4 jam 30 menit',
    instructor: 'Bajo Dev Team',
  },
  {
    title: 'React.js untuk Pemula',
    description: 'Pahami React dari dasar: komponen, state, props, dan hooks.',
    videoId: 'dQw4w9WgXcQ',
    duration: '3 jam',
    instructor: 'Bajo Dev Team',
  },
  {
    title: 'Backend Node.js + Express',
    description: 'Buat REST API dan autentikasi dengan Node.js, Express, dan JWT.',
    videoId: 'dQw4w9WgXcQ',
    duration: '5 jam',
    instructor: 'Bajo Dev Team',
  },
];

export default function KelasPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Kelas Online <span className="text-blue-600">Bajo Dev</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Belajar langsung dengan video tutorial terstruktur. Akses seumur hidup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kelasData.map((kelas) => (
            <div key={kelas.title} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-video bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <iframe
                  src={`https://www.youtube.com/embed/${kelas.videoId}`}
                  title={kelas.title}
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">{kelas.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{kelas.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><FiClock size={12} />{kelas.duration}</span>
                  <span className="flex items-center gap-1"><FiUser size={12} />{kelas.instructor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}