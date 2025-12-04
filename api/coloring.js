import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.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 });

    const { imageBase64 } = req.body || {};

    if (!imageBase64) {
      return res.status(400).json({ error: "Campo 'imageBase64' é obrigatório no body." });
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

    // A API de imagens pode mudar ao longo do tempo.
    // Verifique sempre a documentação oficial se algo der erro.
    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      image: imageBase64,
      size: "1024x1024",
      n: 1
    });

    const generated = response.data?.[0]?.b64_json;

    if (!generated) {
      return res.status(500).json({ error: "Não foi possível gerar a imagem." });
    }

    return res.status(200).json({ image: generated });
  } catch (err) {
    console.error("Erro na API OpenAI:", err);
    return res.status(500).json({ error: "Erro ao gerar desenho." });
  }
}