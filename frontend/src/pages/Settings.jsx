import React from 'react';
import PageTransition from '../components/layout/PageTransition';

export default function Settings() {
  return (
    <PageTransition>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 space-y-6">
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">GitHub Token</label>
            <input 
              type="password" 
              placeholder="ghp_xxxxxxxxxxxx" 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
            />
            <p className="text-xs text-slate-500 mt-2">Required for creating Github issues directly from reports.</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
