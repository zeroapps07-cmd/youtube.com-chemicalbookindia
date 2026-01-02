
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Video } from '../types';
import VideoCard from './VideoCard';

interface WatchPageProps {
  videos: Video[];
  subscribers?: number;
}

const WatchPage: React.FC<WatchPageProps> = ({ videos, subscribers = 15400 }) => {
  const { id } = useParams();
  const video = useMemo(() => videos.find(v => v.id === id), [videos, id]);
  const relatedVideos = useMemo(() => videos.filter(v => v.id !== id), [videos, id]);

  const formatSubs = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (!video) return <div className="p-10 text-center text-zinc-500">Video not found.</div>;

  return (
    <div className="max-w-[1700px] mx-auto flex flex-col xl:flex-row gap-6 px-2 md:px-6">
      <div className="flex-1 min-w-0">
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
          {video.videoUrl ? (
             <video 
              src={video.videoUrl} 
              controls 
              autoPlay 
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-4 bg-[#0a0a0a]">
              <svg className="w-20 h-20 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              <p className="text-sm font-medium">Demo Video Placeholder</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <h1 className="text-xl font-bold line-clamp-2">{video.title}</h1>
          
          <div className="flex flex-wrap items-center justify-between gap-y-4">
            <div className="flex items-center gap-3">
              <Link to="/channel" className="flex-none w-10 h-10 rounded-full bg-zinc-800 overflow-hidden hover:opacity-90 transition-opacity">
                <img src={video.channelAvatar} className="w-full h-full object-cover" alt="Avatar" />
              </Link>
              <div className="flex flex-col min-w-0 pr-2">
                <Link to="/channel" className="font-bold text-base leading-tight hover:text-zinc-300 transition-colors truncate">{video.channelName}</Link>
                <p className="text-xs text-zinc-400 font-normal">{formatSubs(subscribers)} subscribers</p>
              </div>
              <button className="ml-2 bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#272727] rounded-full overflow-hidden">
                <button className="px-4 py-2 flex items-center gap-2 hover:bg-[#3f3f3f] transition-colors border-r border-[#3f3f3f]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.704a1 1 0 01.94 1.355l-1.473 4.419A2 2 0 0116.271 17.143H8.666a1 1 0 01-.75-.339l-4.266-4.8a1 1 0 010-1.322l4.266-4.8a1 1 0 01.75-.339h1.166" /></svg>
                  <span className="text-sm font-bold">{video.likes.toLocaleString()}</span>
                </button>
                <button className="px-4 py-2 hover:bg-[#3f3f3f] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.296a1 1 0 01-.94-1.355l1.473-4.419A2 2 0 017.729 6.857h7.605a1 1 0 01.75.339l4.266 4.8a1 1 0 010 1.322l-4.266 4.8a1 1 0 01-.75.339h-1.166" /></svg>
                </button>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-[#272727] rounded-full hover:bg-[#3f3f3f] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                <span className="text-sm font-bold">Share</span>
              </button>

              <button className="p-2 bg-[#272727] rounded-full hover:bg-[#3f3f3f] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </button>
            </div>
          </div>

          <div className="bg-[#272727] hover:bg-[#3f3f3f] p-3 rounded-xl text-sm leading-relaxed transition-colors cursor-pointer mt-2">
            <div className="font-bold flex gap-3 mb-1">
              <span>{video.views.toLocaleString()} views</span>
              <span>{video.uploadDate}</span>
            </div>
            <p className="whitespace-pre-wrap">{video.description}</p>
          </div>
        </div>

        <div className="mt-6 pb-12">
           <h3 className="text-xl font-bold mb-6">{video.commentsCount.toLocaleString()} Comments</h3>
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg flex-none">U</div>
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="w-full bg-transparent border-b border-zinc-700 pb-2 focus:outline-none focus:border-white transition-colors"
                />
              </div>
           </div>
        </div>
      </div>

      <div className="xl:w-[400px] flex flex-col gap-3">
        {relatedVideos.map(v => (
          <VideoCard key={v.id} video={v} compact />
        ))}
        {relatedVideos.length === 0 && (
          <p className="text-zinc-500 text-center py-10 text-sm">No related videos available.</p>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
