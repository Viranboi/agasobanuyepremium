'use client';

import { useState } from 'react';
import Image from 'next/image';

type Video = {
  title: string;
  thumbnail: string;
  embedUrl: string;
  category: 'Trending Now' | 'New Movies' | 'Iza Rocky' | 'Others';
};

const videos: Video[] = [
  // Add your videos here (same as before)
  {
    title: 'React Tutorial',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Hi_Nanna_poster.jpg',
    embedUrl: 'https://www.youtube.com/embed/dFgzHOX84xQ',
    category: 'Trending Now',
  },
  {
    title: 'Tailwind Crash Course',
    thumbnail: '/js-thumb.jpg',
    embedUrl: 'https://www.youtube.com/embed/dFgzHOX84xQ',
    category: 'Trending Now',
  },
  {
    title: 'React Tutorial',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Hi_Nanna_poster.jpg',
    embedUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
    category: 'Trending Now',
  },
  {
    title: 'React Tutorial',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Hi_Nanna_poster.jpg',
    embedUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
    category: 'Trending Now',
  },
  {
    title: 'Next.js Crash Course',
    thumbnail: '/nextjs-thumb.jpg',
    embedUrl: 'https://www.youtube.com/embed/1WmNXEVia8I',
    category: 'New Movies',
  },
  {
    title: 'Next.js Crash Course',
    thumbnail: '/nextjs-thumb.jpg',
    embedUrl: 'https://www.youtube.com/embed/1WmNXEVia8I',
    category: 'New Movies',
  },
  {
    title: 'Next.js Crash Course',
    thumbnail: '/nextjs-thumb.jpg',
    embedUrl: 'https://www.youtube.com/embed/1WmNXEVia8I',
    category: 'New Movies',
  },
  {
    title: 'Iza Rocky Trailer',
    thumbnail: '/js-thumb.jpg',
    embedUrl: 'https://www.youtube.com/embed/BwuLxPH8IDs',
    category: 'Iza Rocky',
  },
  {
    title: 'Motivational Speech',
    thumbnail: '/ts-thumb.jpg',
    embedUrl: 'https://www.youtube.com/embed/IcjGpR5c5lA',
    category: 'Others',
  },
];

const categories = ['Trending Now', 'New Movies', 'Iza Rocky', 'Others'] as const;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClickThumbnail = (embedUrl: string) => {
    setCurrentVideoUrl(embedUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentVideoUrl('');
  };

  return (
    <main className="p-8 font-sans bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors">
      <h1 className="text-center text-3xl font-bold mb-6">Horror Zisobanuye</h1>

      {/* Search */}
      <div className="text-center mb-8">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-[80%] max-w-md rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
      </div>

      {/* Video Categories */}
      {categories.map((category) => {
        const categoryVideos = filteredVideos.filter((v) => v.category === category);
        if (categoryVideos.length === 0) return null;

        return (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-semibold mb-4">{category}</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {categoryVideos.map((video, index) => (
                <div
                  key={index}
                  className="relative min-w-[150px] cursor-pointer rounded-lg shadow-lg bg-white dark:bg-gray-900 hover:scale-105 hover:shadow-xl transition-transform duration-200"
                  onClick={() => handleClickThumbnail(video.embedUrl)}
                >
                  <div className="relative">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={150}
                      height={90}
                      className="rounded-lg object-cover"
                    />
                    {/* 🎞 Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-60 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-center text-black dark:text-white mt-1 px-1">
                    {video.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Modal */}
      {showModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] max-w-4xl h-[80%] bg-white dark:bg-gray-900 rounded-lg overflow-hidden"
          >
            <iframe
              src={currentVideoUrl}
              title="Video Player"
              width="100%"
              height="100%"
              allowFullScreen
              className="border-0"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 text-xl flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
