
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  isAdmin: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
  toggleSidebar: () => void;
  channelAvatar: string;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, onOpenLogin, onLogout, toggleSidebar, channelAvatar }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-[#0f0f0f] border-b border-transparent">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
        <Link to="/" className="flex items-center gap-1 group">
          <div className="flex items-center gap-0.5">
            <svg className="w-8 h-8 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="text-xl font-bold tracking-tighter hidden sm:block">YouTube</span>
            <span className="text-[10px] text-zinc-400 self-start ml-0.5 mt-1 font-normal uppercase">IN</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 max-w-[720px] px-8 hidden md:flex items-center gap-4">
        <div className="flex flex-1 items-center">
          <div className="flex flex-1 items-center bg-[#121212] border border-zinc-700 rounded-full overflow-hidden focus-within:border-blue-500">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-transparent py-2 px-5 focus:outline-none text-base font-normal"
            />
            <button className="px-6 bg-zinc-800 border-l border-zinc-700 hover:bg-zinc-700 transition-colors py-2">
              <svg className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <button className="ml-4 p-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isAdmin ? (
          <>
            <button 
              onClick={() => navigate('/admin')}
              className="p-2 hover:bg-zinc-800 rounded-full text-white relative group"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Dashboard</span>
            </button>
            <Link to="/channel" className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700 ml-2 hover:opacity-80 transition-opacity">
               <img src={channelAvatar} className="w-full h-full object-cover" alt="Avatar" />
            </Link>
            <button 
              onClick={onLogout}
              className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-medium ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <button 
            onClick={onOpenLogin}
            className="flex items-center gap-2 px-4 py-1.5 border border-zinc-700 rounded-full text-blue-400 hover:bg-blue-400/10 transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
