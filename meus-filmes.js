//
// Adicione seus filmes e séries personalizados neste arquivo.
//
// O formato para cada filme é:
//
// {
//   id: "id_unico_para_seu_filme", // Use um ID único, como "meu_filme_1"
//   titulo: "Nome do Filme",
//   sinopse: "A descrição completa do filme.",
//   poster: "URL_DA_IMAGEM_DE_CAPA.jpg",
//   videoUrl: "URL_DO_SEU_VIDEO_HLS.m3u8",
//   videoType: "hls", // Mantenha como 'hls' para vídeos HLS
//   ano: 2025, // Opcional: ano de lançamento
//   duracao: "1h 48m", // Opcional: duração do filme
//   categoria: "Meus Filmes" // Mantenha para aparecer na categoria certa
// },
//
// Basta copiar o bloco acima e colar abaixo, dentro dos colchetes [], para adicionar mais filmes.
//

window.MY_MOVIES = [
  {
    id: "lilo_e_stitch_2025",
    titulo: "Lilo & Stitch",
    sinopse: "Stitch, um alienígena, chega ao planeta Terra após fugir de sua prisão e tenta se passar por um cachorro para se camuflar. As coisas mudam quando Lilo, uma travessa menina, o adota de um abrigo de animais. Juntos, eles aprendem os valores da amizade e família.",
    poster: "https://image.tmdb.org/t/p/w500/olw4I4sY5p4iurcWfioz9KjHn6.jpg",
    videoUrl: "https://hls1.goodstream.one/hls2/02/00029/6yyb2jr96yqx_h/index-v1-a1.m3u8?t=as3sJBeri30nfE8GVEUp92UgEPosQkS3gJ5e4VXvJjU&s=1750539655&e=43200&v=92575898&srv=s1&i=0.3&sp=0", // SUBSTITUA PELA URL DO SEU VÍDEO HLS
    videoType: "hls",
    ano: 2025,
    duracao: "108 min",
    categoria: "Meus Filmes"
  },
  {
    id: "missao_impossivel_7",
    titulo: "Missão: Impossível - Acerto de Contas Parte 1",
    sinopse: "Ethan Hunt e sua equipe da IMF devem rastrear uma nova arma apavorante que ameaça toda a humanidade. Com o controle do futuro e o destino do mundo em jogo, uma corrida mortal ao redor do globo começa.",
    poster: "https://image.tmdb.org/t/p/w500/woJd2k8j0sMh5d2gUN23DObPqi.jpg",
    videoUrl: "https://hls1.goodstream.one/hls2/01/00029/o9k2imox18kf_h/index-v1-a1.m3u8?t=_xdCfBrtSfiLyf3X8dwi84b9wviwYQebgqWFpIgrsps&s=1750541786&e=43200&v=92617721&srv=s2&i=0.3&sp=0",
    videoType: "hls",
    ano: 2023,
    duracao: "164 min",
    categoria: "Meus Filmes"
  },
  // Adicione outros filmes aqui, copiando a estrutura acima.
]; 