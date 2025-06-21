// Sistema local sem Firebase
let currentUser = null;
let currentMovie = null;
let userFavorites = [];

// Verificar autenticação local
if (localStorage.getItem('dubflix_logged_in') !== 'true') {
  window.location.href = "index.html";
} else {
  currentUser = {
    email: localStorage.getItem('dubflix_user_email') || 'usuario@local.com'
  };
  loadUserData();
  loadCustomContent();
  loadCategories();
}

// Carregar dados do usuário (localStorage)
function loadUserData() {
  try {
    const savedFavorites = localStorage.getItem('dubflix_favorites');
    userFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
    userFavorites = [];
  }
}

// Função para obter favoritos
function getFavorites() {
  try {
    const savedFavorites = localStorage.getItem('dubflix_favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    return [];
  }
}

function loadCustomContent() {
  const customMovies = window.MY_MOVIES || [];
  if (customMovies.length > 0) {
    const container = document.getElementById('meus-filmes');
    const section = document.getElementById('my-movies-section');
    
    if (container && section) {
      container.innerHTML = customMovies.map(movie => createMovieCard(movie)).join('');
      section.style.display = 'block';
    }
  }
}

// Carregar categorias
async function loadCategories() {
  try {
    // Mostrar loading
    showLoading();
    
    // Carregar filmes do TMDB
    const allMovies = await loadAllCategories();
    
    // Atualizar variável global
    window.mockMovies = allMovies;
    
    const categories = ['lancamentos', 'acao', 'comedia', 'series', 'animacoes', 'drama'];
    
    categories.forEach(category => {
      const container = document.getElementById(category);
      if (container) {
        const movies = allMovies[category] || [];
        container.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
      }
    });
    
    // Carregar banner principal
    loadMainBanner();
    
    // Esconder loading
    hideLoading();
    
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    showMessage('Erro ao carregar filmes. Tentando dados locais...', true);
    
    // Fallback para dados mockados
    loadFallbackData();
  }
}

// Função para mostrar loading
function showLoading() {
  const categories = ['lancamentos', 'acao', 'comedia', 'series', 'animacoes', 'drama'];
  categories.forEach(category => {
    const container = document.getElementById(category);
    if (container) {
      container.innerHTML = '<div class="loading">Carregando filmes...</div>';
    }
  });
}

// Função para esconder loading
function hideLoading() {
  // Loading será substituído pelos filmes
}

// Função de fallback para dados locais
function loadFallbackData() {
  const categories = ['lancamentos', 'acao', 'comedia', 'series', 'animacoes', 'drama'];
  
  categories.forEach(category => {
    const container = document.getElementById(category);
    if (container) {
      const movies = mockMovies[category] || [];
      container.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
    }
  });
  
  loadMainBanner();
}

// Criar card de filme
function createMovieCard(movie) {
  const isFavorite = userFavorites.includes(movie.id);
  const rating = movie.rating ? movie.rating.toFixed(1) : null;
  const hasVideo = movie.hasVideo || movie.videoUrl;
  
  return `
    <div class="movie-card ${hasVideo ? 'has-video' : 'no-video'}" onclick="showMovieDetails(${movie.id})" tabindex="0">
      <img src="${movie.poster}" alt="${movie.titulo}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGRpc3BvbsOtdmVsPC90ZXh0Pjwvc3ZnPg=='">
      ${rating ? `<div class="movie-rating">⭐ ${rating}</div>` : ''}
      ${movie.videoType === 'hls' ? '<div class="hls-badge">HLS</div>' : ''}
      ${!hasVideo ? '<div class="no-video-badge">Sem Vídeo</div>' : ''}
      <div class="movie-info">
        <h3>${movie.titulo}</h3>
        <p>${movie.ano} • ${movie.duracao}</p>
      </div>
      <div class="favorite-icon ${isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${movie.id})">
        ❤
      </div>
    </div>
  `;
}

// Carregar banner principal
function loadMainBanner() {
  const banner = document.querySelector('.main-banner');
  if (banner && mockMovies.lancamentos && mockMovies.lancamentos.length > 0) {
    const featuredMovie = mockMovies.lancamentos[0];
    banner.innerHTML = `
      <div class="banner-content">
        <h1>${featuredMovie.titulo}</h1>
        <p>${featuredMovie.sinopse}</p>
        <div class="banner-buttons">
          <button class="btn-primary" onclick="playMovie(${featuredMovie.id})">▶ Assistir</button>
          <button class="btn-secondary" onclick="showMovieDetails(${featuredMovie.id})">ℹ Mais Informações</button>
        </div>
      </div>
      <div class="banner-poster">
        <img src="${featuredMovie.poster}" alt="${featuredMovie.titulo}">
      </div>
    `;
  }
}

// Mostrar detalhes do filme
async function showMovieDetails(movieId) {
  const movie = await findMovieById(movieId);
  if (!movie) {
    showMessage('Erro ao carregar detalhes do filme', true);
    return;
  }
  
  currentMovie = movie;
  
  const modal = document.getElementById('movieDetails');
  const poster = document.getElementById('detailPoster');
  const title = document.getElementById('detailTitle');
  const year = document.getElementById('detailYear');
  const duration = document.getElementById('detailDuration');
  const description = document.getElementById('detailDescription');
  const favoriteBtn = document.getElementById('favoriteBtn');
  
  poster.src = movie.poster;
  title.textContent = movie.titulo;
  year.textContent = movie.ano;
  duration.textContent = movie.duracao;
  description.textContent = movie.sinopse;
  
  const isFavorite = userFavorites.includes(movie.id);
  favoriteBtn.textContent = isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos';
  favoriteBtn.className = isFavorite ? 'btn-secondary active' : 'btn-secondary';
  
  // Mostrar ou esconder botão de assistir baseado na disponibilidade do vídeo
  const watchBtn = modal.querySelector('.btn-primary');
  if (watchBtn) {
    const hasVideo = movie.hasVideo || movie.videoUrl;
    if (hasVideo) {
      watchBtn.style.display = 'inline-block';
      watchBtn.textContent = 'Assistir';
      watchBtn.onclick = () => playMovie(movie.id);
    } else {
      watchBtn.style.display = 'none';
    }
  }
  
  modal.style.display = 'flex';
  
  // Focar no modal para navegação
  modal.focus();
}

// Encontrar filme por ID
async function findMovieById(movieId) {
  let movie;
  const movieIdStr = movieId.toString();

  // 1. Procurar nos filmes personalizados (meus-filmes.js)
  const customMovies = window.MY_MOVIES || [];
  movie = customMovies.find(m => m.id.toString() === movieIdStr);
  if (movie) {
    return movie;
  }

  // 2. Procurar nos dados já carregados do TMDB (das categorias na tela inicial)
  for (const category in mockMovies) {
    movie = mockMovies[category].find(m => m.id.toString() === movieIdStr);
    if (movie) {
      return movie;
    }
  }

  // 3. Se não encontrar, buscar na API TMDB como último recurso
  try {
    const numericMovieId = parseInt(movieIdStr, 10);
    if (!isNaN(numericMovieId)) {
      const tmdbMovie = await fetchMovieDetails(numericMovieId);
      if (tmdbMovie) {
        return tmdbMovie;
      }
    }
  } catch (error) {
    console.error(`Erro ao buscar detalhes do filme ${movieIdStr} na API.`, error);
  }
  
  console.error(`Filme com ID ${movieIdStr} não encontrado.`);
  return null;
}

// Alternar favorito
function toggleFavorite(movieId) {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(movieId);
  
  if (isFavorite) {
    favorites = favorites.filter(id => id !== movieId);
  } else {
    favorites.push(movieId);
  }
  
  // Salvar no localStorage
  localStorage.setItem('dubflix_favorites', JSON.stringify(favorites));
  
  // Atualizar interface
  loadCategories();
  
  // Se estiver no modal de detalhes, atualizar botão
  if (currentMovie && currentMovie.id === movieId) {
    const favoriteBtn = document.getElementById('favoriteBtn');
    favoriteBtn.textContent = isFavorite ? 'Adicionar aos Favoritos' : 'Remover dos Favoritos';
    favoriteBtn.className = isFavorite ? 'btn-secondary' : 'btn-secondary active';
  }
  
  showMessage(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
}

// Adicionar ao histórico
function addToHistory(movieId) {
  let historico = JSON.parse(localStorage.getItem('dubflix_historico') || '[]');
  
  // Remover se já existe e adicionar no início
  historico = historico.filter(id => id !== movieId);
  historico.unshift(movieId);
  
  // Manter apenas os últimos 50
  historico = historico.slice(0, 50);
  
  localStorage.setItem('dubflix_historico', JSON.stringify(historico));
}

// Reproduzir filme
async function playMovie(movieId = null) {
  const movie = movieId ? await findMovieById(movieId) : currentMovie;
  if (!movie) {
    showMessage('Erro ao carregar filme', true);
    return;
  }
  
  // Verificar se o filme tem vídeo disponível
  if (!movie.videoUrl || !movie.hasVideo) {
    showMessage('Vídeo não disponível para este filme', true);
    return;
  }
  
  addToHistory(movie.id);
  
  const player = document.getElementById('videoPlayer');
  const video = document.getElementById('videoElement');
  
  // Limpar player anterior
  if (window.hls) {
    window.hls.destroy();
    window.hls = null;
  }
  
  video.src = '';
  
  // Configurar player baseado no tipo de vídeo
  if (movie.videoType === 'hls') {
    // Mostrar botão de qualidade para HLS
    const qualityBtn = document.getElementById('qualityBtn');
    if (qualityBtn) qualityBtn.style.display = 'block';
    
    // Suporte para HLS
    if (Hls.isSupported()) {
      window.hls = new Hls();
      window.hls.loadSource(movie.videoUrl);
      window.hls.attachMedia(video);
      
      window.hls.on(Hls.Events.MANIFEST_PARSED, function() {
        console.log('HLS manifest carregado');
        video.play().catch(e => {
          console.log('Erro ao reproduzir HLS:', e);
        });
      });
      
      window.hls.on(Hls.Events.ERROR, function(event, data) {
        console.error('Erro HLS:', data);
        showMessage('Erro ao carregar stream HLS', true);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Suporte nativo para Safari
      video.src = movie.videoUrl;
      video.play().catch(e => {
        console.log('Erro ao reproduzir HLS nativo:', e);
      });
    } else {
      showMessage('Seu navegador não suporta streaming HLS', true);
      return;
    }
  } else {
    // Esconder botão de qualidade para MP4
    const qualityBtn = document.getElementById('qualityBtn');
    if (qualityBtn) qualityBtn.style.display = 'none';
    
    // Suporte para MP4 e outros formatos
    video.src = movie.videoUrl;
    video.play().catch(e => {
      console.log('Erro ao reproduzir vídeo:', e);
    });
  }
  
  player.style.display = 'flex';
  
  // Focar no player
  player.focus();
}

// Controles do player
function togglePlay() {
  const video = document.getElementById('videoElement');
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function skipForward() {
  const video = document.getElementById('videoElement');
  video.currentTime += 10;
}

function skipBackward() {
  const video = document.getElementById('videoElement');
  video.currentTime -= 10;
}

// Controles específicos para HLS
function changeQuality(level) {
  if (window.hls && window.hls.levels.length > level) {
    window.hls.currentLevel = level;
    showMessage(`Qualidade alterada para: ${window.hls.levels[level].height}p`);
  }
}

function showQualityMenu() {
  if (!window.hls) return;
  
  const levels = window.hls.levels;
  let menu = '<div class="quality-menu">';
  menu += '<h3>Selecionar Qualidade</h3>';
  
  levels.forEach((level, index) => {
    const isCurrent = index === window.hls.currentLevel;
    menu += `<button onclick="changeQuality(${index})" class="${isCurrent ? 'active' : ''}">${level.height}p</button>`;
  });
  
  menu += '</div>';
  
  // Criar modal de qualidade
  const modal = document.createElement('div');
  modal.className = 'quality-modal';
  modal.innerHTML = menu;
  modal.onclick = function(e) {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  };
  
  document.body.appendChild(modal);
}

function closePlayer() {
  const player = document.getElementById('videoPlayer');
  const video = document.getElementById('videoElement');
  
  // Limpar HLS se existir
  if (window.hls) {
    window.hls.destroy();
    window.hls = null;
  }
  
  // Esconder botão de qualidade
  const qualityBtn = document.getElementById('qualityBtn');
  if (qualityBtn) qualityBtn.style.display = 'none';
  
  video.pause();
  video.src = '';
  player.style.display = 'none';
}

// Fechar modal de detalhes
function closeMovieDetails() {
  const modal = document.getElementById('movieDetails');
  modal.style.display = 'none';
  currentMovie = null;
}

// Sistema de busca
async function performSearch(query) {
  if (!query.trim()) {
    loadCategories();
    return;
  }
  
  try {
    // Mostrar loading na busca
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
      searchResults.innerHTML = '<div class="loading">Buscando...</div>';
      searchResults.style.display = 'block';
    }
    
    // Buscar no TMDB
    const results = await searchMovies(query);
    
    // Mostrar resultados
    if (searchResults) {
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">Nenhum resultado encontrado para "' + query + '"</div>';
      } else {
        searchResults.innerHTML = `
          <h2>Resultados da busca: "${query}"</h2>
          <div class="movies-grid">
            ${results.map(movie => createMovieCard(movie)).join('')}
          </div>
        `;
      }
    }
  } catch (error) {
    console.error('Erro na busca:', error);
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
      searchResults.innerHTML = '<div class="error">Erro ao buscar. Tente novamente.</div>';
    }
  }
}

// Logout
function logout() {
  localStorage.removeItem('dubflix_logged_in');
  localStorage.removeItem('dubflix_user_email');
  window.location.href = "index.html";
}

// Mostrar mensagem
function showMessage(message, isError = false) {
  const messageDiv = document.getElementById('message') || createMessageDiv(isError);
  messageDiv.textContent = message;
  messageDiv.className = isError ? 'error-message' : 'success-message';
  messageDiv.style.display = 'block';
  
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 3000);
}

function createMessageDiv(isError = false) {
  const div = document.createElement('div');
  div.id = 'message';
  div.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 30px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    z-index: 1000;
    display: none;
    background-color: ${isError ? '#ff4444' : '#44ff44'};
    color: white;
  `;
  document.body.appendChild(div);
  return div;
}

// Navegação por teclado
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('movieDetails');
    const player = document.getElementById('videoPlayer');
    
    if (modal.style.display === 'flex') {
      closeMovieDetails();
    } else if (player.style.display === 'flex') {
      closePlayer();
    }
  }
  
  if (e.key === ' ' && document.getElementById('videoPlayer').style.display === 'flex') {
    e.preventDefault();
    togglePlay();
  }
});

// Expor funções globalmente
window.showMovieDetails = showMovieDetails;
window.toggleFavorite = toggleFavorite;
window.playMovie = playMovie;
window.togglePlay = togglePlay;
window.skipForward = skipForward;
window.skipBackward = skipBackward;
window.closePlayer = closePlayer;
window.closeMovieDetails = closeMovieDetails;
window.performSearch = performSearch;
window.logout = logout;
window.changeQuality = changeQuality;
window.showQualityMenu = showQualityMenu;

// Funções adicionais para navegação
function showHome() {
  document.getElementById('searchScreen').style.display = 'none';
  document.querySelector('.home-container').style.display = 'block';
  loadCategories();
}

function showSearch() {
  document.querySelector('.home-container').style.display = 'none';
  document.getElementById('searchScreen').style.display = 'block';
  document.getElementById('searchInput').focus();
}

function showFavorites() {
  // Implementar tela de favoritos
  showMessage('Funcionalidade de favoritos em desenvolvimento', true);
}

function playFeatured() {
  // Reproduzir filme em destaque
  const featuredMovie = mockMovies.lancamentos[0];
  if (featuredMovie) {
    currentMovie = featuredMovie;
    playMovie();
  }
}

// Expor funções de navegação
window.showHome = showHome;
window.showSearch = showSearch;
window.showFavorites = showFavorites;
window.playFeatured = playFeatured;

document.addEventListener('DOMContentLoaded', function() {
  if (isUserLoggedIn()) {
    initHome();
  } else {
    window.location.href = 'index.html';
  }
});

function initHome() {
  loadUserData();
  loadCustomContent(); // Carrega o conteúdo personalizado primeiro
  loadCategories();
  loadMainBanner();
} 