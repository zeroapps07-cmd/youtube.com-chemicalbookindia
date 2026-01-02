
import React from 'react';
import { Channel, Video } from '../types';
import VideoCard from './VideoCard';
import { useNavigate } from 'react-router-dom';

interface ChannelPageProps {
  channel: Channel;
  videos: Video[];
  isAdmin: boolean;
}

const ChannelPage: React.FC<ChannelPageProps> = ({ channel, videos, isAdmin }) => {
  const navigate = useNavigate();

  const formatSubs = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="max-w-[1284px] mx-auto overflow-x-hidden">
      <div className="px-4 md:px-6">
        <div className="aspect-[6.2/1] w-full rounded-2xl overflow-hidden bg-zinc-800 mt-4">
          <img src={channel.banner} className="w-full h-full object-cover" alt="Banner" />
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center md:items-start gap-6 px-2">
          <div className="flex-none w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0f0f0f] overflow-hidden bg-zinc-800 shadow-xl">
            <img src={channel.avatar} className="w-full h-full object-cover" alt="Avatar" />
          </div>
          
          <div className="flex-1 flex flex-col text-center md:text-left pt-2">
            <h1 className="text-3xl font-bold tracking-tight">{channel.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2 text-zinc-400 font-medium mt-1 text-sm md:text-base">
              <span>{channel.handle}</span>
              <span className="hidden md:inline">•</span>
              <span>{formatSubs(channel.subscribers)} subscribers</span>
              <span className="hidden md:inline">•</span>
              <span>{videos.length} videos</span>
            </div>
            <p className="text-zinc-400 text-sm mt-3 line-clamp-2 max-w-2xl font-normal leading-relaxed">{channel.description}</p>
            
            <div className="mt-5 flex justify-center md:justify-start gap-2">
              {isAdmin ? (
                <>
                  <button 
                    onClick={() => navigate('/admin')}
                    className="px-6 py-2 bg-[#272727] hover:bg-[#3f3f3f] rounded-full text-sm font-bold transition-colors"
                  >
                    Customize channel
                  </button>
                  <button 
                    onClick={() => navigate('/admin')}
                    className="px-6 py-2 bg-[#272727] hover:bg-[#3f3f3f] rounded-full text-sm font-bold transition-colors"
                  >
                    Manage videos
                  </button>
                </>
              ) : (
                <button className="px-6 py-2 bg-white text-black hover:bg-zinc-200 rounded-full text-sm font-bold transition-colors">
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-b border-zinc-800 flex gap-8 px-2 overflow-x-auto no-scrollbar">
          {['Home', 'Videos', 'Shorts', 'Playlists', 'Community', 'About'].map((tab, i) => (
            <button key={tab} className={`pb-3 text-sm md:text-base font-bold border-b-2 transition-colors whitespace-nowrap ${i === 1 ? 'border-white text-white' : 'border-transparent text-zinc-400 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 pb-24">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
