import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // usa a VARIÁVEL da Vercel
    });

    const { imageBase64 } = req.body || {};

    if (!imageBase64) {
      return res
        .status(400)
        .json({ error: "Campo 'imageBase64' é obrigatório no body." });
    }

    const prompt = `
      Transforme esta imagem em um desenho de contorno em preto e branco,
      estilo página de colorir infantil, com traço parecido com quadrinhos
      (tipo Liga da Justiça), mas simples para crianças.
      - Fundo totalmente branco
      - Linhas pretas fortes e limpas
      - Remover sombras e texturas realistas
      - Manter a pose e os elementos principais
      - Não inventar novos elementos que não estavam na foto
    `;

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      // ⚠️ por enquanto estamos ignorando a imagem,
      // só usando o prompt de texto
      size: "1024x1024",
      n: 1,
    });

    const generated = response.data?.[0]?.b64_json;

    if (!generated) {
      return res
        .status(500)
        .json({ error: "Não foi possível gerar a imagem." });
    }

    return res.status(200).json({ image: generated });
  } catch (err) {
    console.error("Erro na API OpenAI:", err);
    return res.status(500).json({ error: "Erro ao gerar desenho." });
  }
}
