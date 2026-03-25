import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import Scan from '../pages/Scan';
import Reports from '../pages/Reports';
import Report from '../pages/Report';
import Projects from '../pages/Projects';
import Settings from '../pages/Settings';

import ProtectedRoute from '../components/layout/ProtectedRoute';
import Layout from '../components/layout/Layout';
import PageTransition from '../components/layout/PageTransition';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/report/:id" element={<Report />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/extension" element={
            <PageTransition>
              <div className="max-w-2xl">
                <h1 className="text-3xl font-bold text-white mb-6">Chrome Extension</h1>
                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                  <p className="text-slate-400">Chrome Extension management panel.</p>
                </div>
              </div>
            </PageTransition>
          } />
        </Route>
      </Route>
    </Routes>
  );
}
