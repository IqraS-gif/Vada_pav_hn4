import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Chrome, Upload, Download, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

export default function Scan() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('url');
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = (e) => {
    e.preventDefault();
    if (!url) return;
    
    setIsScanning(true);
    setScanProgress(0);
    
    // Mock scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            navigate('/report/m-123'); // Redirect to report ID
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      navigate('/report/m-123'); // Redirect to report ID
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-8 font-sans">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Accessibility Scanner</h1>
          <p className="text-slate-400">Audit your web applications for WCAG compliance.</p>
        </div>

        {/* Tabs Header */}
        <div className="flex p-1 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 w-full sm:w-fit">
          <button
            onClick={() => setActiveTab('url')}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto overflow-hidden ${
              activeTab === 'url' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'url' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-slate-700/80 border border-slate-600 rounded-xl -z-10 shadow-sm"
              />
            )}
            <Globe size={18} />
            URL Scanner
          </button>
          
          <button
            onClick={() => setActiveTab('extension')}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto overflow-hidden ${
              activeTab === 'extension' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'extension' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-slate-700/80 border border-slate-600 rounded-xl -z-10 shadow-sm"
              />
            )}
            <Chrome size={18} />
            Chrome Extension
          </button>
        </div>

        {/* Tabs Content */}
        <div className="relative mt-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* URL SCANNER TAB */}
            {activeTab === 'url' && (
              <motion.div
                key="url"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 sm:p-10 rounded-3xl shadow-xl"
              >
                <div className="max-w-xl mx-auto text-center space-y-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto text-primary border border-primary/20 shadow-inner">
                    <Search size={32} />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Scan Live URL</h2>
                    <p className="text-slate-400">Enter any public URL to initiate a comprehensive WCAG accessibility audit in the cloud.</p>
                  </div>

                  <form onSubmit={handleScan} className="relative mt-8">
                    <div className="relative flex items-center">
                      <Globe className="absolute left-4 text-slate-500" size={20} />
                      <input 
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        required
                        disabled={isScanning}
                        className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-12 pr-36 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner disabled:opacity-50"
                      />
                      <button 
                        type="submit"
                        disabled={isScanning || !url}
                        className="absolute right-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50 text-slate-900 font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
                      >
                        {isScanning ? 'Scanning' : 'Scan Now'}
                        {!isScanning && <ArrowRight size={18} />}
                      </button>
                    </div>
                  </form>

                  {/* Mock Loading State */}
                  <AnimatePresence>
                    {isScanning && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-8"
                      >
                        <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 text-left shadow-inner">
                          <div className="flex justify-between items-center mb-4 text-sm font-medium">
                            <span className="text-white flex items-center gap-3">
                              <Loader2 className="animate-spin text-primary" size={18} />
                              Analyzing DOM structures & contrast...
                            </span>
                            <span className="text-primary font-bold">{scanProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
                            <motion.div 
                              className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${scanProgress}%` }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            )}

            {/* EXTENSION TAB */}
            {activeTab === 'extension' && (
              <motion.div
                key="extension"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Instructions Card */}
                <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-xl flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary mb-6 shadow-inner border border-secondary/20">
                    <Chrome size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Local & Auth Scans</h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">Use our Chrome Extension to audit internal dashboards, localhost environments, and strictly authenticated pages easily.</p>
                  
                  <ul className="space-y-5 mb-8 flex-1">
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/20 p-1.5 rounded-full text-primary shadow-inner"><CheckCircle size={14} /></div>
                      <span className="text-slate-300 text-sm leading-relaxed">Download and install the extension packet in developer mode.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/20 p-1.5 rounded-full text-primary shadow-inner"><CheckCircle size={14} /></div>
                      <span className="text-slate-300 text-sm leading-relaxed">Navigate to any authenticated page or localhost port.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/20 p-1.5 rounded-full text-primary shadow-inner"><CheckCircle size={14} /></div>
                      <span className="text-slate-300 text-sm leading-relaxed">Click "Generate Report" inside the extension and save the JSON output.</span>
                    </li>
                  </ul>

                  <button className="w-full bg-slate-700/80 hover:bg-slate-600 border border-slate-600 text-white font-medium py-3.5 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
                    <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                    Download Extension
                  </button>
                </div>

                {/* Upload Card */}
                <div className="bg-slate-800/20 backdrop-blur-xl border-2 border-dashed border-slate-700 hover:border-primary border-opacity-50 hover:bg-slate-800/40 p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center transition-all duration-300 group relative overflow-hidden min-h-[300px]">
                  <input 
                    type="file" 
                    accept=".json"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    title=""
                  />
                  <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300 mb-6 shadow-inner">
                    <Upload size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">Upload JSON Report</h3>
                  <p className="text-slate-400 text-sm max-w-[240px] leading-relaxed">Drag and drop the `.json` report generated by your Chrome Extension, or click right here to browse.</p>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
