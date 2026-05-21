import Link from 'next/link';
import { FiArrowRight, FiLock, FiCheck } from 'react-icons/fi';

const pythonRoadmap = [
    { title: 'Pengenalan Python & Instalasi', slug: 'python-intro', done: true },
    { title: 'Hello World & Sintaks Dasar', slug: 'python-hello-world', done: true },
    { title: 'Variabel & Tipe Data', slug: 'python-variabel', done: true },
    { title: 'Operator', slug: 'python-operator', done: true },
    { title: 'String & Manipulasi', slug: 'python-string', done: true },
    { title: 'Input & Output (I/O)', slug: 'python-io', done: false },
    { title: 'Percabangan', slug: 'python-percabangan', done: false },
    { title: 'Perulangan', slug: 'python-perulangan', done: false },
    { title: 'List & Tuple', slug: 'python-list-tuple', done: false },
    { title: 'Dictionary & Set', slug: 'python-dict-set', done: false },
    { title: 'Fungsi', slug: 'python-fungsi', done: false },
    { title: 'Modul & Package', slug: 'python-modul', done: false },
    { title: 'File Handling', slug: 'python-file', done: false },
    { title: 'Exception Handling', slug: 'python-exception', done: false },
];

export default function PythonRoadmapPage() {
    return (
        <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Roadmap <span className="text-blue-600">Python</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Jalur belajar Python dari nol hingga mahir. Ikuti urutan untuk hasil terbaik.
                    </p>
                </div>

                <div className="space-y-4">
                    {pythonRoadmap.map((item) => (
                        <div key={item.slug} className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${item.done ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                {item.done ? <FiCheck size={20} /> : <FiLock size={16} />}
                            </div>
                            <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                <span className={`font-semibold ${item.done ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                                    {item.title}
                                </span>
                                {item.done ? (
                                    <Link href={`/tutorials/${item.slug}`} className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                                        Mulai <FiArrowRight size={14} />
                                    </Link>
                                ) : (
                                    <span className="text-xs text-slate-400">Segera</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/roadmap" className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Kembali ke Roadmap Utama
                    </Link>
                </div>
            </div>
        </div>
    );
}