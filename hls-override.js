//
// CONFIGURAÇÃO DE VÍDEOS HLS PARA FILMES
// ======================================
//
// Para adicionar vídeos aos filmes do TMDB:
//
// 1. Encontre o filme no site themoviedb.org
// 2. Copie o número de ID da URL do filme
//    Exemplo: https://www.themoviedb.org/movie/572802-mission-impossible-dead-reckoning-part-one
//    ID: 572802
//
// 3. Adicione o ID e a URL do vídeo HLS no formato abaixo:
//    "ID_DO_FILME": "URL_DO_SEU_VIDEO_HLS.m3u8",
//
// 4. Salve o arquivo e faça deploy no Netlify
//
// ======================================

window.HLS_OVERRIDES = {
  // Missão: Impossível – Acerto de Contas Parte 1
  "572802": "https://hls1.goodstream.one/hls2/01/00029/o9k2imox18kf_h/index-v1-a1.m3u8?t=_xdCfBrtSfiLyf3X8dwi84b9wviwYQebgqWFpIgrsps&s=1750541786&e=43200&v=92617721&srv=s2&i=0.3&sp=0",
  
  // Mission: Impossible - Fallout (ID: 353081)
  "353081": "https://hls1.goodstream.one/hls2/01/00029/o9k2imox18kf_h/index-v1-a1.m3u8?t=4ybnKghcbyptDNR7noo0aJYirxwuQOMZoxBs7FyAwDg&s=1750544263&e=43200&v=92617721&srv=s2&i=0.3&sp=0",
  
  // Exemplo: Vingadores: Ultimato (ID: 299534)
  // "299534": "https://sua-url-hls-aqui.m3u8",
  
  // Exemplo: Batman (ID: 414906)
  // "414906": "https://sua-url-hls-aqui.m3u8",
  
  // Exemplo: Top Gun: Maverick (ID: 361743)
  // "361743": "https://sua-url-hls-aqui.m3u8",
  
  // Exemplo: Avatar: O Caminho da Água (ID: 76600)
  // "76600": "https://sua-url-hls-aqui.m3u8",
  
  // Exemplo: Homem-Aranha: Sem Volta para Casa (ID: 634649)
  // "634649": "https://sua-url-hls-aqui.m3u8",
  
  // Exemplo: Duna (ID: 438631)
  // "438631": "https://sua-url-hls-aqui.m3u8",
  
  // Exemplo: Shang-Chi e a Lenda dos Dez Anéis (ID: 566525)
  // "566525": "https://sua-url-hls-aqui.m3u8",
  
  // Exemplo: Eternos (ID: 524434)
  // "524434": "https://sua-url-hls-aqui.m3u8",
  
  // Exemplo: Black Widow (ID: 497698)
  // "497698": "https://sua-url-hls-aqui.m3u8",
  
  // Exemplo: Viúva Negra (ID: 497698)
  // "497698": "https://sua-url-hls-aqui.m3u8",
  
  // ======================================
  // INSTRUÇÕES PARA ADICIONAR MAIS FILMES:
  // ======================================
  //
  // 1. Vá para https://www.themoviedb.org
  // 2. Procure o filme desejado
  // 3. Copie o ID da URL (número após /movie/)
  // 4. Adicione aqui no formato: "ID": "URL_HLS",
  // 5. Faça commit e push para o GitHub
  // 6. O Netlify fará deploy automático
  //
  // ======================================
}; 