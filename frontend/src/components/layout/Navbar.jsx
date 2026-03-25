import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="h-20 bg-dark/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 mr-4 text-slate-400 hover:text-white focus:outline-none"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold hidden sm:block text-slate-200">Welcome back, {user?.name || 'User'}!</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
          <Bell size={20} />
        </button>
        <div className="h-8 w-px bg-slate-700 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleLogout}>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          </div>
          <div className="hidden md:block text-sm text-left">
            <p className="font-medium text-white group-hover:text-primary transition-colors">Sign Out</p>
          </div>
        </div>
      </div>
    </header>
  );
}
