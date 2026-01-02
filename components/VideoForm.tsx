
import React, { useState, useEffect } from 'react';
import { Video } from '../types';
import { saveVideo } from '../db';

interface VideoFormProps {
  video: Video | null;
  onClose: () => void;
  onSave: () => void;
  channelName: string;
  channelAvatar: string;
}

const VideoForm: React.FC<VideoFormProps> = ({ video, onClose, onSave, channelName, channelAvatar }) => {
  const [formData, setFormData] = useState<Partial<Video>>({
    id: video?.id || Math.random().toString(36).substr(2, 9),
    title: video?.title || '',
    description: video?.description || '',
    thumbnail: video?.thumbnail || '',
    videoUrl: video?.videoUrl || '',
    duration: video?.duration || '00:00',
    views: video?.views || 0,
    likes: video?.likes || 0,
    commentsCount: video?.commentsCount || 0,
    uploadDate: video?.uploadDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    channelName: channelName,
    channelAvatar: channelAvatar
  });

  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'thumbnail' | 'videoUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (field === 'videoUrl') {
      setUploading(true);
      // Create temporary video element to get duration
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.onloadedmetadata = () => {
        const minutes = Math.floor(v.duration / 60);
        const seconds = Math.floor(v.duration % 60);
        setFormData(prev => ({ ...prev, duration: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` }));
      };
      v.src = URL.createObjectURL(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, videoUrl: event.target!.result as string }));
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, thumbnail: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.thumbnail) {
      alert('Title and Thumbnail are required!');
      return;
    }
    await saveVideo(formData as Video);
    onSave();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-bold">{video ? 'Edit Video' : 'Upload New Video'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Title</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500"
                  placeholder="Catchy video title"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Description</label>
                <textarea 
                  rows={6}
                  value={formData.description} 
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500"
                  placeholder="Tell viewers about your video"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-2">Manual Views</label>
                  <input 
                    type="number" 
                    value={formData.views} 
                    onChange={e => setFormData(prev => ({ ...prev, views: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-2">Manual Likes</label>
                  <input 
                    type="number" 
                    value={formData.likes} 
                    onChange={e => setFormData(prev => ({ ...prev, likes: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
               <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Thumbnail (JPG/PNG)</label>
                <div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 relative group">
                  {formData.thumbnail ? (
                    <img src={formData.thumbnail} className="w-full h-full object-cover" alt="Thumb" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 text-xs gap-2">
                       <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                       <span>Click to upload thumbnail</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => handleFileChange(e, 'thumbnail')}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2">Video File (MP4)</label>
                <div className="bg-zinc-800 rounded-xl p-6 border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center text-center gap-2 relative">
                  {uploading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm">Processing Video...</span>
                    </div>
                  ) : formData.videoUrl ? (
                    <div className="text-green-400 flex items-center gap-2">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                       <span className="text-sm font-bold">Video Ready ({formData.duration})</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-10 h-10 opacity-30" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6V7h-2v6H5v2h6v6h2v-6h6z"/></svg>
                      <span className="text-xs text-zinc-500">Maximum quality supported</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="video/mp4" 
                    onChange={e => handleFileChange(e, 'videoUrl')}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button 
                  disabled={uploading}
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {video ? 'Save Changes' : 'Publish Video'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoForm;
