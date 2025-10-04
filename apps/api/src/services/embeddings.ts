import url from "node:url";
import axios from "axios";
import FormData, { type Stream } from "form-data";

const EMBEDDING_BASE_URL =
  "https://8000-01k6pav80mpvfpaj1wjjmgnt7r.cloudspaces.litng.ai";

export const getEmbeddingsFromText = async (text: string) => {
  const response = await axios.post(
    `${EMBEDDING_BASE_URL}/embed/text`,
    new url.URLSearchParams({ text }),
  );

  return response.data.embedding as number[];
};

export const getEmbeddingsFromImage = async (
  imageBuffer: Buffer,
  mimeType?: string,
  filename?: string,
) => {
  const formData = new FormData();

  formData.append("file", imageBuffer.toString("base64"), filename || "image");

  const response = await axios.post(
    `${EMBEDDING_BASE_URL}/embed/image`,
    formData,
    {
      headers: formData.getHeaders(),
    },
  );

  return response.data.embedding as number[];
};

export const getEmbeddingsFromAudio = async (
  audioBuffer: Buffer,
  mimeType?: string,
  filename?: string,
) => {
  const formData = new FormData();
  // Convert Buffer to Uint8Array for Blob compatibility
  const uint8Array = new Uint8Array(audioBuffer);
  const blob = new Blob([uint8Array], {
    type: mimeType || "application/octet-stream",
  });
  formData.append("file", blob, filename || "audio");

  const response = await axios.post(
    `${EMBEDDING_BASE_URL}/embed/audio`,
    formData,
    {
      headers: formData.getHeaders(),
    },
  );

  return response.data.embedding as number[];
};

export const getSearchSummary = async (query: string, texts: string[]) => {
  const response = await axios.post(`${EMBEDDING_BASE_URL}/summarize`, {
    question: query,
    top_k_texts: texts,
  });

  return response.data.answer as string;
};
