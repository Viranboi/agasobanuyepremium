export async function getTrendingMovies() {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_TOKEN}`);
    const data = await res.json();
    return data.results;
  }
  