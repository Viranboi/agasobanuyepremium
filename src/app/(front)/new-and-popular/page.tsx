import Hero from '@/components/hero';
import ShowsContainer from '@/components/shows-container';
import { siteConfig } from '@/configs/site';
import { RequestType, type ShowRequest } from '@/enums/request-type';
import MovieService from '@/services/MovieService';
import { MediaType } from '@/types';
import customMovies from '@/data/customMovies'; // Import custom movie data

export const revalidate = 3600;

export default async function NewAndPopularPage() {
  const h1 = `${siteConfig.name} New And Popular`;
  
  const requests: ShowRequest[] = [
    {
      title: 'Netflix',
      req: { requestType: RequestType.NETFLIX, mediaType: MediaType.TV },
      visible: false,
    },
    {
      title: 'Trending TV Shows',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Trending Movies',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.MOVIE },
      visible: true,
    },
    {
      title: 'Top Rated TV Shows',
      req: { requestType: RequestType.TOP_RATED, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Top Rated Movies',
      req: { requestType: RequestType.TOP_RATED, mediaType: MediaType.MOVIE },
      visible: true,
    },
  ];

  // Fetch shows from MovieService
  const allShows = await MovieService.getShows(requests);

  // Add custom movie to the first show list (Trending Movies)
  allShows[2].shows = [...allShows[2].shows, ...customMovies];

  return (
    <>
      <h1 className="hidden">{h1}</h1>
      <Hero shows={allShows[0].shows} />
      <ShowsContainer shows={allShows} />
    </>
  );
}
