import axios from 'axios';

import type { Movie } from '../types/movie';
const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MovieHttpResponse {
  results: Movie[];
  total_pages: number;
}


export const fetchMovies = async (topic: string, page: number): Promise<MovieHttpResponse> => {
 
  const response = await axios.get<MovieHttpResponse>(
    `https://api.themoviedb.org/3/search/movie?`,
    {
      params:
      {
        query: topic,
        page,
      },
      headers: { Authorization: `Bearer ${myKey}` },
    });
  return response.data;
};