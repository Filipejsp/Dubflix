// Configuração da API TMDB
const TMDB_API_KEY = '5e42a72e0045c4eac98cdf4e08d9b908'; // Chave de API do usuário
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Função para buscar filmes do TMDB
async function fetchMoviesFromTMDB(category, page = 1) {
  try {
    let endpoint;
    
    switch(category) {
      case 'lancamentos':
        endpoint = '/movie/now_playing';
        break;
      case 'acao':
        endpoint = '/discover/movie?with_genres=28';
        break;
      case 'comedia':
        endpoint = '/discover/movie?with_genres=35';
        break;
      case 'drama':
        endpoint = '/discover/movie?with_genres=18';
        break;
      case 'series':
        endpoint = '/tv/popular';
        break;
      case 'animacoes':
        endpoint = '/discover/movie?with_genres=16';
        break;
      default:
        endpoint = '/movie/popular';
    }
    
    // Corrigir URL para evitar ? duplicado
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${TMDB_BASE_URL}${endpoint}${separator}api_key=${TMDB_API_KEY}&language=pt-BR&page=${page}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Erro ao buscar filmes do TMDB:', error);
    // Retornar dados mockados como fallback
    return getMockMoviesForCategory(category);
  }
}

// Função para converter dados do TMDB para formato do DubFlix
function convertTMDBToDubFlix(tmdbMovies, category) {
  return tmdbMovies.map((movie, index) => {
    const isTV = category === 'series';
    const movieId = movie.id;
    const hlsOverrideUrl = window.HLS_OVERRIDES ? window.HLS_OVERRIDES[movieId] : null;
    
    return {
      id: movieId,
      titulo: isTV ? movie.name : movie.title,
      ano: new Date(isTV ? movie.first_air_date : movie.release_date).getFullYear(),
      duracao: isTV ? `${movie.number_of_seasons} temporadas` : `${movie.runtime || 120} min`,
      categoria: getCategoryName(category),
      poster: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGRpc3BvbsOtdmVsPC90ZXh0Pjwvc3ZnPg==',
      sinopse: movie.overview || 'Sinopse não disponível.',
      videoUrl: hlsOverrideUrl || null,
      videoType: hlsOverrideUrl ? 'hls' : null,
      favorito: false,
      tmdb_id: movieId,
      rating: movie.vote_average,
      backdrop: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : null,
      hasVideo: !!hlsOverrideUrl
    };
  });
}

// Função para obter nome da categoria
function getCategoryName(category) {
  const categories = {
    'lancamentos': 'Lançamentos',
    'acao': 'Ação',
    'comedia': 'Comédia',
    'drama': 'Drama',
    'series': 'Séries',
    'animacoes': 'Animações'
  };
  return categories[category] || 'Geral';
}

// Função para obter dados mockados como fallback
function getMockMoviesForCategory(category) {
  if (window.mockMovies && window.mockMovies[category]) {
    return window.mockMovies[category];
  }
  return [];
}

