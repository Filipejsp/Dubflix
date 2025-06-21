# 🎬 Como Adicionar Filmes com Vídeos ao DubFlix

## 📋 Passo a Passo Completo

### 1. **Encontrar o ID do Filme no TMDB**

1. Acesse [themoviedb.org](https://www.themoviedb.org)
2. Procure o filme desejado
3. Clique no filme para abrir a página de detalhes
4. Copie o ID da URL:
   ```
   https://www.themoviedb.org/movie/572802-mission-impossible-dead-reckoning-part-one
   ID: 572802
   ```

### 2. **Editar o Arquivo de Configuração**

1. Abra o arquivo `hls-override.js` no seu editor
2. Adicione o ID e a URL do vídeo HLS:
   ```javascript
   window.HLS_OVERRIDES = {
     // Filme existente
     "572802": "https://hls1.goodstream.one/hls2/01/00029/o9k2imox18kf_h/index-v1-a1.m3u8?t=_xdCfBrtSfiLyf3X8dwi84b9wviwYQebgqWFpIgrsps&s=1750541786&e=43200&v=92617721&srv=s2&i=0.3&sp=0",
     
     // NOVO FILME - Adicione aqui
     "299534": "https://sua-url-hls-aqui.m3u8",
   };
   ```

### 3. **Formatos de Vídeo Suportados**

#### ✅ **HLS (.m3u8) - Recomendado**
```javascript
"299534": "https://exemplo.com/filme.m3u8"
```

#### ✅ **MP4 (.mp4)**
```javascript
"299534": "https://exemplo.com/filme.mp4"
```

#### ✅ **Outros Formatos**
```javascript
"299534": "https://exemplo.com/filme.webm"
"299534": "https://exemplo.com/filme.avi"
```

### 4. **Fazer Deploy das Alterações**

#### **Opção A: Via GitHub (Automático)**
```bash
git add hls-override.js
git commit -m "Adicionado filme: Nome do Filme"
git push origin main
```
O Netlify fará deploy automático em 1-2 minutos.

#### **Opção B: Via Netlify Dashboard**
1. Acesse [netlify.com](https://netlify.com)
2. Vá no seu site DubFlix
3. Clique em "Deploys"
4. Arraste o arquivo `hls-override.js` atualizado
5. Aguarde o deploy

### 5. **Verificar se Funcionou**

1. Acesse https://dubflix.netlify.app
2. Faça login
3. Procure o filme adicionado
4. Verifique se aparece o badge "HLS" ou "Sem Vídeo"
5. Clique em "Assistir" para testar

## 🎯 **Exemplos Práticos**

### **Exemplo 1: Vingadores: Ultimato**
```javascript
// ID: 299534
// URL: https://www.themoviedb.org/movie/299534-avengers-endgame
"299534": "https://exemplo.com/vingadores-ultimato.m3u8"
```

### **Exemplo 2: Batman**
```javascript
// ID: 414906
// URL: https://www.themoviedb.org/movie/414906-the-batman
"414906": "https://exemplo.com/batman.m3u8"
```

### **Exemplo 3: Top Gun: Maverick**
```javascript
// ID: 361743
// URL: https://www.themoviedb.org/movie/361743-top-gun-maverick
"361743": "https://exemplo.com/top-gun-maverick.m3u8"
```

## 🔍 **Como Encontrar URLs de Vídeo HLS**

### **Fontes Legais:**
- **Netflix** (requer assinatura)
- **Amazon Prime** (requer assinatura)
- **Disney+** (requer assinatura)
- **HBO Max** (requer assinatura)

### **Fontes Gratuitas:**
- **YouTube** (alguns canais)
- **Vimeo** (vídeos gratuitos)
- **Internet Archive** (domínio público)
- **Sites de streaming legais**

### **⚠️ Importante:**
- Use apenas vídeos que você tem direito de usar
- Respeite direitos autorais
- Para uso pessoal, considere vídeos de domínio público

## 🎨 **Indicadores Visuais**

### **Filmes COM Vídeo:**
- ✅ Badge "HLS" (laranja)
- ✅ Botão "Assistir" visível
- ✅ Card com borda vermelha no hover

### **Filmes SEM Vídeo:**
- ⚠️ Badge "Sem Vídeo" (cinza)
- ❌ Botão "Assistir" oculto
- ⚠️ Card com opacidade reduzida

## 🚀 **Dicas para Deploy Rápido**

1. **Teste Localmente Primeiro:**
   ```bash
   cd DubFlix
   npx serve . -p 3000
   ```

2. **Verifique a Sintaxe:**
   - Não esqueça das vírgulas
   - IDs devem ser strings: `"123456"`
   - URLs devem ser válidas

3. **Use URLs Confiáveis:**
   - Teste a URL antes de adicionar
   - Use CDNs para melhor performance
   - Verifique se o CORS está configurado

## 📞 **Suporte**

Se tiver problemas:
1. Verifique o console do navegador (F12)
2. Confirme se a URL do vídeo funciona
3. Teste em diferentes navegadores
4. Verifique os logs do Netlify

## 🎉 **Pronto!**

Agora você sabe como adicionar filmes com vídeos ao DubFlix. O sistema está configurado para mostrar apenas filmes que realmente têm vídeos disponíveis, evitando frustração dos usuários. 