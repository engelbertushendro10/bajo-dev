import { FiExternalLink, FiUser } from 'react-icons/fi';

const projects = [
  {
    title: 'Website Portofolio',
    author: 'Ahmad',
    image: 'https://via.placeholder.com/400x250/2563eb/ffffff?text=Portofolio',
    link: '#',
    tags: ['Next.js', 'Tailwind'],
  },
  {
    title: 'Aplikasi Catatan',
    author: 'Siti',
    image: 'https://via.placeholder.com/400x250/2563eb/ffffff?text=Catatan',
    link: '#',
    tags: ['React', 'Firebase'],
  },
  {
    title: 'E-Commerce Sederhana',
    author: 'Rizky',
    image: 'https://via.placeholder.com/400x250/2563eb/ffffff?text=E-Commerce',
    link: '#',
    tags: ['Laravel', 'MySQL'],
  },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Showcase <span className="text-blue-600">Member</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Karya terbaik dari member Bajo Dev. Tambahkan proyekmu!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-1">{project.title}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1 mb-3"><FiUser size={14} />{project.author}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                  Lihat Proyek <FiExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}