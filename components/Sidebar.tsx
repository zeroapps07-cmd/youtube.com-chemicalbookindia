
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isAdmin }) => {
  const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center gap-5 px-3 py-2.5 rounded-xl transition-colors ${
          isActive ? 'bg-zinc-800 font-bold' : 'hover:bg-zinc-900'
        }`
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </NavLink>
  );

  if (!isOpen) {
    return (
      <aside className="w-16 flex flex-col items-center py-4 bg-zinc-950 gap-4 hidden md:flex border-r border-zinc-900">
        <NavLink to="/" className="p-2 hover:bg-zinc-900 rounded-xl">
           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </NavLink>
        {isAdmin && (
           <NavLink to="/admin" className="p-2 hover:bg-zinc-900 rounded-xl">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
           </NavLink>
        )}
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-zinc-950 flex flex-col gap-2 p-3 border-r border-zinc-900 overflow-y-auto hidden md:flex">
      <NavItem 
        to="/" 
        label="Home" 
        icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>} 
      />
      <NavItem 
        to="/shorts" 
        label="Shorts" 
        icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>} 
      />
      <NavItem 
        to="/subscriptions" 
        label="Subscriptions" 
        icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.7 3H5.3C4.03 3 3 4.03 3 5.3v13.4C3 19.97 4.03 21 5.3 21h13.4c1.27 0 2.3-1.03 2.3-2.3V5.3C21 4.03 19.97 3 18.7 3zm-7.46 12.85v-7.7L16.03 12l-4.79 3.85z"/></svg>} 
      />

      <hr className="border-zinc-800 my-2" />

      <h3 className="px-3 py-2 text-sm font-bold text-zinc-400">You</h3>
      <NavItem 
        to="/channel" 
        label="Your channel" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} 
      />
      <NavItem 
        to="/history" 
        label="History" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} 
      />

      {isAdmin && (
        <>
          <hr className="border-zinc-800 my-2" />
          <h3 className="px-3 py-2 text-sm font-bold text-zinc-400">Admin Only</h3>
          <NavItem 
            to="/admin" 
            label="Dashboard" 
            icon={<svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} 
          />
        </>
      )}
    </aside>
  );
};

export default Sidebar;
