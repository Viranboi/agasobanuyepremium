import Head from 'next/head';
import Hero from '@/components/hero';
import ShowsContainer from '@/components/shows-container';
import { MediaType } from '@/types';
import { siteConfig } from '@/configs/site';
import { RequestType, type ShowRequest } from '@/enums/request-type';
import MovieService from '@/services/MovieService';
import { Genre } from '@/enums/genre';

export const revalidate = 3600;

export default async function Home() {
  const h1 = `${siteConfig.name} Home`;
  const requests: ShowRequest[] = [
    {
      title: 'Trending Now',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.ALL },
      visible: true,
    },
    {
      title: 'Netflix TV Shows',
      req: { requestType: RequestType.NETFLIX, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Popular TV Shows',
      req: {
        requestType: RequestType.TOP_RATED,
        mediaType: MediaType.TV,
        genre: Genre.TV_MOVIE,
      },
      visible: true,
    },
    {
      title: 'Korean Movies',
      req: {
        requestType: RequestType.KOREAN,
        mediaType: MediaType.MOVIE,
        genre: Genre.THRILLER,
      },
      visible: true,
    },
    {
      title: 'Comedy Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.COMEDY,
      },
      visible: true,
    },
    {
      title: 'Action Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.ACTION,
      },
      visible: true,
    },
    {
      title: 'Romance Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.ROMANCE,
      },
      visible: true,
    },
    {
      title: 'Scary Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.THRILLER,
      },
      visible: true,
    },
  ];
  const allShows = await MovieService.getShows(requests);

  return (
    <>
      <Head>
        <title>Agasobanuye Pro - Rwandan Movies, Hollywood, Drama zasobanuwe</title>
        <meta
          name="description"
          content="Reba film nyarwanda, Hollywood, Korean, na drama zasobanuwe mu Kinyarwanda kuri agasobanuye.pro. Urubuga rukunzwe mu Rwanda."
        />
        <meta
          name="keywords"
          content="agasobanuye, film nyarwanda, movies zasobanuwe, Rwandan movies, kinyarwanda movies"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Agasobanuye Pro - Film Zasobanuwe mu Kinyarwanda" />
        <meta
          property="og:description"
          content="Urubuga rwa mbere mu Rwanda rwerekana film zasobanuwe mu Kinyarwanda - Agasobanuye Pro"
        />
        <meta property="og:url" content="https://agasobanuye.pro" />
        <meta property="og:image" content="https://agasobanuye.pro/thumbnail.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <h1 className="hidden">{h1}</h1>
      <Hero shows={allShows[0].shows} />
      <ShowsContainer shows={allShows} />
    </>
  );
}
