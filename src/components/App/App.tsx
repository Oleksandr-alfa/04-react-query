import css from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import type { Movie } from '../../types/movie';
import MovieModal from '../MovieModal/MovieModal';
import  { Toaster } from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { useQuery,  keepPreviousData} from '@tanstack/react-query';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [topic, setTopic] = useState("");
  const [currentPage, setPage]=useState(1)
  
  const { data, isLoading, isError, isSuccess } = useQuery({
  queryKey: ['movies', topic, currentPage], 
    queryFn: () => fetchMovies(topic!, currentPage),  
    enabled: topic !== '',
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
});

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
      {isSuccess && data.results.length > 0 && totalPages > 1 &&
        (<><Pagination currentPage={currentPage} totalPages={totalPages} setPage={setPage} />
          <MovieGrid movies={data.results} onSelect={handleSelectMovie} />
          </>)
      }
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      {isError && <ErrorMessage />}
    </div>
  }
