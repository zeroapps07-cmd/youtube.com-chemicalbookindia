
import React from 'react';
import VideoCard from './VideoCard';
import { Video } from '../types';

interface HomeProps {
  videos: Video[];
}

const Home: React.FC<HomeProps> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-10 gap-x-4">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
      {videos.length === 0 && (
        <div className="col-span-full py-20 text-center text-zinc-500">
          No videos available. Sign in as Admin to upload.
        </div>
      )}
    </div>
  );
};

export default Home;
