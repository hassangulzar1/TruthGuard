// app/api/detect-url/route.js
import { NextResponse } from "next/server";
import {
  preprocessText,
  dataEmbedding,
  callLlama3Model,
  fetchTitleFromUrl,
} from "../../../utils/llama";

export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const { input } = await request.json();

    // Check if input is a URL
    const isUrl = (input) =>
      input.startsWith("http://") || input.startsWith("https://");

    let content;

    // Fetch title from URL if input is a URL
    if (isUrl(input)) {
      content = await fetchTitleFromUrl(input);
    } else {
      content = input;
    }

    // Preprocess the content
    const preprocessedData = preprocessText(content);

    // Get embeddings from the preprocessed data
    const embeddingData = await dataEmbedding(preprocessedData);

    // Call the Llama3 model API with the embeddings
    const responseData = await callLlama3Model(embeddingData);

    // Return the response data as JSON
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in /api/detect-url route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