// Função para buscar detalhes completos de um filme
async function fetchMovieDetails(movieId, isTV = false) {
  try {
    const endpoint = isTV ? `/tv/${movieId}` : `/movie/${movieId}`;
    const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=pt-BR&append_to_response=credits,videos`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const hlsOverrideUrl = window.HLS_OVERRIDES ? window.HLS_OVERRIDES[data.id] : null;
    
    return {
      id: data.id,
      titulo: isTV ? data.name : data.title,
      ano: new Date(isTV ? data.first_air_date : data.release_date).getFullYear(),
      duracao: isTV ? `${data.number_of_seasons} temporadas` : `${data.runtime || 120} min`,
      categoria: isTV ? 'Séries' : 'Filme',
      poster: data.poster_path ? `${TMDB_IMAGE_BASE_URL}${data.poster_path}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGRpc3BvbsOtdmVsPC90ZXh0Pjwvc3ZnPg==',
      sinopse: data.overview || 'Sinopse não disponível.',
      videoUrl: hlsOverrideUrl || null,
      videoType: hlsOverrideUrl ? 'hls' : null,
      favorito: false,
      tmdb_id: data.id,
      rating: data.vote_average,
      backdrop: data.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${data.backdrop_path}` : null,
      generos: data.genres ? data.genres.map(g => g.name).join(', ') : '',
      diretor: data.credits?.crew?.find(c => c.job === 'Director')?.name || 'N/A',
      elenco: data.credits?.cast?.slice(0, 5).map(a => a.name).join(', ') || 'N/A',
      hasVideo: !!hlsOverrideUrl
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    return null;
  }
}

// Função para buscar filmes por termo
async function searchMovies(query) {
  try {
    const url = `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.results
      .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
      .map(item => {
        const hlsOverrideUrl = window.HLS_OVERRIDES ? window.HLS_OVERRIDES[item.id] : null;
        
        return {
          id: item.id,
          titulo: item.media_type === 'tv' ? item.name : item.title,
          ano: new Date(item.media_type === 'tv' ? item.first_air_date : item.release_date).getFullYear(),
          duracao: item.media_type === 'tv' ? 'Série' : 'Filme',
          categoria: item.media_type === 'tv' ? 'Séries' : 'Filme',
          poster: item.poster_path ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGRpc3BvbsOtdmVsPC90ZXh0Pjwvc3ZnPg==',
          sinopse: item.overview || 'Sinopse não disponível.',
          videoUrl: hlsOverrideUrl || null,
          videoType: hlsOverrideUrl ? 'hls' : null,
          favorito: false,
          tmdb_id: item.id,
          rating: item.vote_average,
          media_type: item.media_type,
          hasVideo: !!hlsOverrideUrl
        };
      });
  } catch (error) {
    console.error('Erro na busca:', error);
    return [];
  }
}

// Função para carregar todas as categorias
async function loadAllCategories() {
  const categories = ['lancamentos', 'acao', 'comedia', 'drama', 'series', 'animacoes'];
  const allMovies = {};
  
  for (const category of categories) {
    try {
      const tmdbMovies = await fetchMoviesFromTMDB(category, 1);
      allMovies[category] = convertTMDBToDubFlix(tmdbMovies, category);
    } catch (error) {
      console.error(`Erro ao carregar categoria ${category}:`, error);
      allMovies[category] = [];
    }
  }
  
  return allMovies;
}

// Função para adicionar HLS URL para um filme
function addHLSForMovie(tmdbId, hlsUrl) {
  if (!window.HLS_CONFIG) {
    window.HLS_CONFIG = {};
  }
  window.HLS_CONFIG[tmdbId] = {
    url: hlsUrl,
    type: 'hls'
  };
  console.log(`HLS URL adicionada para filme ${tmdbId}: ${hlsUrl}`);
}

// Função para remover HLS URL de um filme
function removeHLSForMovie(tmdbId) {
  if (window.HLS_CONFIG && window.HLS_CONFIG[tmdbId]) {
    delete window.HLS_CONFIG[tmdbId];
    console.log(`HLS URL removida para filme ${tmdbId}`);
  }
}

// Função para listar todos os filmes com HLS configurado
function listHLSMovies() {
  if (!window.HLS_CONFIG) {
    console.log('Nenhum filme com HLS configurado');
    return [];
  }
  
  const hlsMovies = Object.keys(window.HLS_CONFIG).map(id => ({
    tmdb_id: id,
    hls_url: window.HLS_CONFIG[id].url
  }));
  
  console.log('Filmes com HLS configurado:', hlsMovies);
  return hlsMovies;
}

// Expor funções globalmente
window.fetchMoviesFromTMDB = fetchMoviesFromTMDB;
window.convertTMDBToDubFlix = convertTMDBToDubFlix;
window.getCategoryName = getCategoryName;
window.getMockMoviesForCategory = getMockMoviesForCategory;
window.fetchMovieDetails = fetchMovieDetails;
window.searchMovies = searchMovies;
window.loadAllCategories = loadAllCategories;
window.addHLSForMovie = addHLSForMovie;
window.removeHLSForMovie = removeHLSForMovie;
window.listHLSMovies = listHLSMovies; 