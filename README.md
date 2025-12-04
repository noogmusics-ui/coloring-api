# coloring-api

Pequena API em Node.js para transformar uma imagem em um desenho de contorno
(página de colorir) usando a API de imagens da OpenAI.

## Como usar (resumo)

1. Faça o fork ou baixe este repositório.
2. Suba para o GitHub (se ainda não estiver).
3. Importe o repositório na Vercel.
4. Nas **Environment Variables** da Vercel, crie:
   - `OPENAI_API_KEY` = sua chave da OpenAI.
5. Deploy.

A rota ficará algo como:

`POST /api/coloring`

### Body (JSON)

```json
{
  "imageBase64": "DATA_DA_IMAGEM_EM_BASE64"
}
```

### Resposta (JSON)

```json
{
  "image": "BASE64_DA_IMAGEM_GERADA"
}
```

Depois é só usar esse base64 no seu site (Gravity / Stitch) para exibir o desenho.