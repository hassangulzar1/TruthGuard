// app/api/detect-text/route.js
import { NextResponse } from "next/server";
import {
  preprocessText,
  dataEmbedding,
  callLlama3Model,
} from "../../../utils/llama";

export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const { input } = await request.json();

    // Ensure input is a string
    if (typeof input !== "string") {
      return NextResponse.json(
        { error: "Invalid input type" },
        { status: 400 }
      );
    }

    // Preprocess the text input
    const preprocessedData = preprocessText(input);

    // Get embeddings from the preprocessed data
    const embeddingData = await dataEmbedding(preprocessedData);

    // Call the Llama3 model API with the embeddings
    const responseData = await callLlama3Model(embeddingData);

    // Return the response data as JSON
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in /api/detect-text route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
