import Link from 'next/link';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  { title: 'Starter Kit Next.js', description: 'Template siap pakai dengan Tailwind, TypeScript, dan Dark Mode.', github: '#', demo: '#', tags: ['Next.js', 'Tailwind'] },
  { title: 'REST API Boilerplate', description: 'Boilerplate Node.js + Express + JWT untuk memulai backend.', github: '#', demo: '#', tags: ['Node.js', 'Express'] },
  { title: 'Admin Dashboard', description: 'Dashboard admin modern dengan React dan Recharts.', github: '#', demo: '#', tags: ['React', 'Chart.js'] },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Projek <span className="text-blue-600">Open Source</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Koleksi projek dan template yang bisa langsung dipakai untuk belajar atau production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={project.github} className="text-slate-600 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-sm">
                  <FiGithub size={16} /> Source
                </a>
                <a href={project.demo} className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm">
                  <FiExternalLink size={16} /> Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}