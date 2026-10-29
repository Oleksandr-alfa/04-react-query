import styles from './App.module.css';
// import axios from "axios";
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import type { Movie } from '../../types/movie';
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';



export default function App() {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  
  const handleOrder = async (topic: string) => {
    setIsError(false);
    setIsLoader(true);
    setMovies([]);
    try {
      
      const movies = await fetchMovies(topic);
      if (movies.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
   
      setMovies(movies);
    }
    catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  }
    const handleSelectMovie = (movie: Movie) => {
    
      setSelectedMovie(movie);
      setIsModalOpen(true);
      
    }
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedMovie(null);
    }
   
    return <div className={styles.app}>
      <Toaster/>
      <SearchBar onSubmit={ handleOrder } />
      {isLoader && <Loader/>}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={handleSelectMovie} />}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
{isError && <ErrorMessage/>}
  
    </div>
  }
