
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string; // Base64
  videoUrl: string; // Base64 or Blob URL
  duration: string;
  views: number;
  likes: number;
  commentsCount: number;
  uploadDate: string;
  channelName: string;
  channelAvatar: string;
}

export interface Channel {
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  subscribers: number;
  description: string;
}

export interface SiteSettings {
  isAdmin: boolean;
  theme: 'dark' | 'light';
}

export interface AppState {
  videos: Video[];
  channel: Channel;
  settings: SiteSettings;
}
