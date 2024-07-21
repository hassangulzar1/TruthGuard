import { NextResponse } from "next/server";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const preprocessText = (text) => {
  text = text.replace(/<.*?>/g, "");
  text = text.replace(/\W/g, " ");
  text = text.toLowerCase();
  return text;
};

const dataEmbedding = async (preprocessedData) => {
  const response = await axios.post(
    "https://api.together.ai/v1/embedding",
    {
      model_name: "togethercomputer/m2-bert-80M-8k-retrieval",
      text: preprocessedData,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const callLlama3Model = async (embeddingData) => {
  try {
    const response = await axios.post(
      "https://api.altogether.ai/v1/llama3",
      {
        model: "meta-llama/Meta-Llama-3-8B-Instruct-Lite",
        embedding: embeddingData,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to analyze with Llama3" };
  }
};

export async function POST(request) {
  const { input } = await request.json();
  const preprocessedData = preprocessText(input);
  const embeddingData = await dataEmbedding(preprocessedData);
  const responseData = await callLlama3Model(embeddingData);
  return NextResponse.json(responseData);
}
