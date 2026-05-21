import { getTutorialBySlug, getAllTutorials } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiCalendar, FiClock, FiUser, FiArrowLeft } from 'react-icons/fi';
import rehypeHighlight from 'rehype-highlight';

export function generateStaticParams() {
  const tutorials = getAllTutorials();
  return tutorials.map(t => ({ slug: t.slug }));
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) notFound();

  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/tutorials" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors mb-8">
          <FiArrowLeft size={18} /> Kembali ke Tutorial
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">{tutorial.difficulty}</span>
            {tutorial.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{tutorial.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><FiUser size={14} />{tutorial.author}</span>
            <span className="flex items-center gap-1"><FiCalendar size={14} />{new Date(tutorial.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center gap-1"><FiClock size={14} />{tutorial.readTime}</span>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-blue-600">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeHighlight]}
  >
    {tutorial.content}
  </ReactMarkdown>
</div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-center">
          <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2">Lanjut Belajar?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Lihat tutorial lainnya atau upgrade ke Premium untuk akses penuh.</p>
          <Link href="/tutorials" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
            Semua Tutorial 📚
          </Link>
        </div>
      </article>
    </div>
  );
}
