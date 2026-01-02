
import { Channel, Video } from './types';

export const BRAND_COLOR = '#ff0000';
export const ADMIN_EMAIL = 'kumarashiq4@gmail.com';
export const ADMIN_PASSWORD = 'youarefool123';

export const INITIAL_CHANNEL: Channel = {
  name: 'Chemicalbook India',
  handle: '@chemicalbookindia',
  avatar: 'https://picsum.photos/id/1/200/200',
  banner: 'https://picsum.photos/id/10/1600/400',
  subscribers: 15400,
  description: 'Official channel of Chemicalbook India. Leading chemical solutions and industry insights.',
};

export const INITIAL_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Introduction to Chemicalbook India Services',
    description: 'Welcome to our official platform. Learn about our core services and values.',
    thumbnail: 'https://picsum.photos/id/20/1280/720',
    videoUrl: '', // Will be empty in demo until uploaded
    duration: '05:20',
    views: 12500,
    likes: 850,
    commentsCount: 45,
    uploadDate: '2 days ago',
    channelName: 'Chemicalbook India',
    channelAvatar: 'https://picsum.photos/id/1/200/200',
  },
  {
    id: '2',
    title: 'Modern Laboratory Techniques 2024',
    description: 'Deep dive into the latest laboratory safety and efficiency standards.',
    thumbnail: 'https://picsum.photos/id/21/1280/720',
    videoUrl: '',
    duration: '12:45',
    views: 8900,
    likes: 320,
    commentsCount: 12,
    uploadDate: '1 week ago',
    channelName: 'Chemicalbook India',
    channelAvatar: 'https://picsum.photos/id/1/200/200',
  }
];
