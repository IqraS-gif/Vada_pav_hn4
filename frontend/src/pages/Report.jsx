import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Maximize2 } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import FloatingChatbot from '../components/chatbot/FloatingChatbot';

// Mock Data
const issues = [
  { id: 1, title: 'Missing Alt Text', element: '<img class="hero-bg" />', severity: 'critical', desc: 'Screen readers cannot describe this image.' },
  { id: 2, title: 'Low Contrast Rate (3.1:1)', element: '<span class="text-gray-500">', severity: 'warning', desc: 'Text is hard to read against the background.' },
  { id: 3, title: 'Missing Form Label', element: '<input type="email" />', severity: 'critical', desc: 'Form controls must have identifying labels.' },
];

const visualMarkers = [
  { id: 1, x: '15%', y: '25%', severity: 'critical', issueId: 1 },
  { id: 2, x: '55%', y: '65%', severity: 'warning', issueId: 2 },
  { id: 3, x: '75%', y: '50%', severity: 'critical', issueId: 3 },
];

export default function Report() {
  const [activeIssue, setActiveIssue] = useState(null);

  return (
    <PageTransition>
      <div className="max-w-[1600px] mx-auto h-[calc(100vh-8rem)] flex flex-col font-sans relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 shrink-0 max-w-5xl mx-auto w-full">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Audit Report</h1>
            <p className="text-slate-400">Target: <span className="text-primary font-medium">https://example.com/checkout</span></p>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl border border-slate-700 transition-colors shadow-sm text-sm font-medium">
            Export PDF
          </button>
        </div>

        {/* Main Section */}
        <div className="flex-1 flex justify-center w-full min-h-0">
          
          <div className="w-full max-w-5xl flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 pb-6">
            
            {/* Top Row: Score & Visual Explorer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
              
              {/* Score Card */}
              <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[50px] rounded-full"></div>
                <h3 className="text-slate-400 font-medium mb-6 w-full text-left">Overall Score</h3>
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="80" cy="80" r="70" className="stroke-slate-700" strokeWidth="12" fill="none" />
                    <circle cx="80" cy="80" r="70" className="stroke-yellow-500 drop-shadow-lg transition-all duration-1000" strokeWidth="12" fill="none" strokeDasharray="439" strokeDashoffset="141" strokeLinecap="round" />
                  </svg>
                  <div className="text-center mt-2">
                    <span className="text-5xl font-black text-white">68</span>
                    <span className="text-xl text-slate-500">/100</span>
                  </div>
                </div>
                <div className="mt-6 flex gap-4 text-sm font-medium">
                  <span className="flex items-center gap-1.5 text-red-400 bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20"><ShieldAlert size={16} /> 2 Critical</span>
                  <span className="flex items-center gap-1.5 text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-lg border border-yellow-400/20"><AlertTriangle size={16} /> 1 Warning</span>
                </div>
              </div>

              {/* Visual Explorer */}
              <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 rounded-3xl flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-slate-300 font-medium flex items-center gap-2"><Maximize2 size={16} className="text-primary"/> Visual Explorer</h3>
                </div>
                
                {/* CSS Webpage Mock */}
                <div className="flex-1 w-full bg-slate-900 rounded-xl border border-slate-700 overflow-hidden relative shadow-inner flex flex-col min-h-[200px]">
                  <div className="h-6 border-b border-slate-700 bg-slate-800/80 flex items-center px-3 gap-2 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="p-4 flex flex-col gap-4 opacity-50 pointer-events-none h-full">
                    <div className="h-16 bg-slate-800 rounded-lg w-full"></div>
                    <div className="flex gap-4 flex-1">
                      <div className="bg-slate-800 rounded-lg w-1/3 h-full"></div>
                      <div className="bg-slate-800 rounded-lg w-2/3 h-full"></div>
                    </div>
                  </div>

                  {visualMarkers.map((marker, idx) => {
                    const isActive = activeIssue === marker.issueId;
                    return (
                      <motion.div 
                        key={idx}
                        className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-out ${
                          marker.severity === 'critical' ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50'
                        } ${isActive ? 'scale-150 shadow-[0_0_15px_rgba(239,68,68,0.3)] z-20' : 'z-10 hover:scale-[1.2]'}`}
                        style={{ left: marker.x, top: `calc(${marker.y} + 24px)` }}
                        onClick={() => setActiveIssue(marker.issueId)}
                      >
                        <div className={`w-2 h-2 rounded-full ${marker.severity === 'critical' ? 'bg-red-500' : 'bg-yellow-500'} ${isActive ? 'animate-ping' : ''}`}></div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Issue Breakdown */}
            <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 rounded-3xl shrink-0">
              <h3 className="text-xl font-bold text-white mb-6">Issue Breakdown</h3>
              <div className="space-y-3">
                {issues.map((issue) => (
                  <div 
                    key={issue.id}
                    onClick={() => setActiveIssue(issue.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      activeIssue === issue.id 
                      ? 'bg-primary/5 border-primary shadow-[0_0_20px_rgba(108,99,255,0.05)] scale-[1.01]' 
                      : 'bg-slate-900/40 border-slate-700/50 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        {issue.severity === 'critical' 
                          ? <ShieldAlert size={20} className="text-red-400" />
                          : <AlertTriangle size={20} className="text-yellow-400" />
                        }
                        <h4 className="font-semibold text-slate-200">{issue.title}</h4>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md tracking-wide ${
                        issue.severity === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {issue.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="pl-8">
                      <p className="text-sm text-slate-400 mb-3">{issue.desc}</p>
                      <div className="inline-block bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                        <code className="text-xs text-primary font-mono">{issue.element}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Intercom-style Chat Component */}
      <FloatingChatbot />
      
    </PageTransition>
  );
}
