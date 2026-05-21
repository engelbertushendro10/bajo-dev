'use client';

import { useState, useEffect } from 'react';
import { 
  FiMapPin, FiClock, FiSearch, 
  FiX, FiSend, FiDollarSign, FiPlus 
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useUser } from '@/lib/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Remote' | 'Contract' | 'Freelance';
  posted: string;
  salary?: string;
  description: string;
  requirements: string[];
}

const staticJobs: Job[] = [
  { 
    id: 'job1',
    title: 'Frontend Developer (React)', 
    company: 'Tech Startup Indo', 
    location: 'Remote (WFA)', 
    type: 'Full-time', 
    posted: '2 hari lalu',
    salary: 'Rp 8.000.000 - Rp 12.000.000',
    description: 'Kami mencari Frontend Developer berbakat yang terbiasa menggunakan React.js dan Tailwind CSS untuk merancang serta mengimplementasikan antarmuka pengguna web responsif baru.',
    requirements: [
      'Pengalaman minimal 1-2 tahun menggunakan React.js / Next.js.',
      'Memahami Tailwind CSS, CSS Grid/Flexbox, dan responsive design.',
      'Terbiasa bekerja dengan Git & Github.',
      'Memiliki kemampuan komunikasi yang baik.'
    ]
  },
  { 
    id: 'job2',
    title: 'Backend Developer (Node.js)', 
    company: 'Fintech Utama Indonesia', 
    location: 'Jakarta Selatan', 
    type: 'Contract', 
    posted: '5 hari lalu',
    salary: 'Rp 10.000.000 - Rp 15.000.000',
    description: 'Membangun REST API berkinerja tinggi, mengelola database PostgreSQL/MongoDB, serta melakukan integrasi dengan payment gateway pihak ketiga.',
    requirements: [
      'Pengalaman minimal 2 tahun di Backend Node.js + Express / NestJS.',
      'Keahlian yang kuat di database relational (PostgreSQL/MySQL).',
      'Memahami implementasi sistem keamanan API (JWT, OAuth).',
      'Menguasai docker dan deployment di cloud (AWS/GCP) adalah nilai tambah.'
    ]
  },
  { 
    id: 'job3',
    title: 'Full Stack Developer Junior', 
    company: 'Creative Digital Agency', 
    location: 'Bandung Kota', 
    type: 'Full-time', 
    posted: '1 minggu lalu',
    salary: 'Rp 6.000.000 - Rp 8.000.000',
    description: 'Mengerjakan proyek-proyek web inovatif dari klien kami baik di sisi frontend (React) maupun backend (Express / Laravel).',
    requirements: [
      'Paham dasar-dasar HTML, CSS, JavaScript Modern (ES6+).',
      'Mengerti konsep MVC, REST API, dan integrasi frontend-backend.',
      'Familiar dengan database SQL / NoSQL.',
      'Lulusan bootcamp coding atau jurusan terkait dipersilakan melamar.'
    ]
  },
  { 
    id: 'job4',
    title: 'UI/UX Designer', 
    company: 'Sora Creative Studio', 
    location: 'Remote (WFA)', 
    type: 'Freelance', 
    posted: '3 hari lalu',
    salary: 'Rp 4.000.000 - Rp 6.000.000',
    description: 'Merancang wireframe, user flow, visual design, serta prototipe interaktif aplikasi mobile & web client.',
    requirements: [
      'Penguasaan aplikasi design tools seperti Figma, Adobe XD.',
      'Memiliki portofolio desain UI/UX yang kuat dan dapat diverifikasi.',
      'Paham prinsip UX Research, usability testing, dan user-centered design.',
      'Dapat berkolaborasi dengan developer dalam proses handoff design.'
    ]
  },
];

