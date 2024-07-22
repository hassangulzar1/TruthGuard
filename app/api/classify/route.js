import axios from "axios";

export async function POST(request) {
  const article = await request.json();
  console.log(article.input);

  if (!article) {
    return new Response(
      JSON.stringify({ error: "Article content is required" }),
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.TOGETHER_API_KEY;

    console.log(apiKey);

    const response = await axios.post(
      "https://api.together.xyz/v1/completions",
      {
        model:
          "reemamemon/Meta-Llama-3-8B-Instruct-fake-news-detection-2024-07-20-17-48-54-aeb6d725",
        prompt: `You are an AI model fine-tuned to classify news articles as real or fake. Respond with 'Real' or 'Fake' based on the given article.\n\nArticle: ${article.input}\n\nClassification:`,
        max_tokens: 10,
        temperature: 0.0,
        top_p: 1.0,
        stop: ["\n"],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const classification = response.data.choices[0].text.trim();
    return new Response(JSON.stringify({ classification }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
      }),
      { status: 500 }
    );
  }
}
