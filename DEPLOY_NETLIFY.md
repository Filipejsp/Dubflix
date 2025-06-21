# 🚀 Deploy do DubFlix no Netlify

## Como fazer o deploy

### Opção 1: Deploy via Git (Recomendado)

1. **Faça push do código para o GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/dubflix-smarttv.git
   git push -u origin main
   ```

2. **No Netlify:**
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Conecte com GitHub
   - Selecione o repositório `dubflix-smarttv`
   - Configure:
     - **Build command:** (deixe vazio)
     - **Publish directory:** `.`
   - Clique em "Deploy site"

### Opção 2: Deploy via Drag & Drop

1. **Prepare os arquivos:**
   - Certifique-se de que todos os arquivos estão na pasta `DubFlix`
   - Exclua a pasta `node_modules` se existir

2. **No Netlify:**
   - Acesse [netlify.com](https://netlify.com)
   - Arraste a pasta `DubFlix` para a área de deploy
   - Aguarde o deploy automático

## Configurações Importantes

### Variáveis de Ambiente (Opcional)
Se precisar configurar a API do TMDB:
- Vá em **Site settings > Environment variables**
- Adicione: `TMDB_API_KEY` com sua chave da API

### Domínio Personalizado
- Vá em **Site settings > Domain management**
- Adicione seu domínio personalizado
- Configure DNS conforme instruções do Netlify

## Funcionalidades Online

✅ **Login local** - Funciona sem Firebase  
✅ **TMDB API** - Busca filmes reais  
✅ **HLS Streaming** - Suporte a vídeos HLS  
✅ **Responsivo** - Funciona em Smart TVs  
✅ **Navegação** - Controles de TV  

## Troubleshooting

### Se o site não carregar:
1. Verifique se todos os arquivos estão na raiz
2. Confirme que `index.html` existe
3. Verifique os logs no Netlify

### Se a API do TMDB não funcionar:
1. Configure a variável de ambiente `TMDB_API_KEY`
2. Ou use os dados mock em `mock-data.js`

### Se os vídeos não carregarem:
1. Verifique se as URLs HLS são válidas
2. Confirme que o CORS está configurado
3. Use URLs de teste como BigBuckBunny

## URLs de Teste

- **BigBuckBunny HLS:** `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`
- **BigBuckBunny MP4:** `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`

## Suporte

Para dúvidas sobre o deploy, consulte:
- [Documentação do Netlify](https://docs.netlify.com)
- [Guia de deploy estático](https://docs.netlify.com/site-deploys/create-deploys) 