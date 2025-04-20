import { getNameFromShow, getSlug } from '@/lib/utils';
import type {
  CategorizedShows,
  KeyWordResponse,
  MediaType,
  Show,
  ShowWithGenreAndVideo,
} from '@/types';
import { type AxiosResponse } from 'axios';
import BaseService from '../BaseService/BaseService';
import {
  RequestType,
  type ShowRequest,
  type TmdbPagingResponse,
  type TmdbRequest,
} from '@/enums/request-type';
import { Genre } from '@/enums/genre';
import { cache } from 'react';
import customMovies from '@/data/customMovies'; // Import custom movies

const API_KEY = '02c115f6b23a53e0516da3fd56d4072a'; // Your API key
const baseUrl = 'https://api.themoviedb.org/3';

const requestTypesNeedUpdateMediaType = [
  RequestType.TOP_RATED,
  RequestType.NETFLIX,
  RequestType.POPULAR,
  RequestType.GENRE,
  RequestType.KOREAN,
];

class MovieService extends BaseService {
  static async findCurrentMovie(id: number, pathname: string): Promise<Show> {
    const data = await Promise.allSettled([
      this.findMovie(id),
      this.findTvSeries(id),
    ]);
    const response = data
      .filter(this.isFulfilled)
      .map(
        (item: PromiseFulfilledResult<AxiosResponse<Show>>) => item.value?.data,
      )
      .filter((item: Show) => {
        return pathname.includes(getSlug(item.id, getNameFromShow(item)));
      });
    if (!response?.length) {
      return Promise.reject('not found');
    }
    return Promise.resolve<Show>(response[0]);
  }

  static findMovie = cache(async (id: number) => {
    return this.axios(baseUrl).get<Show>(`/movie/${id}?api_key=${API_KEY}`);
  });

  static findTvSeries = cache(async (id: number) => {
    return this.axios(baseUrl).get<Show>(`/tv/${id}?api_key=${API_KEY}`);
  });

  static async getKeywords(
    id: number,
    type: 'tv' | 'movie',
  ): Promise<AxiosResponse<KeyWordResponse>> {
    return this.axios(baseUrl).get<KeyWordResponse>(`/${type}/${id}/keywords?api_key=${API_KEY}`);
  }

  static findMovieByIdAndType = cache(async (id: number, type: string) => {
    const params: Record<string, string> = {
      language: 'en-US',
      append_to_response: 'videos',
    };
    const response: AxiosResponse<ShowWithGenreAndVideo> = await this.axios(
      baseUrl,
    ).get<ShowWithGenreAndVideo>(`/${type}/${id}?api_key=${API_KEY}`, { params });
    return Promise.resolve(response.data);
  });

  static urlBuilder(req: TmdbRequest) {
    const params = `api_key=${API_KEY}&language=en-US&page=${req.page ?? 1}&with_original_language=en`;

    switch (req.requestType) {
      case RequestType.TRENDING:
        return `/trending/${req.mediaType}/day?${params}`;
      case RequestType.TOP_RATED:
        return `/${req.mediaType}/top_rated?${params}`;
      case RequestType.NETFLIX:
        return `/discover/${req.mediaType}?with_networks=213&${params}`;
      case RequestType.POPULAR:
        return `/${req.mediaType}/popular?${params}&without_genres=${Genre.TALK},${Genre.NEWS}`;
      case RequestType.GENRE:
        return `/discover/${req.mediaType}?with_genres=${req.genre}&${params}&without_genres=${Genre.TALK},${Genre.NEWS}`;
      case RequestType.KOREAN:
        return `/discover/${req.mediaType}?with_genres=${req.genre}&with_original_language=ko&${params}`;
      default:
        throw new Error(`request type ${req.requestType} is not implemented yet`);
    }
  }

  static executeRequest(req: {
    requestType: RequestType;
    mediaType: MediaType;
    page?: number;
  }) {
    return this.axios(baseUrl).get<TmdbPagingResponse>(this.urlBuilder(req));
  }

  static getShows = cache(async (requests: ShowRequest[]) => {
    const shows: CategorizedShows[] = [];
    const promises = requests.map((m) => this.executeRequest(m.req));
    const responses = await Promise.allSettled(promises);
    for (let i = 0; i < requests.length; i++) {
      const res = responses[i];
      if (this.isRejected(res)) {
        console.warn(`Failed to fetch shows ${requests[i].title}`, res.reason);
        shows.push({
          title: requests[i].title,
          shows: [],
          visible: requests[i].visible,
        });
      } else if (this.isFulfilled(res)) {
        if (
          requestTypesNeedUpdateMediaType.indexOf(requests[i].req.requestType) >
          -1
        ) {
          res.value.data.results.forEach(
            (f) => (f.media_type = requests[i].req.mediaType),
          );
        }
        shows.push({
          title: requests[i].title,
          shows: res.value.data.results,
          visible: requests[i].visible,
        });
      } else {
        throw new Error('unexpected response');
      }
    }
    return shows;
  });

  static searchMovies = cache(async (query: string, page?: number) => {
    const { data } = await this.axios(baseUrl).get<TmdbPagingResponse>(
      `/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=${page ?? 1}&api_key=${API_KEY}`,
    );

    // Include custom movies in search results
    const queryLower = query.toLowerCase();
    const matchedCustom = customMovies.filter((movie) =>
      movie.title.toLowerCase().includes(queryLower)
    );

    // Add custom movies first, ensuring that thumbnail_url is correctly included
    matchedCustom.forEach((movie) => {
      // Ensure thumbnail_url is added if not already part of the custom movie data
      if (!movie.thumbnail_url) {
        movie.thumbnail_url = movie.poster_path; // Fallback to poster_path if no thumbnail
      }
    });

    data.results = [...matchedCustom, ...data.results]; // Adding custom movies first
    data.results.sort((a, b) => b.popularity - a.popularity); // Sorting by popularity

    return data;
  });
}

export default MovieService;
