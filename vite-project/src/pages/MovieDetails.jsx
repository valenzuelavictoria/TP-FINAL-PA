import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieTrailer } from '../api/tmdbApi';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(id);
        const trailerData = await fetchMovieTrailer(id);
        setMovie(movieData);
        setTrailer(trailerData?.key);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="movie-details-container">
      {movie && (
        <>
          {/* Poster a la izquierda */}
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          {/* Información a la derecha */}
          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-details-text">
              <p>Fecha de lanzamiento: {movie.release_date}</p>
              <p>Valoración: {movie.vote_average} / 10</p>
              <p>{movie.overview}</p>
            </div>
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer}`}
                target="_blank"
                rel="noopener noreferrer"
                className="trailer-button"
              >
                Ver trailer
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;


