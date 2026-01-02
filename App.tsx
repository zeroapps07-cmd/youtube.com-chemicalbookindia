
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AppState, Video, Channel } from './types';
import { getVideos, getChannel, saveChannel, saveVideo, resetDB } from './db';
import { INITIAL_CHANNEL, INITIAL_VIDEOS } from './constants';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import WatchPage from './components/WatchPage';
import ChannelPage from './components/ChannelPage';
import AdminDashboard from './components/AdminDashboard';
import LoginModal from './components/LoginModal';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    videos: [],
    channel: INITIAL_CHANNEL,
    settings: { isAdmin: false, theme: 'dark' }
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const loadData = useCallback(async () => {
    let videos = await getVideos();
    let channel = await getChannel();

    if (videos.length === 0) {
      // Seed initial videos (mocked urls for demo)
      for (const v of INITIAL_VIDEOS) {
        await saveVideo(v);
      }
      videos = INITIAL_VIDEOS;
    }

    if (!channel) {
      await saveChannel(INITIAL_CHANNEL);
      channel = INITIAL_CHANNEL;
    }

    setState(prev => ({ ...prev, videos, channel }));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogin = () => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, isAdmin: true }
    }));
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, isAdmin: false }
    }));
  };

  const handleFactoryReset = async () => {
    if (window.confirm('Are you sure you want to reset everything? This will wipe all uploaded videos.')) {
      await resetDB();
      window.location.reload();
    }
  };

  const updateGlobalChannel = async (updated: Channel) => {
    await saveChannel(updated);
    setState(prev => ({ ...prev, channel: updated }));
  };

  const updateGlobalVideos = async () => {
    const videos = await getVideos();
    setState(prev => ({ ...prev, videos }));
  };

  return (
    <HashRouter>
      <div className="flex flex-col h-screen bg-[#0f0f0f] text-white overflow-hidden">
        <Header 
          isAdmin={state.settings.isAdmin} 
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          channelAvatar={state.channel.avatar}
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} isAdmin={state.settings.isAdmin} />
          
          <main className="flex-1 overflow-y-auto pt-4 transition-all duration-300">
            <Routes>
              <Route path="/" element={<div className="px-4"><Home videos={state.videos} /></div>} />
              <Route path="/watch/:id" element={<WatchPage videos={state.videos} subscribers={state.channel.subscribers} />} />
              <Route path="/channel" element={<ChannelPage channel={state.channel} videos={state.videos} isAdmin={state.settings.isAdmin} />} />
              {state.settings.isAdmin && (
                <Route path="/admin" element={
                  <div className="px-4">
                    <AdminDashboard 
                      channel={state.channel} 
                      videos={state.videos}
                      onChannelUpdate={updateGlobalChannel}
                      onVideosUpdate={updateGlobalVideos}
                      onReset={handleFactoryReset}
                    />
                  </div>
                } />
              )}
            </Routes>
          </main>
        </div>

        {isLoginModalOpen && (
          <LoginModal 
            onClose={() => setIsLoginModalOpen(false)} 
            onSuccess={handleLogin} 
          />
        )}
      </div>
    </HashRouter>
  );
};

export default App;
