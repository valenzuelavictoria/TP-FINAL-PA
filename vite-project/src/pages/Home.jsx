import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/tmdbApi';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const loadMovies = async () => {
    setLoading(true);
    try {
      // Obtener películas usando el término de búsqueda si existe
      const moviesData = await fetchMovies(page, searchTerm);
      setMovies(moviesData);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1);  // Resetear a la primera página cuando se busque algo
    loadMovies();
  };

  useEffect(() => {
    loadMovies();
  }, [page, searchTerm]);

  return (
    <div className="app-container">
      <h1 className="title">Mi app de películas</h1>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar pelicula..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <>
          <div className="movie-grid">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-poster"
                    />
                    <h3>{movie.title}</h3>
                  </Link>
                </div>
              ))
            ) : (
              <p>No movies found</p>
            )}
          </div>

          {/* Paginación */}
          <div className="pagination-buttons">
            <button
              className="pagination-button"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Anterior
            </button>
            <button
              className="pagination-button"
              onClick={handleNextPage}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
