import axios from 'axios';

import type { Movie } from '../types/movie';
const myKey = import.meta.env.VITE_TMDB_TOKEN;
interface MovieHttpResponse {
  results: Movie[];
}


export const fetchMovies = async (topic: string): Promise<Movie[]> => {
  // if (topic === '')
  //   return null;
    const response = await axios.get<MovieHttpResponse>(
  `https://api.themoviedb.org/3/search/movie?`,
     {
   params:
         {query: topic,
      page: 1,},
      headers: {Authorization: `Bearer ${myKey}`},
        });
    return response.data.results;
}