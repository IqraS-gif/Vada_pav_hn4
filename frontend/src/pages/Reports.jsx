import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileBarChart, Clock, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const mockReports = [
  { id: 'm-123', url: 'https://ecommerce-demo.com', score: 88, date: '2 hours ago', issues: 12, status: 'Passed' },
  { id: 'm-124', url: 'https://blog-internal.io', score: 62, date: '5 hours ago', issues: 34, status: 'Warning' },
  { id: 'm-125', url: 'https://marketing-site.dev', score: 95, date: '1 day ago', issues: 2, status: 'Passed' },
  { id: 'm-126', url: 'https://admin-portal.net', score: 45, date: '2 days ago', issues: 89, status: 'Critical' },
  { id: 'm-127', url: 'https://legacy-app.org', score: 22, date: '1 week ago', issues: 145, status: 'Critical' },
];

export default function Reports() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto space-y-8 font-sans">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Scan Reports</h1>
            <p className="text-slate-400">View and manage all historical accessibility audits.</p>
          </div>
        </div>

        {/* Reports Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockReports.map((report) => (
            <motion.div 
              variants={itemVariants}
              key={report.id}
              onClick={() => navigate(`/report/${report.id}`)}
              className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 hover:border-primary/50 p-6 rounded-3xl cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(108,99,255,0.1)] transition-all duration-300 group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-700/50 group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                  <FileBarChart className="text-slate-400 group-hover:text-primary transition-colors" size={24} />
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                  report.status === 'Passed' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 
                  report.status === 'Warning' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                  {report.score}/100
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 truncate group-hover:text-primary transition-colors">{report.url}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                <Clock size={16} />
                <span>{report.date}</span>
              </div>

              <div className="mt-auto pt-5 border-t border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {report.status === 'Passed' ? (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  ) : (
                    <ShieldAlert size={16} className={report.status === 'Critical' ? 'text-red-400' : 'text-yellow-400'} />
                  )}
                  <span className="text-sm font-medium text-slate-300">{report.issues} Issues Found</span>
                </div>
                <ArrowRight size={20} className="text-slate-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </PageTransition>
  );
}
