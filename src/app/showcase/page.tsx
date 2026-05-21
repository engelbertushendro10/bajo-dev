'use client';

import { useState, useEffect } from 'react';
import { FiExternalLink, FiUser, FiGithub, FiPlus, FiX, FiCode, FiLink } from 'react-icons/fi';
import { useUser } from '@/lib/UserContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  author: string;
  image: string;
  github: string;
  link: string;
  tags: string[];
  description?: string;
  dateAdded?: string;
}

const staticProjects: Project[] = [
  {
    title: 'Website Portofolio 3D',
    author: 'Ahmad_Bajo',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&h=380&q=80',
    github: 'https://github.com',
    link: 'https://github.com',
    tags: ['Next.js', 'Tailwind', 'Three.js'],
    description: 'Portofolio interaktif 3D dengan rendering model personal menggunakan Three.js dan Framer Motion.'
  },
  {
    title: 'Aplikasi Catatan Cloud',
    author: 'Siti_Dev',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&h=380&q=80',
    github: 'https://github.com',
    link: 'https://github.com',
    tags: ['React', 'Firebase', 'Tailwind'],
    description: 'Catatan pribadi real-time tersinkronisasi multi-device, lengkap dengan enkripsi data client-side.'
  },
  {
    title: 'E-Commerce Marketplace',
    author: 'Rizky_Codes',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d296e?auto=format&fit=crop&w=600&h=380&q=80',
    github: 'https://github.com',
    link: 'https://github.com',
    tags: ['Laravel', 'MySQL', 'Bootstrap'],
    description: 'Aplikasi e-commerce lengkap dengan integrasi payment gateway Midtrans dan notifikasi Whatsapp.'
  },
];

export default function ShowcasePage() {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formGithub, setFormGithub] = useState('');
  const [formDemo, setFormDemo] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formImage, setFormImage] = useState('');

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem('bajodev_showcase_projects');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Project[];
        setProjects([...parsed, ...staticProjects]);
      } catch (e) {
        console.error(e);
        setProjects(staticProjects);
      }
    } else {
      setProjects(staticProjects);
    }
  }, []);

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim() || !formDesc.trim() || !formGithub.trim() || !formDemo.trim() || !formTags.trim()) {
      toast.error('Silakan isi seluruh kolom yang wajib');
      return;
    }

    // Process tags
    const processedTags = formTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    // Create project object
    const newProject: Project = {
      title: formTitle.trim(),
      author: user ? user.username : 'Guest_Developer',
      image: formImage.trim() || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=380&q=80`,
      github: formGithub.trim(),
      link: formDemo.trim(),
      tags: processedTags,
      description: formDesc.trim(),
      dateAdded: new Date().toISOString()
    };

    // Save
    const stored = localStorage.getItem('bajodev_showcase_projects');
    let parsedStored: Project[] = [];
    if (stored) {
      try {
        parsedStored = JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    const updatedStored = [newProject, ...parsedStored];
    localStorage.setItem('bajodev_showcase_projects', JSON.stringify(updatedStored));
    
    // Update local state list
    setProjects([newProject, ...projects]);
    
    // Reset Form
    setFormTitle('');
    setFormDesc('');
    setFormGithub('');
    setFormDemo('');
    setFormTags('');
    setFormImage('');
    
    setShowSubmitModal(false);
    toast.success('Projek kamu sukses di-submit ke Showcase! 🎉');
  };

  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="text-left">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Showcase Karya <span className="text-blue-600">Member</span>
            </h1>
            <p className="text-sm md:text-base text-slate-650 dark:text-slate-400 max-w-xl">
              Galeri proyek buatan komunitas Bajo Dev. Tempat berbagi inspirasi, mendapatkan review, dan melatih kemahiran.
            </p>
          </div>
          <div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/10 active:scale-98 text-sm"
            >
              <FiPlus size={18} /> Submit Projek Kamu
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
              key={index} 
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-850 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-800 transition-all flex flex-col group"
            >
              {/* Image Preview with overlay */}
              <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=380&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-[10px] text-white/95 font-semibold">Ditambahkan oleh @{project.author}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-heading font-extrabold text-base md:text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                  {project.title}
                </h3>
                
                <p className="text-xs text-slate-400 dark:text-slate-550 flex items-center gap-1 mb-3">
                  <FiUser size={13} className="text-slate-400" />
                  <span>@{project.author}</span>
                </p>

                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/30 dark:border-slate-700/30 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-850/80">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-450 dark:hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <FiGithub size={15} /> Source Code
                  </a>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors ml-auto"
                  >
                    Live Demo <FiExternalLink size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Submit Project Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Submit Projek Baru</h3>
                  <p className="text-xs text-slate-500">Bagikan karyamu dengan komunitas developer</p>
                </div>
                <button 
                  onClick={() => setShowSubmitModal(false)}
                  className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmitProject}>
                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Judul Projek <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Aplikasi Pengingat Minum Air"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs md:text-sm dark:text-white"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Deskripsi Singkat <span className="text-red-500">*</span></label>
                    <textarea 
                      placeholder="Jelaskan kegunaan projek dan teknologi apa yang digunakan secara ringkas."
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs md:text-sm dark:text-white h-24 resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Github URL */}
                    <div>
                      <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5 flex items-center gap-1"><FiGithub /> Link Github <span className="text-red-500">*</span></label>
                      <input 
                        type="url" 
                        placeholder="https://github.com/username/repo"
                        value={formGithub}
                        onChange={(e) => setFormGithub(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs md:text-sm dark:text-white"
                        required
                      />
                    </div>

                    {/* Live Demo URL */}
                    <div>
                      <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5 flex items-center gap-1"><FiLink /> Link Live Demo <span className="text-red-500">*</span></label>
                      <input 
                        type="url" 
                        placeholder="https://demo.project.com"
                        value={formDemo}
                        onChange={(e) => setFormDemo(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs md:text-sm dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5 flex items-center gap-1"><FiCode /> Tags (Pisahkan dengan koma) <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="React, Next.js, Tailwind, Firebase"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs md:text-sm dark:text-white"
                      required
                    />
                  </div>

                  {/* Thumbnail Image URL */}
                  <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Link URL Gambar Thumbnail (Opsional)</label>
                    <input 
                      type="url" 
                      placeholder="https://link-gambar.com/thumbnail.png"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs md:text-sm dark:text-white"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Kosongkan untuk menggunakan gambar template default developer.</p>
                  </div>
                </div>

                {/* Footer Modal Actions */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="flex-1 py-3 bg-white dark:bg-slate-700 border border-slate-250 dark:border-slate-650 text-slate-700 dark:text-white text-sm font-bold rounded-xl transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md"
                  >
                    Submit Projek
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