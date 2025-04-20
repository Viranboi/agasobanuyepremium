// src/data/customMovies.ts
import { Show } from '@/types';

const customMovies: Show[] = [
  {
    id: 9999999,
    title: 'Rocky kimomo',
    overview: 'This is a custom movie added manually.',
    poster_path: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Central_cee-5.jpg/512px-Central_cee-5.jpg', // Existing image link
    backdrop_path: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Central_cee-5.jpg/512px-Central_cee-5.jpg', // Existing backdrop image link
    thumbnail_url: '/home/threy___the1/myflix/cinegeek-beta-main/public/images/my-movie-bg.jpg', // New thumbnail image link
    video_url: 'https://www.youtube.com/embed/lE4jPjDH-aM?si=kb5LMTj3XaxMQyQb', // New video link
    media_type: 'movie',
    vote_average: 9.5,
    release_date: '2025-01-01',
    genre_ids: [28, 18], // Action, Drama
    original_language: 'en',
    popularity: 5000,
  },
];

export default customMovies;
