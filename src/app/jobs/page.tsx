import Link from 'next/link';
import { FiMapPin, FiBriefcase, FiClock } from 'react-icons/fi';

const jobs = [
  { title: 'Frontend Developer (React)', company: 'Tech Startup', location: 'Remote', type: 'Full-time', posted: '2 hari lalu' },
  { title: 'Backend Developer (Node.js)', company: 'Fintech Co', location: 'Jakarta', type: 'Contract', posted: '5 hari lalu' },
  { title: 'Full Stack Developer', company: 'Digital Agency', location: 'Bandung', type: 'Full-time', posted: '1 minggu lalu' },
  { title: 'UI/UX Designer', company: 'Creative Studio', location: 'Remote', type: 'Freelance', posted: '3 hari lalu' },
];

export default function JobsPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Lowongan <span className="text-blue-600">Kerja</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Temukan peluang karir sebagai developer di perusahaan terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div key={job.title} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">{job.title}</h3>
              <p className="text-blue-600 font-medium mb-3">{job.company}</p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                <span className="flex items-center gap-1"><FiMapPin size={14} />{job.location}</span>
                <span className="flex items-center gap-1"><FiBriefcase size={14} />{job.type}</span>
                <span className="flex items-center gap-1"><FiClock size={14} />{job.posted}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
            Pasang Lowongan
          </Link>
        </div>
      </div>
    </div>
  );
}