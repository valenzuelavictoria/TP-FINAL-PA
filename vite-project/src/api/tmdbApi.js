const API_KEY = '244ccba92514ded98ba522ce4aa74ed2'; // Tu clave API
const BASE_URL = 'https://api.themoviedb.org/3';

// Obtener las películas populares o realizar búsqueda si hay un término
export const fetchMovies = async (page = 1, searchTerm = '') => {
  let url;
  if (searchTerm) {
    // Buscar películas con el término
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=es-ES&page=${page}`;
  } else {
    // Obtener películas populares
    url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener las películas.');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error en fetchMovies:', error);
    return [];
  }
};

// Obtener los detalles de una película por ID
export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`
    );
    if (!response.ok) throw new Error('Error al obtener los detalles.');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en fetchMovieDetails:', error);
    return null;
  }
};

// Obtener el trailer de una película por ID
export const fetchMovieTrailer = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`
    );
    if (!response.ok) throw new Error('Error al obtener el tráiler.');
    const data = await response.json();
    return data.results.length > 0 ? data.results[0] : null;
  } catch (error) {
    console.error('Error en fetchMovieTrailer:', error);
    return null;
  }
};

// //Función para obtener las categorías
// export const fetchCategories = async () => {
//   const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`);
//   const data = await response.json();
//   return data.genres; // Regresa la lista de categorías
// };
