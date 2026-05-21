'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiPlay, FiRefreshCw, FiCode, FiArrowLeft, FiEye, FiZap, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Presets
const PRESETS = {
  hello: {
    name: 'Hello World',
    html: `<h1>Halo Dunia! 👋</h1>
<p>Selamat datang di Playground Interaktif Bajo Dev.</p>
<button id="btn">Klik Saya</button>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #1e3a8a;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #2563eb, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  color: #475569;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
  transition: all 0.2s;
}

button:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}`,
    js: `const button = document.getElementById('btn');
button.addEventListener('click', () => {
  alert('Halo! Anda sukses menjalankan JavaScript di Sandbox ini! 🚀');
});`
  },
  card: {
    name: 'CSS Glass Card',
    html: `<div class="card">
  <div class="glow"></div>
  <h2>Bajo Dev Pro</h2>
  <p>Nikmati konten belajar premium tanpa batasan sekarang.</p>
  <a href="#" class="btn">Pelajari Lebih Lanjut</a>
</div>`,
    css: `body {
  font-family: sans-serif;
  background: #0f172a;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  margin: 0;
  overflow: hidden;
}

.card {
  position: relative;
  width: 320px;
  padding: 2.5rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  text-align: center;
  color: white;
}

h2 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: bold;
  border-radius: 9999px;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

.glow {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100px;
  height: 100px;
  background: #3b82f6;
  filter: blur(50px);
  opacity: 0.3;
  pointer-events: none;
}`,
    js: `// Animasi hover glow card
const card = document.querySelector('.card');
card.addEventListener('mousemove', (e) => {
  const glow = document.querySelector('.glow');
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - 50;
  const y = e.clientY - rect.top - 50;
  glow.style.left = x + 'px';
  glow.style.top = y + 'px';
});`
  },
  counter: {
    name: 'Interactive Counter',
    html: `<div class="counter-container">
  <h3>Interactive Counter</h3>
  <div id="counter">0</div>
  <div class="actions">
    <button id="dec">-</button>
    <button id="reset">Reset</button>
    <button id="inc">+</button>
  </div>
</div>`,
    css: `body {
  font-family: system-ui, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f8fafc;
  color: #0f172a;
}

.counter-container {
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  text-align: center;
  min-width: 250px;
}

h3 {
  margin-top: 0;
  color: #64748b;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

#counter {
  font-size: 4rem;
  font-weight: 800;
  margin: 1.5rem 0;
  color: #2563eb;
  transition: transform 0.1s ease-out;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

button {
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e2e8f0;
  background-color: #f1f5f9;
  color: #334155;
}

button:hover {
  background-color: #e2e8f0;
}

#inc {
  background-color: #2563eb;
  color: white;
  border: none;
}

#inc:hover {
  background-color: #1d4ed8;
}

#dec {
  background-color: #ef4444;
  color: white;
  border: none;
}

#dec:hover {
  background-color: #dc2626;
}`,
    js: `const counter = document.getElementById('counter');
const dec = document.getElementById('dec');
const inc = document.getElementById('inc');
const reset = document.getElementById('reset');

let count = 0;

function update(val) {
  count += val;
  counter.innerText = count;
  
  // Efek zoom bounce
  counter.style.transform = 'scale(1.2)';
  setTimeout(() => {
    counter.style.transform = 'scale(1)';
  }, 100);
}

inc.addEventListener('click', () => update(1));
dec.addEventListener('click', () => update(-1));
reset.addEventListener('click', () => {
  count = 0;
  counter.innerText = count;
});`
  }
};

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [htmlCode, setHtmlCode] = useState(PRESETS.hello.html);
  const [cssCode, setCssCode] = useState(PRESETS.hello.css);
  const [jsCode, setJsCode] = useState(PRESETS.hello.js);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;

    const blob = new Blob([documentContents], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
  };

  // Compile on first load or when running manual
  useEffect(() => {
    runCode();
  }, []);

  const selectPreset = (key: keyof typeof PRESETS) => {
    setHtmlCode(PRESETS[key].html);
    setCssCode(PRESETS[key].css);
    setJsCode(PRESETS[key].js);
    toast.success(`Preset ${PRESETS[key].name} berhasil dimuat!`);
    
    // Quick delay to compile new presets
    setTimeout(() => {
      if (iframeRef.current) {
        const doc = `
          <!DOCTYPE html>
          <html>
            <head><style>${PRESETS[key].css}</style></head>
            <body>
              ${PRESETS[key].html}
              <script>${PRESETS[key].js}</script>
            </body>
          </html>
        `;
        const blob = new Blob([doc], { type: 'text/html' });
        iframeRef.current.src = URL.createObjectURL(blob);
      }
    }, 100);
  };

  const handleDownload = () => {
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bajo Dev Playground Project</title>
  <style>
    ${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
  <script>
    ${jsCode}
  </script>
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bajo-dev-sandbox.html';
    a.click();
    toast.success('File HTML berhasil didownload!');
  };

  return (
    <div className="min-h-screen pt-16 bg-slate-900 text-slate-100 flex flex-col">
      {/* Upper header */}
      <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/tutorials" className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <FiArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
            <h1 className="font-heading font-bold text-sm md:text-base">Playground Sandbox</h1>
          </div>
        </div>

        {/* Presets tab */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold mr-1">Presets:</span>
          {Object.keys(PRESETS).map((key) => (
            <button
              key={key}
              onClick={() => selectPreset(key as keyof typeof PRESETS)}
              className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-350 hover:text-white font-bold rounded-lg border border-slate-700/50 transition-all"
            >
              {PRESETS[key as keyof typeof PRESETS].name}
            </button>
          ))}
        </div>

        {/* Action button bar */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDownload}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700/50 transition-colors"
            title="Download Single File HTML"
          >
            <FiDownload size={16} />
          </button>
          <button 
            onClick={runCode}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-md active:scale-98"
          >
            <FiPlay size={14} /> Jalankan
          </button>
        </div>
      </div>

      {/* Editor & Preview Pane */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editor Area (Left/Top) */}
        <div className="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900">
          {/* Tab buttons */}
          <div className="bg-slate-950 border-b border-slate-800 flex items-center px-4">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'html' 
                  ? 'border-blue-500 text-blue-400 bg-slate-900/50' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FiCode className="text-orange-500" size={14} /> HTML
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'css' 
                  ? 'border-blue-500 text-blue-400 bg-slate-900/50' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FiCode className="text-blue-400" size={14} /> CSS
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`px-4 py-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'js' 
                  ? 'border-blue-500 text-blue-400 bg-slate-900/50' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FiCode className="text-yellow-400" size={14} /> JavaScript
            </button>

            {/* Micro instructions */}
            <span className="ml-auto text-[10px] text-slate-500 flex items-center gap-1">
              <FiZap size={11} className="text-yellow-500" /> Tulis kode & klik Jalankan
            </span>
          </div>

          {/* Code Textareas */}
          <div className="flex-1 relative font-mono text-sm leading-relaxed p-4 bg-slate-950/40">
            {activeTab === 'html' && (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-full min-h-[300px] lg:min-h-0 bg-transparent text-slate-100 border-none outline-none focus:ring-0 resize-none font-mono font-medium focus:outline-none"
                style={{ fontFamily: "'Fira Code', 'Consolas', monospace" }}
                placeholder="Masukkan tag HTML di sini..."
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className="w-full h-full min-h-[300px] lg:min-h-0 bg-transparent text-slate-100 border-none outline-none focus:ring-0 resize-none font-mono font-medium focus:outline-none"
                style={{ fontFamily: "'Fira Code', 'Consolas', monospace" }}
                placeholder="Masukkan style CSS di sini..."
              />
            )}
            {activeTab === 'js' && (
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                className="w-full h-full min-h-[300px] lg:min-h-0 bg-transparent text-slate-100 border-none outline-none focus:ring-0 resize-none font-mono font-medium focus:outline-none"
                style={{ fontFamily: "'Fira Code', 'Consolas', monospace" }}
                placeholder="Masukkan script JS di sini..."
              />
            )}
          </div>
        </div>

        {/* Live Preview Panel (Right/Bottom) */}
        <div className="w-full lg:w-1/2 flex flex-col bg-slate-900">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold select-none">
            <span className="flex items-center gap-1.5"><FiEye size={14} className="text-blue-500" /> Hasil Render Live</span>
            <button 
              onClick={runCode}
              className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
              title="Refresh Preview"
            >
              <FiRefreshCw size={13} />
            </button>
          </div>
          <div className="flex-1 bg-white relative min-h-[350px] lg:min-h-0">
            <iframe
              ref={iframeRef}
              className="w-full h-full border-none bg-white"
              title="Sandbox Visualizer"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
