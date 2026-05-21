'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/lib/UserContext';
import { 
  FiCheck, FiLock, FiArrowRight, FiChevronDown, FiChevronUp, 
  FiAward, FiStar, FiInfo, FiCode, FiSmartphone, FiTerminal 
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Roadmap Data
interface SubSkill {
  id: string;
  name: string;
  link?: string;
}

interface RoadmapStep {
  id: string;
  title: string;
  icon: any;
  difficulty: 'Pemula' | 'Menengah' | 'Mahir';
  estimatedTime: string;
  subskills: SubSkill[];
}

const mainRoadmap: RoadmapStep[] = [
  {
    id: 'html',
    title: 'HTML Dasar & Semantik',
    icon: FiCode,
    difficulty: 'Pemula',
    estimatedTime: '1 Minggu',
    subskills: [
      { id: 'html_struktur', name: 'Struktur Dokumen HTML5', link: '/tutorials/belajar-html-dasar' },
      { id: 'html_tag', name: 'Tag Utama (Heading, Paragraph, List)', link: '/tutorials/belajar-html-dasar' },
      { id: 'html_media', name: 'Menampilkan Gambar & Video', link: '/tutorials/belajar-html-dasar' },
      { id: 'html_link', name: 'Hyperlink & Anchor Tag', link: '/tutorials/belajar-html-dasar' },
      { id: 'html_form', name: 'Formulir, Input & Validasi Dasar' },
      { id: 'html_semantic', name: 'HTML Semantik (Header, Nav, Section, Article)' }
    ]
  },
  {
    id: 'css',
    title: 'CSS Modern & Flexbox',
    icon: FiCode,
    difficulty: 'Pemula',
    estimatedTime: '2 Minggu',
    subskills: [
      { id: 'css_selector', name: 'CSS Selectors & Cascade rules' },
      { id: 'css_boxmodel', name: 'Box Model (Margin, Padding, Border)' },
      { id: 'css_flexbox', name: 'CSS Flexbox (Align, Justify, Direction)' },
      { id: 'css_grid', name: 'CSS Grid Layouting' },
      { id: 'css_responsive', name: 'Media Queries & Responsive Design' },
      { id: 'css_tailwind', name: 'Tailwind CSS Utility First Framework' }
    ]
  },
  {
    id: 'js',
    title: 'JavaScript Modern (ES6+)',
    icon: FiTerminal,
    difficulty: 'Pemula',
    estimatedTime: '3 Minggu',
    subskills: [
      { id: 'js_basic', name: 'Variabel (let, const) & Tipe Data' },
      { id: 'js_control', name: 'Percabangan (if-else) & Perulangan (for, while)' },
      { id: 'js_function', name: 'Fungsi & Arrow Functions' },
      { id: 'js_dom', name: 'DOM Manipulation & Event Listener' },
      { id: 'js_async', name: 'Asynchronous JavaScript (Promise, Async/Await)' },
      { id: 'js_fetch', name: 'API Fetch & Web Storage' }
    ]
  },
  {
    id: 'git',
    title: 'Git & GitHub Version Control',
    icon: FiTerminal,
    difficulty: 'Pemula',
    estimatedTime: '1 Minggu',
    subskills: [
      { id: 'git_init', name: 'Instalasi & Inisialisasi Repository (git init)' },
      { id: 'git_commit', name: 'Staging & Commit (git add, git commit)' },
      { id: 'git_remote', name: 'Push & Pull dengan GitHub' },
      { id: 'git_branch', name: 'Branching & Merging' },
      { id: 'git_pr', name: 'Pull Request & Resolving Conflict' }
    ]
  },
  {
    id: 'react',
    title: 'React.js Frontend Library',
    icon: FiSmartphone,
    difficulty: 'Menengah',
    estimatedTime: '3 Minggu',
    subskills: [
      { id: 'react_jsx', name: 'Sintaks JSX & Rendering Element' },
      { id: 'react_components', name: 'Functional Components & Props' },
      { id: 'react_hooks', name: 'State Management dengan useState & useEffect' },
      { id: 'react_events', name: 'Handling Events & Form input di React' },
      { id: 'react_context', name: 'Global State: useContext & Context API' },
      { id: 'react_routing', name: 'Routing dengan React Router' }
    ]
  },
  {
    id: 'next',
    title: 'Next.js 14 Framework',
    icon: FiCode,
    difficulty: 'Menengah',
    estimatedTime: '3 Minggu',
    subskills: [
      { id: 'next_routing', name: 'App Router & File-based Routing' },
      { id: 'next_components', name: 'React Server Components vs Client Components' },
      { id: 'next_fetching', name: 'Data Fetching (SSR, SSG, ISR)' },
      { id: 'next_api', name: 'API Routes & Server Actions' },
      { id: 'next_seo', name: 'Metadata & Optimasi SEO di Next.js' }
    ]
  },
  {
    id: 'backend',
    title: 'Node.js & Express.js Backend',
    icon: FiTerminal,
    difficulty: 'Mahir',
    estimatedTime: '3 Minggu',
    subskills: [
      { id: 'node_basic', name: 'Node.js Runtime & NPM' },
      { id: 'express_route', name: 'Membuat REST API Server dengan Express' },
      { id: 'express_middleware', name: 'Middleware Express (CORS, BodyParser, Logger)' },
      { id: 'express_auth', name: 'User Authentication & JWT Tokens' },
      { id: 'express_validation', name: 'Validasi Input Request' }
    ]
  },
  {
    id: 'database',
    title: 'Database PostgreSQL & ORM',
    icon: FiTerminal,
    difficulty: 'Mahir',
    estimatedTime: '2 Minggu',
    subskills: [
      { id: 'db_relational', name: 'Konsep Database Relasional (SQL)' },
      { id: 'db_queries', name: 'Query Dasar (SELECT, INSERT, UPDATE, JOIN)' },
      { id: 'db_prisma', name: 'Integrasi Prisma ORM dengan PostgreSQL' },
      { id: 'db_relation', name: 'One-to-Many & Many-to-Many Relationships' },
      { id: 'db_migration', name: 'Database Migration & Seed Data' }
    ]
  }
];

export default function RoadmapPage() {
  const { user } = useUser();
  const [expandedStep, setExpandedStep] = useState<string | null>('html');
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Mark client hydration
  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem('bajodev_roadmap_progress');
    if (stored) {
      try {
        setCompletedSkills(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Calculate stats
  const totalSubSkills = mainRoadmap.reduce((acc, step) => acc + step.subskills.length, 0);
  const completedCount = completedSkills.length;
  const progressPercent = totalSubSkills > 0 ? Math.round((completedCount / totalSubSkills) * 100) : 0;

  const toggleSkill = (skillId: string) => {
    const isCompleted = completedSkills.includes(skillId);
    let updated: string[];
    if (isCompleted) {
      updated = completedSkills.filter(id => id !== skillId);
      toast.success('Kemajuan belajar diperbarui');
    } else {
      updated = [...completedSkills, skillId];
      // Random motivational toast messages
      const motivations = [
        'Mantap! Satu langkah lebih dekat menuju impianmu! 🚀',
        'Hebat! Lanjutkan belajarmu, jangan berhenti! 💪',
        'Keren! Setiap langkah kecil bernilai besar! 🌟',
        'Luar biasa! Progresmu sangat bagus! 🔥'
      ];
      toast.success(motivations[Math.floor(Math.random() * motivations.length)]);
    }
    setCompletedSkills(updated);
    localStorage.setItem('bajodev_roadmap_progress', JSON.stringify(updated));
  };

  const handleClaimCertificate = () => {
    if (!user) {
      toast.error('Silakan login terlebih dahulu untuk klaim sertifikat');
      return;
    }
    setShowCertificateModal(true);
  };

  const toggleExpand = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Roadmap Belajar <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Full Stack Developer</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Jalur terstruktur dari nol hingga mahir. Centang materi yang sudah Anda pelajari untuk melacak progress belajar secara dinamis.
          </p>
        </div>

        {/* Progress Card */}
        {isClient && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-2xl shadow-xl mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Progress Belajar Anda</h3>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                  {user ? `${user.name} (@${user.username})` : 'Tamu (Guest)'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-blue-600">{progressPercent}%</span>
                <p className="text-xs text-slate-400">{completedCount} dari {totalSubSkills} Sub-Skill Selesai</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
              />
            </div>

            {/* Certificate Unlock Banner */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between gap-4 border border-slate-200/50 dark:border-slate-750">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  progressPercent === 100 
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400' 
                    : 'bg-slate-200 text-slate-400 dark:bg-slate-800'
                }`}>
                  <FiAward size={22} className={progressPercent === 100 ? 'animate-bounce' : ''} />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">Sertifikat Kelulusan Full Stack</h4>
                  <p className="text-[11px] text-slate-500">Selesaikan semua sub-skill 100% untuk membuka sertifikat digital</p>
                </div>
              </div>
              <button
                onClick={handleClaimCertificate}
                disabled={progressPercent < 100}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  progressPercent === 100
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-98'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                Klaim Sertifikat
              </button>
            </div>
          </motion.div>
        )}

        {/* Other Roadmaps Link */}
        <div className="mb-6 flex justify-end">
          <Link 
            href="/roadmap/python" 
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/20 px-3 py-1.5 rounded-lg border border-blue-200/40"
          >
            Lihat Jalur Belajar Python <FiArrowRight />
          </Link>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {mainRoadmap.map((step, index) => {
            const Icon = step.icon;
            const isExpanded = expandedStep === step.id;
            
            // Check how many subskills completed in this step
            const stepSubskillIds = step.subskills.map(s => s.id);
            const stepCompletedCount = step.subskills.filter(s => completedSkills.includes(s.id)).length;
            const isStepFinished = stepCompletedCount === step.subskills.length;

            return (
              <div key={step.id} className="relative pl-14">
                {/* Node icon indicator */}
                <button
                  onClick={() => toggleExpand(step.id)}
                  className={`absolute left-2.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all z-10 ${
                    isStepFinished
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                      : stepCompletedCount > 0
                        ? 'bg-white dark:bg-slate-900 border-blue-500 text-blue-600'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-400'
                  }`}
                >
                  {isStepFinished ? <FiCheck size={14} className="stroke-[3]" /> : <span className="text-[10px] font-bold">{index + 1}</span>}
                </button>

                {/* Step Content */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                  {/* Step Header */}
                  <div 
                    onClick={() => toggleExpand(step.id)}
                    className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/20 select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${
                        isStepFinished 
                          ? 'bg-blue-500/10 text-blue-600' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-sm md:text-base text-slate-900 dark:text-white flex items-center gap-2">
                          {step.title}
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            step.difficulty === 'Pemula'
                              ? 'bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400'
                              : step.difficulty === 'Menengah'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                          }`}>
                            {step.difficulty}
                          </span>
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                          Estimasi: {step.estimatedTime} • {stepCompletedCount} dari {step.subskills.length} selesai
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {stepCompletedCount > 0 && !isStepFinished && (
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 rounded-md">
                          {stepCompletedCount}/{step.subskills.length}
                        </span>
                      )}
                      {isExpanded ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
                    </div>
                  </div>

                  {/* Step Subskills Details */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-slate-100 dark:border-slate-800"
                      >
                        <div className="p-5 bg-slate-50/50 dark:bg-slate-800/10 space-y-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sub-materi yang harus dikuasai:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {step.subskills.map((subskill) => {
                              const isSubskillCompleted = completedSkills.includes(subskill.id);
                              return (
                                <div 
                                  key={subskill.id}
                                  className={`p-3 bg-white dark:bg-slate-900 border rounded-xl flex items-start gap-3 transition-colors ${
                                    isSubskillCompleted 
                                      ? 'border-blue-500/30 bg-blue-500/[0.01]' 
                                      : 'border-slate-200/60 dark:border-slate-800 hover:border-slate-300'
                                  }`}
                                >
                                  <input 
                                    type="checkbox"
                                    id={subskill.id}
                                    checked={isSubskillCompleted}
                                    onChange={() => toggleSkill(subskill.id)}
                                    className="mt-0.5 text-blue-600 focus:ring-blue-500/20 border-slate-300 rounded h-4 w-4 cursor-pointer"
                                  />
                                  <div className="flex-1">
                                    <label 
                                      htmlFor={subskill.id}
                                      className={`text-xs font-semibold cursor-pointer select-none ${
                                        isSubskillCompleted 
                                          ? 'text-slate-400 line-through' 
                                          : 'text-slate-700 dark:text-slate-300'
                                      }`}
                                    >
                                      {subskill.name}
                                    </label>
                                    
                                    {subskill.link && (
                                      <Link 
                                        href={subskill.link}
                                        className="text-[10px] text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-0.5 mt-1"
                                      >
                                        Baca Materi <FiArrowRight size={10} />
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl p-6 md:p-8"
            >
              {/* Modal Close */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">Klaim Sertifikat Anda</h3>
                  <p className="text-xs text-slate-500">Bukti keberhasilan Anda menyelesaikan jalur Full Stack Developer</p>
                </div>
                <button 
                  onClick={() => setShowCertificateModal(false)}
                  className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Certificate Design View */}
              {user?.isPremium ? (
                <div className="space-y-6">
                  {/* Virtual Certificate Card */}
                  <div className="relative border-8 border-double border-amber-600 dark:border-amber-500 bg-amber-50/20 dark:bg-slate-850 p-8 rounded-xl shadow-lg text-center overflow-hidden">
                    {/* Watermarks & Seals */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/[0.02] rounded-full blur-xl pointer-events-none" />
                    
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-sm">BD</span>
                      </div>
                      <span className="text-[10px] tracking-widest text-slate-400 font-extrabold uppercase">Sertifikat Kelulusan Resmi</span>
                    </div>

                    <h4 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">SERTIFIKAT KELULUSAN</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Dengan ini diberikan kepada:</p>
                    
                    <h5 className="font-heading text-2xl font-bold text-blue-600 dark:text-blue-400 uppercase border-b-2 border-slate-200 dark:border-slate-800 max-w-sm mx-auto pb-1 mb-2">
                      {user.name}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-6">
                      Atas keberhasilan menyelesaikan seluruh kurikulum pembelajaran pada jalur pengembangan <br />
                      <strong className="text-slate-800 dark:text-slate-200 font-semibold not-italic">Full Stack Developer Pathway</strong> di Bajo Dev.
                    </p>

                    <div className="flex justify-between items-center max-w-md mx-auto pt-6 text-xs text-slate-500">
                      <div className="text-center">
                        <p className="font-semibold text-slate-800 dark:text-slate-300">21 Mei 2026</p>
                        <p className="text-[10px] text-slate-400 border-t border-slate-250 dark:border-slate-850 mt-1 pt-1">Tanggal Kelulusan</p>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500 border-dashed flex items-center justify-center text-amber-500 text-[10px] font-extrabold rotate-12">
                        SEAL VERIFIED
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-slate-800 dark:text-slate-300">Bajo Dev Team</p>
                        <p className="text-[10px] text-slate-400 border-t border-slate-250 dark:border-slate-850 mt-1 pt-1">Instruktur Utama</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        window.print();
                      }}
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md"
                    >
                      Cetak / Simpan PDF
                    </button>
                    <button 
                      onClick={() => setShowCertificateModal(false)}
                      className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-bold rounded-xl transition-all"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/20 text-amber-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                    🔒
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white">Fitur Ini Khusus Member Premium Pro</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                      Sertifikat kelulusan digital resmi adalah fitur eksklusif member Pro. Silakan upgrade akun Anda untuk mencetak sertifikat.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 max-w-md mx-auto">
                    <Link
                      href="/pro"
                      onClick={() => setShowCertificateModal(false)}
                      className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <FiStar className="fill-white" /> Upgrade Premium
                    </Link>
                    <button 
                      onClick={() => setShowCertificateModal(false)}
                      className="flex-1 py-3 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm transition-all"
                    >
                      Mungkin Nanti
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}