// app/api/detect-url/route.js
import { NextResponse } from "next/server";
import fetch from "node-fetch"; // Make sure to install node-fetch if not already
import {
  preprocessText,
  dataEmbedding,
  callLlama3Model,
} from "../../../utils/llama"; // Import utility functions

async function fetchTitleFromUrl(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const titleMatch = text.match(/<title>(.*?)<\/title>/);
    return titleMatch ? titleMatch[1] : "No title found";
  } catch (error) {
    console.error("Error fetching title from URL:", error);
    throw new Error("Failed to fetch title");
  }
}

export async function POST(request) {
  try {
    const { input } = await request.json();
    console.log("Received URL input:", input);

    let content;
    if (input.startsWith("http://") || input.startsWith("https://")) {
      content = await fetchTitleFromUrl(input);
    } else {
      content = input;
    }

    const preprocessedData = preprocessText(content);
    const embeddingData = await dataEmbedding(preprocessedData);
    const responseData = await callLlama3Model(embeddingData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in /api/detect-url route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