export default function JobsPage() {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Semua');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  
  // Apply Form states
  const [applyName, setApplyName] = useState('');
  const [applyEmail, setApplyEmail] = useState('');
  const [applyGithub, setApplyGithub] = useState('');
  const [applyResume, setApplyResume] = useState('');
  const [applyCover, setApplyCover] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // Post Job Form states
  const [postTitle, setPostTitle] = useState('');
  const [postCompany, setPostCompany] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const [postType, setPostType] = useState<'Full-time' | 'Remote' | 'Contract' | 'Freelance'>('Full-time');
  const [postSalary, setPostSalary] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [postReqs, setPostReqs] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('bajodev_posted_jobs');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Job[];
        setJobs([...parsed, ...staticJobs]);
      } catch (e) {
        console.error(e);
        setJobs(staticJobs);
      }
    } else {
      setJobs(staticJobs);
    }
  }, []);

  // Autofill apply form with user login data
  useEffect(() => {
    if (user) {
      setApplyName(user.name);
      setApplyEmail(user.email);
      setApplyGithub(`https://github.com/${user.username}`);
    }
  }, [user, showApplyModal]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyName.trim() || !applyEmail.trim() || !applyGithub.trim() || !applyResume.trim()) {
      toast.error('Harap isi kolom wajib yang bertanda *');
      return;
    }

    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setShowApplyModal(false);
      setSelectedJob(null);
      toast.success(`Lamaran Anda sukses terkirim ke ${selectedJob?.company}! 🚀`);
    }, 2000);
  };

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postCompany.trim() || !postLocation.trim() || !postDesc.trim() || !postReqs.trim()) {
      toast.error('Harap isi seluruh kolom yang bertanda *');
      return;
    }

    setIsPosting(true);
    setTimeout(() => {
      const parsedReqs = postReqs.split('\n').map(r => r.trim()).filter(r => r.length > 0);
      const newJob: Job = {
        id: `custom_${Date.now()}`,
        title: postTitle.trim(),
        company: postCompany.trim(),
        location: postLocation.trim(),
        type: postType,
        posted: 'Baru saja',
        salary: postSalary.trim() || 'Negosiasi',
        description: postDesc.trim(),
        requirements: parsedReqs
      };

      const stored = localStorage.getItem('bajodev_posted_jobs');
      let parsedStored: Job[] = [];
      if (stored) {
        try {
          parsedStored = JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
      localStorage.setItem('bajodev_posted_jobs', JSON.stringify([newJob, ...parsedStored]));
      setJobs([newJob, ...jobs]);

      // Reset Form
      setPostTitle('');
      setPostCompany('');
      setPostLocation('');
      setPostType('Full-time');
      setPostSalary('');
      setPostDesc('');
      setPostReqs('');

      setIsPosting(false);
      setShowPostJobModal(false);
      toast.success('Lowongan baru berhasil diposting ke Board! 💼');
    }, 2500);
  };

  // Filters logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'Semua' || 
                        (selectedType === 'Remote' && job.type === 'Remote') ||
                        (selectedType === 'Full-time' && job.type === 'Full-time') ||
                        (selectedType === 'Freelance' && job.type === 'Freelance') ||
                        (selectedType === 'Contract' && job.type === 'Contract');

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Papan Lowongan <span className="text-blue-600">Kerja Developer</span>
          </h1>
          <p className="text-sm md:text-base text-slate-650 dark:text-slate-400 max-w-2xl mx-auto">
            Temukan peluang karir idaman Anda atau promosikan kebutuhan rekrutmen tim developer perusahaan Anda di ekosistem Bajo Dev.
          </p>
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <FiSearch size={18} />
            </span>
            <input 
              type="text" 
              placeholder="Cari posisi, perusahaan, kota..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs md:text-sm dark:text-white"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Filter pills */}
            <div className="hidden lg:flex items-center gap-1">
              {['Semua', 'Remote', 'Full-time', 'Freelance'].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`text-xs px-3.5 py-2 font-bold rounded-lg border transition-all ${
                    selectedType === type
                      ? 'bg-blue-600 border-blue-650 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-750 dark:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowPostJobModal(true)}
              className="w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md text-xs md:text-sm active:scale-98 flex items-center justify-center gap-1.5"
            >
              <FiPlus size={16} /> Pasang Lowongan
            </button>
          </div>
        </div>

        {/* Small Screen Filters */}
        <div className="flex lg:hidden items-center gap-1 overflow-x-auto pb-4 mb-6">
          {['Semua', 'Remote', 'Full-time', 'Freelance', 'Contract'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`text-xs px-3.5 py-1.5 font-semibold rounded-full border transition-all shrink-0 ${
                selectedType === type
                  ? 'bg-blue-650 border-blue-700 text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Jobs Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <motion.div 
                layout
                whileHover={{ y: -3 }}
                onClick={() => setSelectedJob(job)}
                key={job.id} 
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-800 transition-all cursor-pointer relative overflow-hidden"
              >
                <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  job.type === 'Remote' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400' 
                    : job.type === 'Full-time'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400'
                }`}>
                  {job.type}
                </span>

                <h3 className="font-heading font-extrabold text-base md:text-lg text-slate-900 dark:text-white mb-1.5 pr-16 truncate">
                  {job.title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold text-xs md:text-sm mb-4">
                  {job.company}
                </p>

                <div className="flex flex-wrap items-center gap-3.5 text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-850/80">
                  <span className="flex items-center gap-1"><FiMapPin size={14} /> {job.location}</span>
                  <span className="flex items-center gap-1"><FiClock size={14} /> {job.posted}</span>
                  {job.salary && <span className="flex items-center gap-0.5 text-slate-700 dark:text-slate-350 font-bold"><FiDollarSign size={14} />{job.salary.split(' - ')[0]}</span>}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
              <p className="text-slate-400 font-bold text-base mb-2">Tidak Ada Lowongan Ditemukan</p>
              <p className="text-xs text-slate-500">Coba ubah keyword pencarian atau filter tipe pekerjaan Anda.</p>
            </div>
          )}
        </div>
      </div>

      {/* Job Details Drawer Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 w-full max-w-xl h-full flex flex-col shadow-2xl relative"
            >
              {/* Header Drawer */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 rounded-full uppercase">{selectedJob.type}</span>
                  <h3 className="font-heading font-extrabold text-lg md:text-xl text-slate-900 dark:text-white mt-2">{selectedJob.title}</h3>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">{selectedJob.company}</p>
                </div>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-500 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                    <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Lokasi</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1"><FiMapPin />{selectedJob.location}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                    <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Gaji Estimasi</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-0.5"><FiDollarSign />{selectedJob.salary || 'Negosiasi'}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-2">Deskripsi Pekerjaan</h4>
                  <p className="text-xs md:text-sm text-slate-650 dark:text-slate-400 leading-relaxed">{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-2">Kualifikasi / Persyaratan</h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="text-xs md:text-sm text-slate-650 dark:text-slate-400 flex items-start gap-2">
                        <span className="text-blue-500 font-bold mt-0.5">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Apply */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 py-3 bg-white dark:bg-slate-700 border border-slate-250 dark:border-slate-650 text-slate-700 dark:text-white text-xs font-bold rounded-xl transition-all"
                >
                  Tutup Detail
                </button>
                <button 
                  onClick={() => setShowApplyModal(true)}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10"
                >
                  Lamar Sekarang <FiSend size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Apply Job Form Modal */}
      <AnimatePresence>
        {showApplyModal && selectedJob && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
            >
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Formulir Lamaran</h3>
                  <p className="text-xs text-slate-500">Kirim lamaran Anda ke {selectedJob.company}</p>
                </div>
                <button 
                  onClick={() => setShowApplyModal(false)}
                  className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleApplySubmit}>
                <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Nama Lengkap <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={applyName}
                      onChange={(e) => setApplyName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Alamat Email <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      value={applyEmail}
                      onChange={(e) => setApplyEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>

                  {/* Github */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">URL Portofolio Github <span className="text-red-500">*</span></label>
                    <input 
                      type="url" 
                      value={applyGithub}
                      onChange={(e) => setApplyGithub(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>

                  {/* Resume Link */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Link Resume / CV (Google Drive/PDF) <span className="text-red-500">*</span></label>
                    <input 
                      type="url" 
                      placeholder="https://drive.google.com/..."
                      value={applyResume}
                      onChange={(e) => setApplyResume(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Pesan Cover Letter (Opsional)</label>
                    <textarea 
                      placeholder="Tuliskan mengapa Anda adalah kandidat terbaik untuk peran ini."
                      value={applyCover}
                      onChange={(e) => setApplyCover(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="flex-1 py-3 bg-white dark:bg-slate-700 border border-slate-250 dark:border-slate-650 text-slate-700 dark:text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isApplying}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    {isApplying ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      'Kirim Lamaran'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Post Job Modal */}
      <AnimatePresence>
        {showPostJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
            >
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Pasang Lowongan Baru</h3>
                  <p className="text-xs text-slate-500">Pasang kebutuhan rekrutmen tim developer Anda</p>
                </div>
                <button 
                  onClick={() => setShowPostJobModal(false)}
                  className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handlePostJobSubmit}>
                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                  {/* Job Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Nama Posisi / Pekerjaan <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Senior React Developer"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Nama Perusahaan <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Contoh: PT Teknologi Utama"
                      value={postCompany}
                      onChange={(e) => setPostCompany(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Lokasi <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="Contoh: Jakarta / Remote"
                        value={postLocation}
                        onChange={(e) => setPostLocation(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        required
                      />
                    </div>

                    {/* Job Type */}
                    <div>
                      <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Tipe Pekerjaan</label>
                      <select
                        value={postType}
                        onChange={(e) => setPostType(e.target.value as 'Full-time' | 'Remote' | 'Contract' | 'Freelance')}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Remote">Remote</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Rentang Gaji Bulanan (Opsional)</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Rp 8.000.000 - Rp 12.000.000"
                      value={postSalary}
                      onChange={(e) => setPostSalary(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Deskripsi Pekerjaan <span className="text-red-500">*</span></label>
                    <textarea 
                      placeholder="Tuliskan secara singkat tugas dan peran posisi ini."
                      value={postDesc}
                      onChange={(e) => setPostDesc(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Persyaratan (Satu baris per syarat) <span className="text-red-500">*</span></label>
                    <textarea 
                      placeholder="Contoh:&#10;Keahlian minimal 1 tahun di React.js&#10;Terbiasa dengan Git/Github&#10;Bisa bekerja sama dengan tim"
                      value={postReqs}
                      onChange={(e) => setPostReqs(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs md:text-sm dark:text-white h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowPostJobModal(false)}
                    className="flex-1 py-3 bg-white dark:bg-slate-700 border border-slate-250 dark:border-slate-650 text-slate-700 dark:text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isPosting}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    {isPosting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      'Pasang Lowongan'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}