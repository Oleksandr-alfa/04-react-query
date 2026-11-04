import css from './App.module.css';

import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState, useEffect } from 'react';
import type { Movie } from '../../types/movie';
import MovieModal from '../MovieModal/MovieModal';
import  toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
const ReactPaginate = (
  ReactPaginateModule as unknown as
  ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

type ModuleWithDefault<T> = { default: T };

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1)
  
  


  
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', topic, page],
    queryFn: () => fetchMovies(topic!, page),
    enabled: topic !== '',
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (isSuccess && data?.results?.length === 0) {
      toast.error('No movies found for your request.');
    }
  }
  )
  const totalPages = data?.total_pages ?? 0;
  
  const handleOrder = async (topic: string) => {
    setTopic(topic);
    setPage(1);
  }
    const handleSelectMovie = (movie: Movie) => {
      setSelectedMovie(movie);
      setIsModalOpen(true);
    }
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedMovie(null);
    }
   
    return <div className={css.app}>
      <Toaster/>
      <SearchBar onSubmit={ handleOrder } />
      {isLoading && <Loader />}
    {totalPages > 1 && <ReactPaginate
        pageCount={totalPages}
pageRangeDisplayed={5}
marginPagesDisplayed={1}
onPageChange={({ selected }) => setPage(selected + 1)}
forcePage={page - 1}
containerClassName={css.pagination}
activeClassName={css.active}
nextLabel="→"
previousLabel="←"
/>
    }
      {isSuccess && data.results.length > 0 && <MovieGrid movies={data.results} onSelect={handleSelectMovie} />}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      {isError && <ErrorMessage />}
    </div>
  }
