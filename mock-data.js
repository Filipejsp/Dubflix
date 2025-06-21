// Dados mockados para o DubFlix (sistema local)
const mockMovies = {
  lancamentos: [
    {
      id: 1,
      titulo: "Vingadores: Ultimato",
      ano: 2019,
      duracao: "181 min",
      categoria: "Ação",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Vingadores",
      sinopse: "Após os eventos devastadores de Vingadores: Guerra Infinita, o universo está em ruínas. Com a ajuda dos aliados restantes, os Vingadores se reúnem mais uma vez para reverter as ações de Thanos e restaurar o equilíbrio do universo.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 2,
      titulo: "Joker",
      ano: 2019,
      duracao: "122 min",
      categoria: "Drama",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Joker",
      sinopse: "Em Gotham City, Arthur Fleck trabalha como palhaço para uma agência de talentos e sonha em se tornar um comediante de stand-up. Ele vive com sua mãe doente e sofre de uma condição neurológica que o faz rir incontrolavelmente.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 3,
      titulo: "Parasita",
      ano: 2019,
      duracao: "132 min",
      categoria: "Drama",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Parasita",
      sinopse: "Uma família pobre coreana se infiltra na casa de uma família rica, assumindo identidades falsas para trabalhar como empregados domésticos.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    }
  ],
  acao: [
    {
      id: 4,
      titulo: "Mad Max: Estrada da Fúria",
      ano: 2015,
      duracao: "120 min",
      categoria: "Ação",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Mad+Max",
      sinopse: "Em um mundo pós-apocalíptico, Max Rockatansky junta-se a Imperatriz Furiosa para escapar de um tirano e salvar um grupo de mulheres.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 5,
      titulo: "John Wick",
      ano: 2014,
      duracao: "101 min",
      categoria: "Ação",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=John+Wick",
      sinopse: "Um ex-assassino profissional volta à ativa para se vingar dos bandidos que mataram seu cachorro e roubaram seu carro.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 6,
      titulo: "Mission: Impossible - Fallout",
      ano: 2018,
      duracao: "147 min",
      categoria: "Ação",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Mission+Impossible",
      sinopse: "Ethan Hunt e sua equipe devem impedir que três plutônios sejam usados em ataques nucleares simultâneos.",
      videoUrl: "https://hls1.goodstream.one/hls2/01/00029/o9k2imox18kf_h/index-v1-a1.m3u8?t=4ybnKghcbyptDNR7noo0aJYirxwuQOMZoxBs7FyAwDg&s=1750544263&e=43200&v=92617721&srv=s2&i=0.3&sp=0",
      videoType: "hls",
      favorito: false,
      hasVideo: true
    }
  ],
  comedia: [
    {
      id: 7,
      titulo: "Deadpool",
      ano: 2016,
      duracao: "108 min",
      categoria: "Comédia",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Deadpool",
      sinopse: "Wade Wilson é um ex-agente especial que se torna mercenário após ser submetido a um experimento que o deixa com poderes de cura.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 8,
      titulo: "Superbad",
      ano: 2007,
      duracao: "113 min",
      categoria: "Comédia",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Superbad",
      sinopse: "Dois amigos do ensino médio tentam comprar álcool para uma festa, mas acabam se metendo em várias confusões.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 9,
      titulo: "The Hangover",
      ano: 2009,
      duracao: "100 min",
      categoria: "Comédia",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=The+Hangover",
      sinopse: "Três amigos acordam após uma noite de festa em Las Vegas e descobrem que o noivo desapareceu.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    }
  ],
  series: [
    {
      id: 10,
      titulo: "Breaking Bad",
      ano: 2008,
      duracao: "5 temporadas",
      categoria: "Séries",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Breaking+Bad",
      sinopse: "Um professor de química do ensino médio vira fabricante de metanfetamina para garantir o futuro financeiro de sua família.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 11,
      titulo: "Stranger Things",
      ano: 2016,
      duracao: "4 temporadas",
      categoria: "Séries",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Stranger+Things",
      sinopse: "Quando um garoto desaparece, sua mãe, um chefe de polícia e seus amigos devem enfrentar forças sobrenaturais terríveis.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 12,
      titulo: "The Crown",
      ano: 2016,
      duracao: "6 temporadas",
      categoria: "Séries",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=The+Crown",
      sinopse: "A história da rainha Elizabeth II e dos eventos que moldaram a segunda metade do século XX.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    }
  ],
  animacoes: [
    {
      id: 13,
      titulo: "Toy Story 4",
      ano: 2019,
      duracao: "100 min",
      categoria: "Animações",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Toy+Story+4",
      sinopse: "Woody e Buzz Lightyear embarcam em uma nova aventura quando Bonnie adiciona um novo brinquedo à sua coleção.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 14,
      titulo: "Frozen 2",
      ano: 2019,
      duracao: "103 min",
      categoria: "Animações",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Frozen+2",
      sinopse: "Elsa, Anna, Kristoff, Olaf e Sven embarcam em uma jornada para descobrir a origem dos poderes de Elsa.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 15,
      titulo: "Spider-Man: Into the Spider-Verse",
      ano: 2018,
      duracao: "117 min",
      categoria: "Animações",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Spider-Verse",
      sinopse: "Miles Morales se torna o Spider-Man de seu universo e deve se juntar a outros heróis para salvar a realidade.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    }
  ],
  drama: [
    {
      id: 16,
      titulo: "O Poderoso Chefão",
      ano: 1972,
      duracao: "175 min",
      categoria: "Drama",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Godfather",
      sinopse: "A história da família Corleone, uma das cinco famílias da máfia de Nova York, liderada por Vito Corleone.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 17,
      titulo: "Pulp Fiction",
      ano: 1994,
      duracao: "154 min",
      categoria: "Drama",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Pulp+Fiction",
      sinopse: "Várias histórias entrelaçadas de criminosos em Los Angeles, incluindo dois assassinos, a esposa de um gângster e um boxeador.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    },
    {
      id: 18,
      titulo: "Forrest Gump",
      ano: 1994,
      duracao: "142 min",
      categoria: "Drama",
      poster: "https://via.placeholder.com/300x450/1a1a1a/666666?text=Forrest+Gump",
      sinopse: "A vida de Forrest Gump, um homem com QI baixo mas com um coração de ouro, que viveu momentos históricos dos Estados Unidos.",
      videoUrl: null,
      videoType: null,
      favorito: false,
      hasVideo: false
    }
  ]
};

// Exportar para uso global
window.mockMovies = mockMovies; 