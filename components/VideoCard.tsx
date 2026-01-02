
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  compact?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, compact = false }) => {
  if (compact) {
    return (
      <Link to={`/watch/${video.id}`} className="flex gap-2 group">
        <div className="relative flex-none w-40 h-24 rounded-lg overflow-hidden bg-zinc-800">
          <img src={video.thumbnail} className="w-full h-full object-cover" alt={video.title} />
          <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded font-bold">{video.duration}</span>
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">{video.title}</h3>
          <p className="text-xs text-zinc-400">{video.channelName}</p>
          <p className="text-xs text-zinc-400">{video.views.toLocaleString()} views • {video.uploadDate}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/watch/${video.id}`} className="flex flex-col gap-3 group">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800 transition-transform group-hover:scale-[1.02] duration-200">
        <img src={video.thumbnail} className="w-full h-full object-cover" alt={video.title} />
        <span className="absolute bottom-2 right-2 bg-black/90 text-xs px-1.5 py-0.5 rounded font-bold tracking-tight">
          {video.duration}
        </span>
      </div>
      <div className="flex gap-3 px-1">
        <div className="flex-none w-9 h-9 rounded-full overflow-hidden bg-zinc-800">
          <img src={video.channelAvatar} className="w-full h-full object-cover" alt="Avatar" />
        </div>
        <div className="flex flex-col gap-0.5 overflow-hidden">
          <h3 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-zinc-300 transition-colors">
            {video.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 hover:text-white transition-colors">{video.channelName}</p>
          <p className="text-xs text-zinc-400">
            {video.views.toLocaleString()} views • {video.uploadDate}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
