// utils/llama.js
const API_KEY = process.env.TOGETHER_API_KEY;

export function preprocessText(text) {
  text = text.replace(/<.*?>/g, ""); // Remove HTML tags
  text = text.replace(/\W/g, " "); // Remove non-word characters
  text = text.toLowerCase(); // Convert to lowercase
  return text;
}

// Mock function for dataEmbedding - replace with actual implementation
export async function dataEmbedding(preprocessedData) {
  // Mock embedding function
  // Replace this with actual API call or library function for embeddings
  return { embedding: "mock_embedding_data" };
}

// Mock function for callLlama3Model - replace with actual implementation
export async function callLlama3Model(embeddingData) {
  const payload = {
    model: "meta-llama/Meta-Llama-3-8B-Instruct-Lite",
    embedding: embeddingData,
  };

  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch("https://api.altogether.ai/v1/llama3", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to analyze with Llama3");
    }
  } catch (error) {
    console.error("Error calling Llama3 API:", error);
    throw new Error("Failed to analyze with Llama3");
  }
}

// Mock function for fetchTitleFromUrl - replace with actual implementation
export async function fetchTitleFromUrl(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const titleMatch = text.match(/<title>(.*?)<\/title>/);
    return titleMatch ? titleMatch[1] : "No title found";
  } catch (error) {
    console.error("Error fetching title from URL:", error);
    throw new Error("Failed to fetch title from URL");
  }
}
