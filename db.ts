
import { Video, Channel } from './types';

const DB_NAME = 'ChemicalbookIndiaDB';
const DB_VERSION = 1;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('videos')) {
        db.createObjectStore('videos', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('channel')) {
        db.createObjectStore('channel', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveVideo = async (video: Video) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('videos', 'readwrite');
    const store = transaction.objectStore('videos');
    const request = store.put(video);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};

export const getVideos = async (): Promise<Video[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('videos', 'readonly');
    const store = transaction.objectStore('videos');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteVideo = async (id: string) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('videos', 'readwrite');
    const store = transaction.objectStore('videos');
    const request = store.delete(id);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};

export const saveChannel = async (channel: Channel) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('channel', 'readwrite');
    const store = transaction.objectStore('channel');
    const request = store.put({ ...channel, id: 'primary' });
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};

export const getChannel = async (): Promise<Channel | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('channel', 'readonly');
    const store = transaction.objectStore('channel');
    const request = store.get('primary');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const resetDB = async () => {
  const db = await initDB();
  const txVideos = db.transaction('videos', 'readwrite');
  txVideos.objectStore('videos').clear();
  const txChannel = db.transaction('channel', 'readwrite');
  txChannel.objectStore('channel').clear();
};
