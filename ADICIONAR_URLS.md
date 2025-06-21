# 🎬 Como Adicionar URLs HLS ao DubFlix

## ✅ **URL Adicionada com Sucesso!**

A URL foi adicionada em dois lugares:

### 1. **Dados Mockados** (`mock-data.js`)
- Filme: "Mission: Impossible - Fallout"
- ID: 6
- URL: ✅ Configurada

### 2. **Configuração TMDB** (`hls-override.js`)
- Filme: Mission: Impossible - Fallout
- ID TMDB: 353081
- URL: ✅ Configurada

## 🚀 **Como Adicionar Mais URLs**

### **Passo 1: Encontrar o ID do Filme**
1. Vá em [themoviedb.org](https://themoviedb.org)
2. Procure o filme
3. Copie o ID da URL:
   ```
   https://www.themoviedb.org/movie/353081-mission-impossible-fallout
   ID: 353081
   ```

### **Passo 2: Editar hls-override.js**
```javascript
window.HLS_OVERRIDES = {
  // Filmes existentes
  "572802": "https://hls1.goodstream.one/hls2/01/00029/o9k2imox18kf_h/index-v1-a1.m3u8?t=_xdCfBrtSfiLyf3X8dwi84b9wviwYQebgqWFpIgrsps&s=1750541786&e=43200&v=92617721&srv=s2&i=0.3&sp=0",
  "353081": "https://hls1.goodstream.one/hls2/01/00029/o9k2imox18kf_h/index-v1-a1.m3u8?t=4ybnKghcbyptDNR7noo0aJYirxwuQOMZoxBs7FyAwDg&s=1750544263&e=43200&v=92617721&srv=s2&i=0.3&sp=0",
  
  // NOVO FILME - Adicione aqui
  "299534": "https://sua-nova-url-hls.m3u8",
};
```

### **Passo 3: Fazer Deploy**
1. **Via Netlify Dashboard:**
   - Acesse [netlify.com](https://netlify.com)
   - Vá no seu site DubFlix
   - Arraste a pasta `DubFlix` atualizada

2. **Via GitHub (se tiver):**
   ```bash
   git add .
   git commit -m "Adicionada nova URL HLS"
   git push
   ```

## 🎯 **URLs Adicionadas Atualmente**

| Filme | ID TMDB | Status |
|-------|---------|--------|
| Missão: Impossível – Acerto de Contas | 572802 | ✅ Ativo |
| Mission: Impossible - Fallout | 353081 | ✅ Ativo |

## 🔍 **Como Testar**

1. Acesse: https://dubflix.netlify.app
2. Faça login: `admin@dubflix.com` / `123456`
3. Procure pelos filmes Mission: Impossible
4. Verifique se aparece o badge "HLS"
5. Clique em "Assistir" para testar

## 📝 **Formato da URL HLS**

```javascript
"ID_DO_FILME": "https://exemplo.com/video.m3u8?parametros=valores"
```

### **Exemplos de URLs Válidas:**
- ✅ `https://exemplo.com/filme.m3u8`
- ✅ `https://exemplo.com/filme.m3u8?token=abc123`
- ✅ `https://exemplo.com/filme.m3u8&param=value`

## ⚠️ **Importante**

- **Teste a URL** antes de adicionar
- **Verifique se o CORS** está configurado
- **Use URLs confiáveis** e estáveis
- **Respeite direitos autorais**

## 🎉 **Pronto!**

Agora você tem dois filmes Mission: Impossible com vídeos funcionando no DubFlix! 