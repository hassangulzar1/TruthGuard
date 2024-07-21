// app/api/detect-text/route.js
import { NextResponse } from "next/server";
import {
  preprocessText,
  dataEmbedding,
  callLlama3Model,
} from "../../../utils/llama"; // Import utility functions

export async function POST(request) {
  try {
    const { input } = await request.json();
    console.log("Received text input:", input);

    const preprocessedData = preprocessText(input);
    const embeddingData = await dataEmbedding(preprocessedData);
    const responseData = await callLlama3Model(embeddingData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in /api/detect-text route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
