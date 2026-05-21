'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiLock, FiCheck, FiInfo } from 'react-icons/fi';
import { useUser } from '@/lib/UserContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const pythonRoadmap = [
  { id: 'py_intro', title: 'Pengenalan Python & Instalasi', slug: 'python-intro', difficulty: 'Pemula' },
  { id: 'py_syntax', title: 'Hello World & Sintaks Dasar', slug: 'python-hello-world', difficulty: 'Pemula' },
  { id: 'py_vars', title: 'Variabel & Tipe Data', slug: 'python-variabel', difficulty: 'Pemula' },
  { id: 'py_operator', title: 'Operator Aritmatika & Logika', slug: 'python-operator', difficulty: 'Pemula' },
  { id: 'py_string', title: 'String & Manipulasi Teks', slug: 'python-string', difficulty: 'Pemula' },
  { id: 'py_io', title: 'Input & Output (I/O) File', slug: 'python-io', difficulty: 'Pemula' },
  { id: 'py_branching', title: 'Percabangan (If, Elif, Else)', slug: 'python-percabangan', difficulty: 'Pemula' },
  { id: 'py_looping', title: 'Perulangan (For, While)', slug: 'python-perulangan', difficulty: 'Pemula' },
  { id: 'py_list', title: 'Struktur Data: List & Tuple', slug: 'python-list-tuple', difficulty: 'Menengah' },
  { id: 'py_dict', title: 'Struktur Data: Dictionary & Set', slug: 'python-dict-set', difficulty: 'Menengah' },
  { id: 'py_func', title: 'Fungsi (def, lambda, return)', slug: 'python-fungsi', difficulty: 'Menengah' },
  { id: 'py_modules', title: 'Modul & Package (import, pip)', slug: 'python-modul', difficulty: 'Menengah' },
  { id: 'py_file', title: 'File Handling (Read/Write)', slug: 'python-file', difficulty: 'Menengah' },
  { id: 'py_exception', title: 'Exception Handling (Try, Except)', slug: 'python-exception', difficulty: 'Mahir' },
];

export default function PythonRoadmapPage() {
  const { user } = useUser();
  const [completedList, setCompletedList] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem('bajodev_python_progress');
    if (stored) {
      try {
        setCompletedList(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const togglePythonSkill = (id: string) => {
    const isCompleted = completedList.includes(id);
    let updated: string[];
    if (isCompleted) {
      updated = completedList.filter(item => item !== id);
      toast.success('Kemajuan belajar diperbarui');
    } else {
      updated = [...completedList, id];
      toast.success('Bagus! Pertahankan kemajuan belajarmu! 🐍');
    }
    setCompletedList(updated);
    localStorage.setItem('bajodev_python_progress', JSON.stringify(updated));
  };

  const completedCount = completedList.length;
  const progressPercent = pythonRoadmap.length > 0 ? Math.round((completedCount / pythonRoadmap.length) * 100) : 0;

  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Roadmap Belajar <span className="text-blue-600">Python Programming</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Ikuti jalur belajar Python dari pemula hingga mahir secara bertahap. Centang modul setelah menyelesaikannya.
          </p>
        </div>

        {/* Progress Tracker */}
        {isClient && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-2xl shadow-xl mb-8"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className="text-xs font-bold text-slate-450 uppercase tracking-wider">Progress Python</span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {user ? `@${user.username}` : 'Tamu (Guest)'}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-blue-600">{progressPercent}%</span>
                <p className="text-xs text-slate-400">{completedCount} dari {pythonRoadmap.length} Selesai</p>
              </div>
            </div>
            
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-300"
              />
            </div>
          </motion.div>
        )}

        {/* Steps Timeline */}
        <div className="space-y-4">
          {pythonRoadmap.map((item, index) => {
            const isCompleted = completedList.includes(item.id);
            // Simulating only the first few have actual pages, others are "Coming soon" or placeholder
            const hasActualPage = ['python-intro'].includes(item.slug);

            return (
              <div key={item.id} className="flex items-center gap-4">
                {/* Node indicator */}
                <button
                  onClick={() => togglePythonSkill(item.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all ${
                    isCompleted 
                      ? 'bg-blue-600 shadow-md shadow-blue-500/10' 
                      : 'bg-slate-250 dark:bg-slate-800 text-slate-400 dark:text-slate-600 hover:border-blue-500 hover:text-blue-500 border border-transparent'
                  }`}
                >
                  {isCompleted ? <FiCheck size={20} className="stroke-[3]" /> : <span className="text-xs">{index + 1}</span>}
                </button>

                {/* Card */}
                <div className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-850 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => togglePythonSkill(item.id)}
                      className="text-blue-600 focus:ring-blue-500/20 border-slate-350 rounded h-4 w-4 cursor-pointer"
                      id={`chk_${item.id}`}
                    />
                    <div>
                      <label 
                        htmlFor={`chk_${item.id}`}
                        className={`font-semibold text-sm cursor-pointer ${
                          isCompleted ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {item.title}
                      </label>
                      <span className={`inline-block text-[9px] font-bold uppercase ml-2 px-1.5 py-0.5 rounded ${
                        item.difficulty === 'Pemula'
                          ? 'bg-green-150 text-green-700 dark:bg-green-950/20 dark:text-green-400'
                          : item.difficulty === 'Menengah'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                      }`}>
                        {item.difficulty}
                      </span>
                    </div>
                  </div>

                  {hasActualPage ? (
                    <Link 
                      href={`/tutorials/${item.slug}`} 
                      className="text-blue-600 hover:text-blue-700 font-bold text-xs flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 rounded-lg border border-blue-200/20"
                    >
                      Mulai <FiArrowRight size={12} />
                    </Link>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      Segera
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/roadmap" className="text-blue-600 hover:text-blue-700 font-bold text-sm">
            ← Kembali ke Roadmap Utama
          </Link>
        </div>
      </div>
    </div>
  );
}