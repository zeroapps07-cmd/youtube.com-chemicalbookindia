
import React, { useState, useEffect } from 'react';
import { Channel, Video } from '../types';
import VideoForm from './VideoForm';
import { deleteVideo, saveChannel } from '../db';

interface AdminDashboardProps {
  channel: Channel;
  videos: Video[];
  onChannelUpdate: (updated: Channel) => void;
  onVideosUpdate: () => void;
  onReset: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ channel, videos, onChannelUpdate, onVideosUpdate, onReset }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'customize'>('content');
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isAddingVideo, setIsAddingVideo] = useState(false);

  const [channelForm, setChannelForm] = useState(channel);

  useEffect(() => {
    setChannelForm(channel);
  }, [channel]);

  const handleChannelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onChannelUpdate(channelForm);
    alert('Brand updated successfully!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatar' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setChannelForm(prev => ({ ...prev, [field]: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this video forever?')) {
      await deleteVideo(id);
      onVideosUpdate();
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 mt-4">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold">Channel Content</h1>
          <p className="text-zinc-400 text-sm">Manage videos and brand settings for {channel.name}</p>
        </div>
        <div className="flex gap-3">
           <button 
            onClick={onReset}
            className="px-4 py-2 bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600/20 rounded-full text-sm font-bold transition-colors"
          >
            Reset Database
          </button>
          <button 
            onClick={() => setIsAddingVideo(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-bold transition-colors"
          >
            Create Video
          </button>
        </div>
      </div>

      <div className="flex gap-8 mb-8 border-b border-zinc-800">
        <button 
          onClick={() => setActiveTab('content')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'content' ? 'border-white text-white' : 'border-transparent text-zinc-400'}`}
        >
          Videos
        </button>
        <button 
          onClick={() => setActiveTab('customize')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'customize' ? 'border-white text-white' : 'border-transparent text-zinc-400'}`}
        >
          Customization
        </button>
      </div>

      {activeTab === 'content' ? (
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#0f0f0f]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-xs uppercase text-zinc-500 tracking-wider">
                <th className="px-6 py-4 font-bold">Video</th>
                <th className="px-6 py-4 font-bold">Stats</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {videos.map(v => (
                <tr key={v.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={v.thumbnail} className="w-28 h-16 object-cover rounded bg-zinc-800" alt="" />
                      <div className="min-w-0">
                        <p className="text-sm font-bold line-clamp-1">{v.title}</p>
                        <p className="text-xs text-zinc-500 mt-1">{v.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm space-y-0.5">
                      <p className="font-medium">{v.views.toLocaleString()} <span className="text-zinc-500 font-normal">views</span></p>
                      <p className="font-medium">{v.likes.toLocaleString()} <span className="text-zinc-500 font-normal">likes</span></p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {v.uploadDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => setEditingVideo(v)}
                        className="p-2 hover:bg-zinc-700 rounded-full text-zinc-300 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(v.id)}
                        className="p-2 hover:bg-zinc-700 rounded-full text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {videos.length === 0 && (
            <div className="p-10 text-center text-zinc-500">No content found. Start uploading!</div>
          )}
        </div>
      ) : (
        <form onSubmit={handleChannelSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10 bg-[#121212] p-10 rounded-2xl border border-zinc-800">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Brand Name</label>
                <input 
                  type="text" 
                  value={channelForm.name} 
                  onChange={e => setChannelForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-[#1e1e1e] border border-zinc-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Handle (@name)</label>
                <input 
                  type="text" 
                  value={channelForm.handle} 
                  onChange={e => setChannelForm(prev => ({ ...prev, handle: e.target.value }))}
                  className="w-full bg-[#1e1e1e] border border-zinc-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Subscriber Count (Boost)</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="number" 
                  value={channelForm.subscribers} 
                  onChange={e => setChannelForm(prev => ({ ...prev, subscribers: parseInt(e.target.value) || 0 }))}
                  className="flex-1 bg-[#1e1e1e] border border-zinc-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 font-bold text-lg"
                />
                <div className="text-sm text-zinc-500 italic">Boost your visibility instantly</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Channel Description</label>
              <textarea 
                rows={5}
                value={channelForm.description} 
                onChange={e => setChannelForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-[#1e1e1e] border border-zinc-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 font-medium leading-relaxed"
              />
            </div>
            
            <div className="pt-4 border-t border-zinc-800">
              <button type="submit" className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-transform hover:scale-105">
                Publish Brand Updates
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wide">Profile Picture</label>
              <div className="flex flex-col items-center gap-4 bg-[#1e1e1e] p-6 rounded-2xl border border-zinc-700">
                <img src={channelForm.avatar} className="w-32 h-32 rounded-full object-cover border-4 border-[#121212] shadow-xl" alt="" />
                <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                  Change Photo
                  <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'avatar')} className="hidden" />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wide">Banner Image</label>
              <div className="space-y-4 bg-[#1e1e1e] p-4 rounded-2xl border border-zinc-700">
                <img src={channelForm.banner} className="w-full aspect-[4/1] rounded-lg object-cover border border-[#121212]" alt="" />
                <label className="cursor-pointer block text-center bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                  Upload Banner
                  <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'banner')} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </form>
      )}

      {(isAddingVideo || editingVideo) && (
        <VideoForm 
          video={editingVideo} 
          onClose={() => {
            setIsAddingVideo(false);
            setEditingVideo(null);
          }}
          onSave={() => {
            setIsAddingVideo(false);
            setEditingVideo(null);
            onVideosUpdate();
          }}
          channelAvatar={channel.avatar}
          channelName={channel.name}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
