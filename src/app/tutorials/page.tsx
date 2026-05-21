import { getAllTutorials, getAllTags } from '@/lib/blog';
import Link from 'next/link';
import { FiCalendar, FiClock } from 'react-icons/fi';

export default function TutorialsPage() {
  const tutorials = getAllTutorials();
  const tags = getAllTags();

  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Tutorial <span className="text-blue-600">Coding</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Belajar dari nol sampai mahir dengan tutorial terstruktur berbahasa Indonesia.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map(tutorial => (
            <Link key={tutorial.slug} href={`/tutorials/${tutorial.slug}`} className="group">
              <article className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                  <span className="text-4xl">
                    {tutorial.tags?.includes('HTML') ? '📄' :
                     tutorial.tags?.includes('CSS') ? '🎨' :
                     tutorial.tags?.includes('JavaScript') ? '📜' : '💻'}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><FiCalendar size={12} />{new Date(tutorial.date).toLocaleDateString('id-ID')}</span>
                    <span className="flex items-center gap-1"><FiClock size={12} />{tutorial.readTime}</span>
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">{tutorial.difficulty}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{tutorial.excerpt}</p>
                  <div className="flex flex-wrap gap-1">
                    {tutorial.tags?.map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-400 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}